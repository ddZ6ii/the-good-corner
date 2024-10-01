import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import chalk from 'chalk';
import { dataSource } from './database/db.config.ts';
import router from '@routers/router.ts';
import errorHandler from './middlewares/error.middleware.ts';

const API_PORT = parseInt(process.env.API_PORT ?? '3000', 10);
const app = express();

// Application-level middlewares.
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use('/', router);
/** Custom error-handling middleware
 * ----------------------
 * Must be defined after all the routes.
 * Catch any error thrown from a route or other middleware.
 */
app.use(errorHandler);

// Application initialization.
async function initialize(): Promise<void> {
  // Database connection.
  await dataSource.initialize();

  // Server.
  app.listen(API_PORT, () => {
    console.info(
      chalk.yellow(`Server is running on port ${API_PORT.toString()}`),
    );
  });
}

initialize().catch((err: unknown) => {
  console.error(chalk.red('Failed to initialize the application!'), err);
});
