import express from 'express';
import * as adsController from '@controllers/ads.controller.ts';

export const adsRouter = express.Router();

adsRouter.get('/', adsController.get);
adsRouter.post('/', adsController.create);
adsRouter.delete('/:id', adsController.remove);
adsRouter.patch('/:id', adsController.partialEdit);
adsRouter.put('/:id', adsController.edit);

// // ✅ Solution 1 -> URL search filters (max length limitation)
// ('/ads?category=electronics&category=home');
// // ✅ Solution 1 alternative -> give access to req.body (not shareable)
// adsRouter.post('/ads/searches');

// // ❌ Solution 2 -> endpoint
// // adsRouter.get('/ads/:category', adsController.get);
// // adsRouter.get('/ads/:id', adsController.get);

// // ✅ Solution 3 -> API endpoint (navigation)
// categoriesRouter.get('/categories/:id/ads', categoriesController.get);
