import 'reflect-metadata';
import express from 'express';
import 'dotenv/config';
import chalk from 'chalk';
import { dataSource } from './database/db.config.ts';
import router from '@routers/router.ts';

const API_PORT = parseInt(process.env.API_PORT ?? '3000', 10);
const app = express();

// Application-level middlewares.
app.use(express.json());
app.use('/', router);

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
