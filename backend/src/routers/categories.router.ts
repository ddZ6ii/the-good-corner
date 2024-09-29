import express from 'express';
import * as categoriesController from '@controllers/categories.controller.ts';

export const categoriesRouter = express.Router();

categoriesRouter.get('/', categoriesController.getAll);
categoriesRouter.get('/:id', categoriesController.getOne);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.delete('/:id', categoriesController.remove);
categoriesRouter.patch('/:id', categoriesController.patch);
categoriesRouter.put('/:id', categoriesController.edit);
