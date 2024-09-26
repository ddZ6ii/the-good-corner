import express from 'express';
import * as categoriesController from '@controllers/categories.controller.ts';

export const categoriesRouter = express.Router();

categoriesRouter.get('/', categoriesController.get);
categoriesRouter.post('/', categoriesController.create);
categoriesRouter.delete('/:id', categoriesController.remove);
categoriesRouter.patch('/:id', categoriesController.partialEdit);
categoriesRouter.put('/:id', categoriesController.edit);

// // ✅ Solution 1 -> URL search filters (max length limitation)
// ('/ads?category=electronics&category=home');
// // ✅ Solution 1 alternative -> give access to req.body (not shareable)
// adsRouter.post('/ads/searches');

// // ❌ Solution 2 -> endpoint
// // adsRouter.get('/ads/:category', adsController.get);
// // adsRouter.get('/ads/:id', adsController.get);

// // ✅ Solution 3 -> API endpoint (navigation)
// categoriesRouter.get('/categories/:id/ads', categoriesController.get);
