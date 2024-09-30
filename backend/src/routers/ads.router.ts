import express from 'express';
import * as adsController from '@controllers/ads.controller.ts';
import { validate } from '@/middlewares/validate.middleware.ts';
import {
  FindAllAdsWithFilterSchema,
  FindByIdSchema,
  CreateAdSchema,
  PatchAdSchema,
  EditAdSchema,
} from '@/types/controller.schemas.ts';

export const adsRouter = express.Router();

adsRouter.get('/', validate(FindAllAdsWithFilterSchema), adsController.getAll);
adsRouter.get('/:id', validate(FindByIdSchema), adsController.getOne);
adsRouter.post('/', validate(CreateAdSchema), adsController.create);
adsRouter.delete('/:id', validate(FindByIdSchema), adsController.remove);
adsRouter.patch('/:id', validate(PatchAdSchema), adsController.patch);
adsRouter.put('/:id', validate(EditAdSchema), adsController.edit);
