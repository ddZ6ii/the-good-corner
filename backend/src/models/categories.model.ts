import { DeleteResult, Like } from 'typeorm';
import {
  AddCategoryInput,
  UpdateCategoryInput,
} from '@/schemas/categories.schemas';
import { Category } from '@/schemas/entities/Category';
import { User } from '@/schemas/entities/User';

export function findAll(categoryName?: string): Promise<Category[]> {
  if (!categoryName) return Category.find({ relations: ['ads', 'ads.tags'] });
  return Category.find({
    where: {
      name: Like(`%${categoryName.toLowerCase()}%`),
    },
    relations: ['ads', 'ads.tags'],
  });
}

export function findOneBy(categoryId: number): Promise<Category | null> {
  return Category.findOne({
    where: { id: categoryId },
    relations: ['ads', 'ads.tags'],
  });
}

export function findOneByAuthor(
  categoryId: number,
  userId: number,
): Promise<Category | null> {
  return Category.findOne({
    where: {
      id: categoryId,
      createdBy: {
        id: userId,
      },
    },
    relations: ['ads', 'ads.tags'],
  });
}

export function create(
  newCategoryContent: AddCategoryInput,
  user: User,
): Promise<Category> {
  const newCategory = new Category();
  Object.assign(newCategory, newCategoryContent, { createdBy: user });
  return newCategory.save();
}

export async function remove(categoryId: number): Promise<DeleteResult> {
  return Category.delete({ id: categoryId });
}

export async function patch(
  categoryId: number,
  updatedCategoryContent: UpdateCategoryInput,
): Promise<Category | null> {
  const category = await Category.findOneBy({ id: categoryId });
  if (category === null) return null;
  Object.assign(category, updatedCategoryContent);
  return category.save();
}
