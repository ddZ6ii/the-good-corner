import { IdInput } from '@/schemas/utils.schemas';

/**
 * Merge some payload data on an existing database entity.
 *
 * This algorithm aims to solve unicity constraint errors raised when updating an entity with many-to-many relations.
 * Such error typically occurs when updating already existing entries in a junction table with the same values.
 * It results from the underlying behavior ot the .save() method from typeorm, which natively performs an INSERT INTO operation instead of an UPDATE operation, resulting in a unique constraint violation (trying to duplicated already existing entries in the junction table).
 *
 * The trick is to re-use the existing junction table entries from the fetched database entity instead of the incomming data payload (if corresponding to the same entries), and then merge the remaining data on the entity.
 *
 *
 * 1. First, determines whether the data payload contains nested object properties with `IdInput` type (corresponding to many-to-many relations).
 * 2. If any, checks if those values already exist in the entity:
 *    -> if so, replace the payload content with the existing entity content;
 *    -> otherwhise, keep the payload content as is.
 * 3. Finally, merge the payload content on the entity.
 *
 * @param entity The base entity you want to merge your incomming data on (make sure to fetch many-to-many relations).
 * @param data The data payload you want to apply on your base entity (to update).
 * @returns The merged entity (the entity is updated as well).
 */
export function merge<T extends object>(
  entity: T,
  data: Record<string, unknown>,
): T {
  // Should keep existing relations.
  for (const [key, value] of Object.entries(data)) {
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof IdInput
    ) {
      if (!(key in entity)) {
        throw new Error(
          `missing key ${key} in your entity, did you forgot to fetch your relation?`,
        );
      }
      if (Array.isArray(entity[key as keyof T])) {
        data[key] = (data[key] as IdInput[]).map((entry: IdInput) => {
          const existingEntry = (entity[key as keyof T] as IdInput[]).find(
            (entityEntry: IdInput) => entityEntry.id == entry.id,
          );
          return existingEntry ?? entry;
        });
      }
    }
  }
  Object.assign(entity, data);
  return entity;
}
