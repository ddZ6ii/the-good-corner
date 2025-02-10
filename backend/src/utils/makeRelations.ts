import { GraphQLResolveInfo, Kind, SelectionSetNode } from 'graphql';
import { BaseEntity } from 'typeorm';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';

/**
 * Check whether a key exists in the graphql request and has a selection set (i.e. is a subquery).
 * @param info Information about the resolved query (obtained from `@Info() info`).
 * @param relationName The key name to look for in the request (subquery).
 * @returns True if the key is found (subquery), false otherwise.
 */
export function hasRelation(
  info: GraphQLResolveInfo,
  relationName: string,
): boolean {
  const selections = info.fieldNodes[0]?.selectionSet?.selections;
  if (selections) {
    const entry = selections.find(
      (selection) =>
        selection.kind === Kind.FIELD && selection.name.value === relationName,
    );
    return entry?.kind === Kind.FIELD && !!entry.selectionSet;
  }
  return false;
}

/**
 * Parse the graphql request and keep only fields with a subselection (which may be relations).
 * @param set All request selections returned from the `@Info()` decorator.
 * @param levelPossibleRelations All identified relations candidates.
 *
 * Example of the returned `levelPossibleRelations` from the `ads` request:
 * {
 *    "category": {},
 *    "tags": {},
 *    "createdBy": {}
 * }
 */
function parseSelectionSet(
  set: SelectionSetNode,
  levelPossibleRelations: Record<string, unknown>,
): void {
  if (set.selections.length > 0) {
    for (const entry of set.selections) {
      if (
        entry.kind === Kind.FIELD &&
        entry.selectionSet?.kind === Kind.SELECTION_SET
      ) {
        levelPossibleRelations[entry.name.value] = {};
        parseSelectionSet(
          entry.selectionSet,
          levelPossibleRelations[entry.name.value] as Record<string, unknown>,
        );
      }
    }
  }
}

/**
 * Parse possible relations and only keep "real" TypeORM relations.
 * @param possibleRelations All possible relations candidates from the graphql request.
 * @param entityRelations Existing relations for the resolved TypeORM entity.
 * @param relations The final relations to satisfy.
 */
function checkRelation(
  possibleRelations: Record<string, unknown>,
  entityRelations: RelationMetadata[],
  relations: Record<string, unknown>,
) {
  if (Object.keys(possibleRelations).length > 0) {
    const entityRelationsMap: Record<string, unknown> = {};
    for (const relation of entityRelations) {
      entityRelationsMap[relation.propertyName] =
        relation.inverseEntityMetadata.relations;
    }
    for (const possibleRelation in possibleRelations) {
      if (entityRelationsMap[possibleRelation]) {
        relations[possibleRelation] = {};
        checkRelation(
          possibleRelations[possibleRelation] as Record<string, unknown>,
          entityRelationsMap[possibleRelation] as RelationMetadata[],
          relations[possibleRelation] as Record<string, unknown>,
        );
      }
    }
  }
}

/**
 * Dynamically extracts TypeORM relations from the GraphQL request.
 * This funtions helps optmizing performance by fetching only the required relations (minimizing the number of `LEFT JOIN` in the SQL query).
 * @param info Information about the resolved query (can be obtained with `@Info() info` decorator)
 * @param entity The TypeORM entity class (used to extract relations)
 * @returns An object in which each keys is the relation name to satisfy, and its value is the related relations to satisfy
 *
 * Example of use:
 *
 * @Query(() => [Category])
 * async function categories(@Info() info: GraphQLResolveInfo): Promise<Category[]> {
 *   return await Category.find({
 *     relations: makeRelations(info, Category)
 *   });
 * }
 *
 */
export function makeRelations(
  info: GraphQLResolveInfo,
  entity: typeof BaseEntity,
) {
  // We want to extract all possible relations from the graphql request based on the requested field, and whether the field has (or not) subselection (see this answer: https://stackoverflow.com/questions/50548188/graphql-how-to-do-a-join-request-instead-of-many-sequential-request).
  const possibleRelations = {};
  const baseSelectionSet = info.fieldNodes[0]?.selectionSet;
  if (!baseSelectionSet) {
    return {};
  }
  parseSelectionSet(baseSelectionSet, possibleRelations);

  // But since graphql request may have subselections for something else than SQL relations, we should parse all possible relations and check if it's a real SQL relation based on the TypeORM entity (See this answer: https://stackoverflow.com/questions/62757637/get-list-of-relations-for-an-entity-in-typeorm).
  const repository = entity.getRepository();
  const entityRelations = repository.metadata.relations;
  const relations: Record<string, unknown> = {};
  checkRelation(possibleRelations, entityRelations, relations);

  return relations;
}
