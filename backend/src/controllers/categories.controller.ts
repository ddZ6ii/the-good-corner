import { NextFunction, Request, Response } from 'express';
import * as categoriesModel from '@models/categories.model.ts';
import { isEmpty } from '@tgc/common';
import { Category } from '@database/entities/Category.ts';
import { CategoryContent } from '@/types/categories.types.ts';
import {
  IdParam,
  AffectedRow,
  CategoryFilter,
} from '@/types/controller.type.ts';
import { NotFoundError } from '@/types/CustomError.types.ts';

export async function getAll(
  req: Request<unknown, unknown, unknown, CategoryFilter>,
  res: Response<Category[]>,
): Promise<void> {
  const { name: searchFilter } = req.query ?? {};
  const categories = await categoriesModel.findAll(searchFilter);
  res.json(categories);
}

export async function getOne(
  req: Request<IdParam>,
  res: Response<Category[]>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const categories = await categoriesModel.findOneBy(id);
  if (isEmpty(categories)) {
    next(new NotFoundError(`No existing category with "id" ${id.toString()}.`));
    return;
  }
  res.json(categories);
}

export async function create(
  req: Request<unknown, unknown, CategoryContent>,
  res: Response<Category>,
): Promise<void> {
  const content = req.body;
  const createdCategory = await categoriesModel.create(content);
  res.json(createdCategory);
}

export async function remove(
  req: Request<IdParam>,
  res: Response<AffectedRow>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const result = await categoriesModel.remove(id);
  if (result.affected === 0) {
    next(new NotFoundError(`No existing category with "id" ${id.toString()}.`));
    return;
  }
  res.json({ id });
}

export async function patch(
  req: Request<IdParam, unknown, Partial<CategoryContent>>,
  res: Response<Category>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const content = req.body;
  const updatedCategory = await categoriesModel.patch(id, content);
  if (isEmpty(updatedCategory)) {
    next(new NotFoundError(`No existing category with "id" ${id.toString()}.`));
    return;
  }
  res.json(updatedCategory);
}

export async function edit(
  req: Request<IdParam, unknown, CategoryContent>,
  res: Response<Category>,
  next: NextFunction,
): Promise<void> {
  const id = parseInt(req.params.id, 10);
  const content = req.body;
  const updatedCategory = await categoriesModel.put(id, content);
  if (isEmpty(updatedCategory)) {
    next(new NotFoundError(`No existing category with "id" ${id.toString()}.`));
    return;
  }
  res.json(updatedCategory);
}
