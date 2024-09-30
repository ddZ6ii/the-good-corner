import express from 'express';
import * as categoriesController from '@controllers/categories.controller.ts';
import { validate } from '@/middlewares/validate.middleware.ts';
import {
  FindAllCategoriesWithFilterSchema,
  FindByIdSchema,
  CreateCategorySchema,
  PatchCategorySchema,
  EditCategorySchema,
} from '@/types/controller.schemas.ts';

export const categoriesRouter = express.Router();

categoriesRouter.get(
  '/',
  validate(FindAllCategoriesWithFilterSchema),
  categoriesController.getAll,
);
categoriesRouter.get(
  '/:id',
  validate(FindByIdSchema),
  categoriesController.getOne,
);
categoriesRouter.post(
  '/',
  validate(CreateCategorySchema),
  categoriesController.create,
);
categoriesRouter.delete(
  '/:id',
  validate(FindByIdSchema),
  categoriesController.remove,
);
categoriesRouter.patch(
  '/:id',
  validate(PatchCategorySchema),
  categoriesController.patch,
);
categoriesRouter.put(
  '/:id',
  validate(EditCategorySchema),
  categoriesController.edit,
);
