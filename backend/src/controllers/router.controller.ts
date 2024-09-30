import { Request, Response } from 'express';
import { CustomError } from '@/types/controller.type.ts';

export function handleInvalidRoute(_req: Request, res: Response<CustomError>) {
  res.status(400).json({
    code: 400,
    message: 'Invalid route.',
  });
}
