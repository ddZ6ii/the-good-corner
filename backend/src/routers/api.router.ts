import express from 'express';
import * as apiController from '@controllers/api.controller.ts';

export const apiRouter = express.Router();

apiRouter.get('/', apiController.welcome);
apiRouter.get('/ads', apiController.getAllAds);
apiRouter.post('/ads', apiController.createAd);
apiRouter.delete('/ads/:id', apiController.deleteAdById);
apiRouter.patch('/ads/:id', apiController.partialUpdateAdById);
apiRouter.put('/ads/:id', apiController.updateAdById);
