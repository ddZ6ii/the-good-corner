import express from 'express';
import { adsRouter } from './ads.router.ts';
import { categoriesRouter } from './categories.router.ts';
import { tagsRouter } from './tags.router.ts';

const router = express.Router();

router.use('/ads', adsRouter);
router.use('/categories', categoriesRouter);
router.use('/tags', tagsRouter);

export default router;
