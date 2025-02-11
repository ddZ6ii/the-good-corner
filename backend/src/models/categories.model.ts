import { GraphQLResolveInfo } from 'graphql'
import { Like } from 'typeorm'
import { AddCategoryInput, UpdateCategoryInput } from '@/schemas'
import { Category, User } from '@/schemas/entities'
import { makeRelations } from '@/utils'

/**
 * When specifying the `eager: true` option in the Category entity, the related category will be automatically fetched when fetching an category, without having to explicitly set the option `relations: ['ads, ads.tags']` when calling Category.find(), Category.findBy() or findOneBy().
 *
 * Here we use the `makeRelations` function to dynamically build the relations to fetch based on the GraphQL query info object (more efficient).
 */

export function findAll(
  info: GraphQLResolveInfo,
  categoryName?: string,
): Promise<Category[]> {
  if (!categoryName)
    return Category.find({ relations: makeRelations(info, Category) })
  return Category.find({
    where: {
      name: Like(`%${categoryName.toLowerCase()}%`),
    },
    relations: makeRelations(info, Category),
  })
}

export function findOneBy(
  categoryId: number,
  info: GraphQLResolveInfo,
): Promise<Category | null> {
  return Category.findOne({
    where: { id: categoryId },
    relations: makeRelations(info, Category),
  })
}

export function findOneByAuthor(
  categoryId: number,
  userId: number,
  info: GraphQLResolveInfo,
): Promise<Category | null> {
  return Category.findOne({
    where: {
      id: categoryId,
      createdBy: {
        id: userId,
      },
    },
    relations: makeRelations(info, Category),
  })
}

export function create(
  newCategoryContent: AddCategoryInput,
  user: User,
): Promise<Category> {
  const newCategory = new Category()
  Object.assign(newCategory, newCategoryContent, { createdBy: user })
  return newCategory.save()
}

export async function patch(
  categoryId: number,
  updatedCategoryContent: UpdateCategoryInput,
  user: User,
): Promise<Category | null> {
  const category = await Category.findOneBy({
    id: categoryId,
    createdBy: { id: user.id },
  })
  if (category === null) return null
  Object.assign(category, updatedCategoryContent)
  return category.save()
}

export async function remove(
  categoryId: number,
  user: User,
): Promise<Category | null> {
  const category = await Category.findOneBy({
    id: categoryId,
    createdBy: { id: user.id },
  })
  if (category === null) return null
  await category.remove()
  return Object.assign(category, { id: categoryId })
}
