import { z } from 'zod';
import {
  IdParamSchema,
  CategoryFilterSchema,
  TagFilterSchema,
  FilterAdSchema,
} from './controller.schemas.ts';

export type IdParam = z.infer<typeof IdParamSchema>;
export type CategoryFilter = z.infer<typeof CategoryFilterSchema>;
export type TagFilter = z.infer<typeof TagFilterSchema>;
export type FilterAdByCategory = z.infer<typeof FilterAdSchema>;
export type FilterAd = z.infer<typeof FilterAdSchema>;
export type AffectedRow = {
  id: number;
};
