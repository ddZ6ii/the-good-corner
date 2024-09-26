import express from 'express';
import 'dotenv/config';
import { adsRouter } from '@routers/ads.router.ts';

const API_PORT = parseInt(process.env.API_PORT ?? '3000', 10);
const app = express();

// Application-level middlewares.
app.use(express.json());
app.use('/', adsRouter);

// Server.
app.listen(API_PORT, () => {
  console.log(`Server is running on port ${API_PORT.toString()}`);
});
