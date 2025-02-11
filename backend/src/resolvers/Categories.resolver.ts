import { GraphQLResolveInfo } from 'graphql'
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Info,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql'
import { categoriesModel } from '@/models'
import {
  AddCategoryInput,
  GetCategoriesArgs,
  GetCategoryArgs,
  UpdateCategoryInput,
} from '@/schemas'
import { Category } from '@/schemas/entities'
import { AuthContextType, UserRole } from '@/types'

@Resolver()
export class CategoriesResolver {
  @Query(() => [Category])
  async categories(
    // Allow to pass optional name parameter to filter categories by name.
    @Args(() => GetCategoriesArgs) { name }: GetCategoriesArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Category[]> {
    const categories = await categoriesModel.findAll(info, name)
    return categories
  }

  // Set nullable to true to allow returning null if no category is found, and avoid throwing an error.
  @Query(() => Category, { nullable: true })
  async category(
    @Args(() => GetCategoryArgs) { id }: GetCategoryArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Category | null> {
    const category = await categoriesModel.findOneBy(id, info)
    return category
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Category)
  async createCategory(
    @Arg('data', () => AddCategoryInput) data: AddCategoryInput,
    @Ctx() context: AuthContextType,
  ): Promise<Category> {
    const createdCategory = await categoriesModel.create(data, context.user)
    return createdCategory
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Arg('id', () => ID) id: number,
    @Arg('data', () => UpdateCategoryInput)
    data: UpdateCategoryInput,
    @Ctx() context: AuthContextType,
  ): Promise<Category | null> {
    const updatedCategory = await categoriesModel.patch(id, data, context.user)
    return updatedCategory
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Category, { nullable: true })
  async deleteCategory(
    @Arg('id', () => ID) id: number,
    @Ctx() context: AuthContextType,
  ): Promise<Category | null> {
    const deletedCategory = await categoriesModel.remove(id, context.user)
    return deletedCategory
  }
}
