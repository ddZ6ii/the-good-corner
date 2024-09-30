import express from 'express';
import * as tagsController from '@controllers/tags.controller.ts';
import { validate } from '@/middlewares/validate.middleware.ts';
import {
  FindAllTagsWithFilterSchema,
  FindByIdSchema,
  CreateTagSchema,
  PatchTagSchema,
  EditTagSchema,
} from '@/types/controller.schemas.ts';

export const tagsRouter = express.Router();

tagsRouter.get(
  '/',
  validate(FindAllTagsWithFilterSchema),
  tagsController.getAll,
);
tagsRouter.get('/:id', validate(FindByIdSchema), tagsController.getOne);
tagsRouter.post('/', validate(CreateTagSchema), tagsController.create);
tagsRouter.delete('/:id', validate(FindByIdSchema), tagsController.remove);
tagsRouter.patch('/:id', validate(PatchTagSchema), tagsController.patch);
tagsRouter.put('/:id', validate(EditTagSchema), tagsController.edit);
