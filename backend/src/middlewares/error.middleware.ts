import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { CustomError } from '@/types/CustomError.types.ts';

export default function errorHandler(
  error: Error | CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof CustomError) {
    res.status(error.code).json(error.serialize());
  } else {
    console.error(
      chalk.red(
        'Ooops... An unexpected error has occurred:\n',
        JSON.stringify(error, null, 2),
      ),
    );
    res.status(500).json({
      status: error.name,
      code: 500,
      message: error.message,
    });
  }
}
