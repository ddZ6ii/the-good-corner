import { DeleteResult, Like } from 'typeorm';
import { Category } from '@database/entities/Category.ts';
import { CategoryContent } from '@/types/categories.types.ts';

export function findAll(categoryName: string | undefined): Promise<Category[]> {
  if (!categoryName) return Category.find();
  return Category.findBy({
    name: Like(`%${categoryName.toLowerCase()}%`),
  });
}

export function findOneBy(categoryId: number): Promise<Category | null> {
  return Category.findOne({
    where: { id: categoryId },
    relations: ['ads', 'ads.tags'],
  });
}

export function create(content: CategoryContent): Promise<Category> {
  const newCategory = new Category();
  Object.assign(newCategory, content);
  return newCategory.save();
}

export async function remove(categoryId: number): Promise<DeleteResult> {
  return Category.delete({ id: categoryId });
}

export async function patch(
  categoryId: number,
  newContent: Partial<CategoryContent>,
): Promise<Category | undefined> {
  const category = await Category.findOneBy({ id: categoryId });
  if (category === null) return;
  Object.assign(category, newContent);
  return category.save();
}

export async function put(
  categoryId: number,
  nextContent: CategoryContent,
): Promise<Category | undefined> {
  const category = await Category.findOneBy({ id: categoryId });
  if (category === null) return;
  Object.assign(category, nextContent);
  return category.save();
}
