import { GraphQLResolveInfo } from 'graphql'
import { Like } from 'typeorm'
import { AddTagInput, UpdateTagInput } from '@/schemas'
import { Tag, User } from '@/schemas/entities'
import { makeRelations } from '@/utils'

/*
  When specifying the `eager: true` option in the Tag entity, the related category will be automatically fetched when fetching an tag, without having to explicitly set the option `relations: ['ads, ads.tags']` when calling Tag.find(), Tag.findBy() or findOneBy().
 
  Here we use the `makeRelations` function to dynamically build the relations to fetch based on the GraphQL query info object (more efficient).
*/

export function findAll(
  info: GraphQLResolveInfo,
  tagName?: string,
): Promise<Tag[]> {
  // Add nested `ads.tags` relations to the query to also display all the other tags related to an ad for each tag.
  if (!tagName) return Tag.find({ relations: makeRelations(info, Tag) })
  return Tag.find({
    where: {
      name: Like(`%${tagName.toLowerCase()}%`),
    },
    relations: makeRelations(info, Tag),
  })
}

export function findOneBy(
  tagId: number,
  info: GraphQLResolveInfo,
): Promise<Tag | null> {
  return Tag.findOne({
    where: { id: tagId },
    relations: makeRelations(info, Tag),
  })
}

export function create(newTagContent: AddTagInput, user: User): Promise<Tag> {
  const newTag = new Tag()
  Object.assign(newTag, newTagContent, { createdBy: user })
  return newTag.save()
}

export async function patch(
  tagId: number,
  updatedTagContent: UpdateTagInput,
  user: User,
): Promise<Tag | null> {
  const tag = await Tag.findOneBy({ id: tagId, createdBy: { id: user.id } })
  if (tag === null) return null
  Object.assign(tag, updatedTagContent)
  return tag.save()
}

export async function remove(tagId: number, user: User): Promise<Tag | null> {
  const tag = await Tag.findOneBy({
    id: tagId,
    createdBy: { id: user.id },
  })
  if (tag === null) return null
  await tag.remove()
  return Object.assign(tag, { id: tagId })
}
