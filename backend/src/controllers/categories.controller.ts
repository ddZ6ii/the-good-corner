import { Request, Response } from 'express';
import { ZodError } from 'zod';
import {
  CategoryContentSchema,
  CategoryPartialContentSchema,
  isEmpty,
} from '@tgc/common';
import * as categoriesModel from '@models/categories.model.ts';
import { formatZodErrorMessage } from '@/utils/formatZodError.ts';
import { Category } from '@database/entities/Category.ts';
import { IdSchema } from '@/types/controller.schemas.ts';
import { IdParam, AffectedRow, CustomError } from '@/types/controller.type.ts';
import { CategoryContent } from '@/types/categories.types.ts';

export async function getAll(
  _req: Request,
  res: Response<Category[] | CustomError>,
): Promise<void> {
  try {
    const categories = await categoriesModel.findAll();
    res.json(categories);
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to fetch categories.',
    });
  }
}

export async function getOne(
  req: Request<IdParam>,
  res: Response<Category[] | CustomError>,
): Promise<void> {
  try {
    const { success, data, error } = IdSchema.safeParse(req.params);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedCategoryId = data.id;
    const categories = await categoriesModel.findOneBy(parsedCategoryId);
    if (isEmpty(categories)) {
      res.status(404).json({ code: 404, message: 'Category not found.' });
    } else {
      res.json(categories);
    }
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to fetch category.',
      });
    }
  }
}

export async function create(
  req: Request<unknown, unknown, CategoryContent>,
  res: Response<Category | CustomError>,
): Promise<void> {
  try {
    const {
      success,
      data: parsedCategoryContent,
      error,
    } = CategoryContentSchema.safeParse(req.body);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const createdCategory = await categoriesModel.create(parsedCategoryContent);
    res.json(createdCategory);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to create category.',
      });
    }
  }
}

export async function remove(
  req: Request<IdParam>,
  res: Response<AffectedRow | CustomError>,
): Promise<void> {
  try {
    const { success, data, error } = IdSchema.safeParse(req.params);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedCategoryId = data.id;
    const result = await categoriesModel.remove(parsedCategoryId);
    if (result.affected === 0) {
      res.status(404).json({ code: 404, message: 'Category not found.' });
    } else {
      res.json({ id: parsedCategoryId });
    }
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to delete category.',
      });
    }
  }
}

export async function patch(
  req: Request<IdParam, unknown, Partial<CategoryContent>>,
  res: Response<Category | CustomError>,
): Promise<void> {
  try {
    const parsedParams = IdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ZodError(parsedParams.error.issues);
    }
    const parsedBody = CategoryPartialContentSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ZodError(parsedBody.error.issues);
    }
    const parsedCategoryId = parsedParams.data.id;
    const parsedCategoryContent = parsedBody.data;
    const updatedCategory = await categoriesModel.patch(
      parsedCategoryId,
      parsedCategoryContent,
    );
    if (isEmpty(updatedCategory)) {
      res.status(404).json({ code: 404, message: 'Category not found.' });
    } else {
      res.json(updatedCategory);
    }
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to update category.',
      });
    }
  }
}

export async function edit(
  req: Request<IdParam, unknown, CategoryContent>,
  res: Response<Category | CustomError>,
): Promise<void> {
  try {
    const parsedParams = IdSchema.safeParse(req.params);
    if (!parsedParams.success) {
      throw new ZodError(parsedParams.error.issues);
    }
    const parsedBody = CategoryContentSchema.safeParse(req.body);
    if (!parsedBody.success) {
      throw new ZodError(parsedBody.error.issues);
    }
    const parsedCategoryId = parsedParams.data.id;
    const parsedCategoryContent = parsedBody.data;
    const updatedCategory = await categoriesModel.put(
      parsedCategoryId,
      parsedCategoryContent,
    );
    if (isEmpty(updatedCategory)) {
      res.status(404).json({ code: 404, message: 'Category not found.' });
    } else {
      res.json(updatedCategory);
    }
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      res.status(400).json({ code: 400, message: errorMessage });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Oops something went wrong... Failed to update category.',
      });
    }
  }
}
