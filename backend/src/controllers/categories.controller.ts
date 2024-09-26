import { RequestHandler } from 'express';
import { ZodError } from 'zod';
import * as categoriesModel from '@models/categories.model.ts';
import { formatZodErrorMessage } from '@/utils/formatZodError.ts';
import {
  Category,
  CategoryContent,
  CategoryContentSchema,
  isEmpty,
} from '@tgc/common';
import { IdParam, AffectedRow, CustomError } from '@/types/controller.type.ts';
import { IdSchema } from '@/types/controller.schemas.ts';

export const getAll: RequestHandler<
  unknown,
  Category[] | CustomError,
  unknown,
  unknown
> = async (_req, res) => {
  try {
    const categories = await categoriesModel.findAll();
    return res.json(categories);
  } catch (err: unknown) {
    console.error(err);
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to fetch categories.',
    });
  }
};

export const getOne: RequestHandler<
  IdParam,
  Category[] | CustomError,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { success, data, error } = IdSchema.safeParse(req.params);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedAdId = data.id;
    const categories = await categoriesModel.findOne(parsedAdId);
    if (isEmpty(categories)) {
      return res
        .status(404)
        .json({ code: 404, message: 'Category not found.' });
    }
    return res.json(categories);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      return res.status(400).json({ code: 400, message: errorMessage });
    }
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to fetch category.',
    });
  }
};

// ? Why using Zod parse does NOT generate a ZodError?
export const create: RequestHandler<
  unknown,
  AffectedRow[] | CustomError,
  CategoryContent,
  unknown
> = async (req, res) => {
  try {
    const { success, data, error } = CategoryContentSchema.safeParse(req.body);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedCategoryContent = data;
    const insertedRows = await categoriesModel.insert(parsedCategoryContent);
    return res.json(insertedRows);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      return res.status(400).json({ code: 400, message: errorMessage });
    }
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to create category.',
    });
  }
};

export const remove: RequestHandler<
  IdParam,
  AffectedRow[] | CustomError,
  unknown,
  unknown
> = async (req, res) => {
  try {
    const { success, data, error } = IdSchema.safeParse(req.params);
    if (!success) {
      throw new ZodError(error.issues);
    }
    const parsedCategoryId = data.id;
    const deletedRows = await categoriesModel.remove(parsedCategoryId);
    if (isEmpty(deletedRows)) {
      return res
        .status(404)
        .json({ code: 404, message: 'Category not found.' });
    }
    return res.json(deletedRows);
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      return res.status(400).json({ code: 400, message: errorMessage });
    }
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to delete category.',
    });
  }
};

export const partialEdit: RequestHandler<
  IdParam,
  Category[] | CustomError,
  Partial<CategoryContent>,
  unknown
> = async (req, res) => {
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
    if (isEmpty(parsedCategoryContent)) {
      return res.status(400).json({ code: 400, message: 'No data to update.' });
    }
    const updatedCategories = await categoriesModel.partialUpdate(
      parsedCategoryId,
      parsedCategoryContent,
    );
    if (isEmpty(updatedCategories)) {
      return res
        .status(404)
        .json({ code: 404, message: 'Category not found.' });
    }
    return res.json(updatedCategories);
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      return res.status(400).json({ code: 400, message: errorMessage });
    }
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to update category.',
    });
  }
};

export const edit: RequestHandler<
  IdParam,
  Category[] | CustomError,
  CategoryContent,
  unknown
> = async (req, res) => {
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
    const updatedCategories = await categoriesModel.update(
      parsedCategoryId,
      parsedCategoryContent,
    );
    if (isEmpty(updatedCategories)) {
      return res
        .status(404)
        .json({ code: 404, message: 'Category not found.' });
    }
    return res.json(updatedCategories);
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      const errorMessage = formatZodErrorMessage(err.issues[0]);
      return res.status(400).json({ code: 400, message: errorMessage });
    }
    return res.status(500).json({
      code: 500,
      message: 'Oops something went wrong... Failed to update category.',
    });
  }
};
