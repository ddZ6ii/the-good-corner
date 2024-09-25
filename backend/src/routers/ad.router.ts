import express from 'express';
import * as adController from '@controllers/ad.controller.ts';

export const adRouter = express.Router();

adRouter.get('/', adController.welcome);
adRouter.get('/ads', adController.get);
adRouter.post('/ads', adController.create);
adRouter.delete('/ads/:id', adController.remove);
adRouter.patch('/ads/:id', adController.partialEdit);
adRouter.put('/ads/:id', adController.edit);
