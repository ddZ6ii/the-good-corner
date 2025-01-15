import { Arg, Args, ID, Mutation, Query, Resolver } from 'type-graphql';
import * as categoriesModel from '@/models/categories.model.ts';
import {
  AddCategoryInput,
  GetCategoriesArgs,
  GetCategoryArgs,
  UpdateCategoryInput,
} from '@/schemas/categories.schemas';
import { Category } from '@/schemas/entities/Category';

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

  @Mutation(() => Category)
  async createCategory(
    @Arg('data', () => AddCategoryInput) data: AddCategoryInput,
  ): Promise<Category> {
    const createdCategory = await categoriesModel.create(data);
    return createdCategory;
  }

  @Mutation(() => Category, { nullable: true })
  async updateCategory(
    @Arg('id', () => ID) id: number,
    @Arg('data', () => UpdateCategoryInput)
    data: UpdateCategoryInput,
  ): Promise<Category | null> {
    const updatedCategory = await categoriesModel.patch(id, data);
    return updatedCategory;
  }

  @Mutation(() => ID, { nullable: true })
  async deleteCategory(
    @Arg('id', () => ID) id: number,
  ): Promise<number | null> {
    const result = await categoriesModel.remove(id);
    if (result.affected === 0) {
      return null;
    }
    return id;
  }
}
