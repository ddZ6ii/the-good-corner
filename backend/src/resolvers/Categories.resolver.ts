import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import * as categoriesModel from '@/models/categories.model.ts';
import {
  AddCategoryInput,
  GetCategoriesArgs,
  GetCategoryArgs,
  UpdateCategoryInput,
} from '@/schemas/categories.schemas';
import { Category } from '@/schemas/entities/Category';
import { AuthContextType, UserRole } from '@/types/index.types';

@Resolver()
export class CategoriesResolver {
  @Query(() => [Category])
  async categories(
    // Allow to pass optional name parameter to filter categories by name.
    @Args(() => GetCategoriesArgs) { name }: GetCategoriesArgs,
  ): Promise<Category[]> {
    const categories = await categoriesModel.findAll(name);
    return categories;
  }

  // Set nullable to true to allow returning null if no category is found, and avoid throwing an error.
  @Query(() => Category, { nullable: true })
  async category(
    @Args(() => GetCategoryArgs) { id }: GetCategoryArgs,
  ): Promise<Category | null> {
    const category = await categoriesModel.findOneBy(id);
    return category;
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Category)
  async createCategory(
    @Arg('data', () => AddCategoryInput) data: AddCategoryInput,
    @Ctx() context: AuthContextType,
  ): Promise<Category> {
    const createdCategory = await categoriesModel.create(data, context.user);
    return createdCategory;
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Arg('id', () => ID) id: number,
    @Arg('data', () => UpdateCategoryInput)
    data: UpdateCategoryInput,
    @Ctx() context: AuthContextType,
  ): Promise<Category | null> {
    const updatedCategory = await categoriesModel.patch(id, data, context.user);
    return updatedCategory;
  }

  @Authorized(UserRole.ADMIN)
  @Mutation(() => Category, { nullable: true })
  async deleteCategory(
    @Arg('id', () => ID) id: number,
    @Ctx() context: AuthContextType,
  ): Promise<Category | null> {
    const deletedCategory = await categoriesModel.remove(id, context.user);
    return deletedCategory;
  }
}
