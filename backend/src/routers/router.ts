import express from 'express';
import { mainRouter } from './main.router.ts';
import { adsRouter } from './ads.router.ts';

const router = express.Router();

router.use('/', mainRouter);
router.use('/ads', adsRouter);

export default router;
