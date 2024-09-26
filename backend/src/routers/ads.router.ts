import express from 'express';
import * as adsController from '@controllers/ads.controller.ts';

export const adsRouter = express.Router();

adsRouter.get('/', adsController.welcome);
adsRouter.get('/ads', adsController.get);
adsRouter.post('/ads', adsController.create);
adsRouter.delete('/ads/:id', adsController.remove);
adsRouter.patch('/ads/:id', adsController.partialEdit);
adsRouter.put('/ads/:id', adsController.edit);
