import express from 'express';
import 'dotenv/config';

const API_PORT = parseInt(process.env.API_PORT ?? '3000', 10);
const app = express();

// Server.
app.listen(API_PORT, () => {
  console.log(`Server is running on port ${API_PORT.toString()}`);
});
