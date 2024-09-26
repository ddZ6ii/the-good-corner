import express from 'express';
import * as mainController from '@controllers/main.controller.ts';

export const mainRouter = express.Router();

mainRouter.get('/', mainController.welcome);
