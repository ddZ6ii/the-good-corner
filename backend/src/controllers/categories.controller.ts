import { NextFunction, Request, Response } from 'express';
import * as categoriesModel from '@models/categories.model.ts';
import { formatZodErrorMessage } from '@/utils/formatZodError.ts';
import {
  CategoryContentSchema,
  CategoryPartialContentSchema,
  isEmpty,
} from '@tgc/common';
import { Category } from '@database/entities/Category.ts';
import { IdSchema, CategoryFilterSchema } from '@/types/controller.schemas.ts';
import { CategoryContent } from '@/types/categories.types.ts';
import {
  IdParam,
  AffectedRow,
  CategoryFilter,
} from '@/types/controller.type.ts';
import { BadRequestError, NotFoundError } from '@/types/CustomError.types.ts';

export async function getAll(
  req: Request<unknown, unknown, unknown, CategoryFilter>,
  res: Response<Category[]>,
  next: NextFunction,
): Promise<void> {
  const { success, data, error } = CategoryFilterSchema.safeParse(req.query);
  if (!success) {
    const errorMessage = formatZodErrorMessage(error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedCategoryFilter = data?.name;
  const categories = await categoriesModel.findAll(parsedCategoryFilter);
  res.json(categories);
}

export async function getOne(
  req: Request<IdParam>,
  res: Response<Category[]>,
  next: NextFunction,
): Promise<void> {
  const { success, data, error } = IdSchema.safeParse(req.params);
  if (!success) {
    const errorMessage = formatZodErrorMessage(error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedCategoryId = data.id;
  const categories = await categoriesModel.findOneBy(parsedCategoryId);
  if (isEmpty(categories)) {
    next(
      new NotFoundError(
        `No existing category with "id" ${parsedCategoryId.toString()}.`,
      ),
    );
    return;
  }
  res.json(categories);
}

export async function create(
  req: Request<unknown, unknown, CategoryContent>,
  res: Response<Category>,
  next: NextFunction,
): Promise<void> {
  const {
    success,
    data: parsedCategoryContent,
    error,
  } = CategoryContentSchema.safeParse(req.body);
  if (!success) {
    const errorMessage = formatZodErrorMessage(error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const createdCategory = await categoriesModel.create(parsedCategoryContent);
  res.json(createdCategory);
}

export async function remove(
  req: Request<IdParam>,
  res: Response<AffectedRow>,
  next: NextFunction,
): Promise<void> {
  const { success, data, error } = IdSchema.safeParse(req.params);
  if (!success) {
    const errorMessage = formatZodErrorMessage(error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedCategoryId = data.id;
  const result = await categoriesModel.remove(parsedCategoryId);
  if (result.affected === 0) {
    next(
      new NotFoundError(
        `No existing category with "id" ${parsedCategoryId.toString()}.`,
      ),
    );
    return;
  }
  res.json({ id: parsedCategoryId });
}

export async function patch(
  req: Request<IdParam, unknown, Partial<CategoryContent>>,
  res: Response<Category>,
  next: NextFunction,
): Promise<void> {
  const parsedParams = IdSchema.safeParse(req.params);
  if (!parsedParams.success) {
    const errorMessage = formatZodErrorMessage(parsedParams.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedBody = CategoryPartialContentSchema.safeParse(req.body);
  if (!parsedBody.success) {
    const errorMessage = formatZodErrorMessage(parsedBody.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedCategoryId = parsedParams.data.id;
  const parsedCategoryContent = parsedBody.data;
  const updatedCategory = await categoriesModel.patch(
    parsedCategoryId,
    parsedCategoryContent,
  );
  if (isEmpty(updatedCategory)) {
    next(
      new NotFoundError(
        `No existing category with "id" ${parsedCategoryId.toString()}.`,
      ),
    );
    return;
  }
  res.json(updatedCategory);
}

export async function edit(
  req: Request<IdParam, unknown, CategoryContent>,
  res: Response<Category>,
  next: NextFunction,
): Promise<void> {
  const parsedParams = IdSchema.safeParse(req.params);
  if (!parsedParams.success) {
    const errorMessage = formatZodErrorMessage(parsedParams.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedBody = CategoryContentSchema.safeParse(req.body);
  if (!parsedBody.success) {
    const errorMessage = formatZodErrorMessage(parsedBody.error.issues[0]);
    next(new BadRequestError(errorMessage));
    return;
  }
  const parsedCategoryId = parsedParams.data.id;
  const parsedCategoryContent = parsedBody.data;
  const updatedCategory = await categoriesModel.put(
    parsedCategoryId,
    parsedCategoryContent,
  );
  if (isEmpty(updatedCategory)) {
    next(
      new NotFoundError(
        `No existing category with "id" ${parsedCategoryId.toString()}.`,
      ),
    );
    return;
  }
  res.json(updatedCategory);
}
