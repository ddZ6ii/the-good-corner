import express from 'express';
import * as tagsController from '@controllers/tags.controller.ts';

export const tagsRouter = express.Router();

tagsRouter.get('/', tagsController.getAll);
tagsRouter.get('/:id', tagsController.getOne);
tagsRouter.post('/', tagsController.create);
tagsRouter.delete('/:id', tagsController.remove);
tagsRouter.patch('/:id', tagsController.patch);
tagsRouter.put('/:id', tagsController.edit);
