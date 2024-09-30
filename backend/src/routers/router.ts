import express from 'express';
import { adsRouter } from './ads.router.ts';
import { categoriesRouter } from './categories.router.ts';
import { tagsRouter } from './tags.router.ts';
import * as routerController from '@controllers/router.controller.ts';

const router = express.Router();

router.use('/ads', adsRouter);
router.use('/categories', categoriesRouter);
router.use('/tags', tagsRouter);

// Handle invalid routes for all HTTP methods.
router.all('*', routerController.handleInvalidRoute);

export default router;
