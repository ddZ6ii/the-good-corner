import { RequestHandler } from 'express';

export const welcome: RequestHandler<unknown, unknown, unknown, unknown> = (
  _req,
  res,
) => {
  res.send('Hello World!');
};
