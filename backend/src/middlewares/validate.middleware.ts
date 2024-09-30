import { BadRequestError, ServerError } from '@/types/CustomError.types.ts';
import { formatZodErrorMessage } from '@/utils/formatZodError.ts';
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export function validate(schema: AnyZodObject) {
  return async (
    req: Request<unknown, unknown, unknown, unknown>,
    _res: Response,
    next: NextFunction,
  ) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errorMessage = formatZodErrorMessage(error);
        next(new BadRequestError(errorMessage));
        return;
      }
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ooops... An unexpected error has occured.';
      next(new ServerError(errorMessage));
    }
  };
}
