import { DeleteResult } from 'typeorm';
import { Category } from '@database/entities/Category.ts';
import { CategoryContent } from '@/types/categories.types.ts';

export function findAll(): Promise<Category[]> {
  return Category.find();
}

export function findOneBy(categoryId: number): Promise<Category[]> {
  return Category.findBy({ id: categoryId });
}

export function create(content: CategoryContent): Promise<Category> {
  const newCategory = new Category();
  Object.assign(newCategory, content);
  return newCategory.save();
}

export async function remove(categoryId: number): Promise<DeleteResult> {
  return Category.delete({ id: categoryId });
}

// !TODO: should throw a NotFound custom error instead of returning undefined...
export async function patch(
  categoryId: number,
  newContent: Partial<CategoryContent>,
): Promise<Category | undefined> {
  const category = await Category.findOneBy({ id: categoryId });
  if (category === null) return;
  Object.assign(category, newContent);
  return category.save();
}

// !TODO: should throw a NotFound custom error instead of returning undefined...
export async function put(
  categoryId: number,
  nextContent: CategoryContent,
): Promise<Category | undefined> {
  const category = await Category.findOneBy({ id: categoryId });
  if (category === null) return;
  Object.assign(category, nextContent);
  return category.save();
}
