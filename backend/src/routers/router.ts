import express from 'express';
import { mainRouter } from './main.router.ts';
import { adsRouter } from './ads.router.ts';
import { categoriesRouter } from './categories.router.ts';

const router = express.Router();

router.use('/', mainRouter);
router.use('/ads', adsRouter);
router.use('/categories', categoriesRouter);

export default router;
