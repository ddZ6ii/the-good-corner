import { z } from 'zod';
import { IdParamSchema } from './controller.schemas.ts';

export type IdParam = z.infer<typeof IdParamSchema>;

export type AffectedRow = {
  id: number;
};

export type CustomError = {
  code: number;
  message: string;
};
