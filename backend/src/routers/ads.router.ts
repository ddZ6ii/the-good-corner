import express from 'express';
import * as adsController from '@controllers/ads.controller.ts';

export const adsRouter = express.Router();

adsRouter.get('/', adsController.getAll);
adsRouter.get('/:id', adsController.getOne);
adsRouter.post('/', adsController.create);
adsRouter.delete('/:id', adsController.remove);
adsRouter.patch('/:id', adsController.patch);
adsRouter.put('/:id', adsController.edit);
