import { z } from 'zod';
import {
  IdParamSchema,
  CategoryFilterSchema,
  FilterAdByCategorySchema,
} from './controller.schemas.ts';

export type IdParam = z.infer<typeof IdParamSchema>;
export type CategoryFilter = z.infer<typeof CategoryFilterSchema>;
export type FilterAdByCategory = z.infer<typeof FilterAdByCategorySchema>;
export type AffectedRow = {
  id: number;
};
export type CustomError = {
  code: number;
  message: string;
};
