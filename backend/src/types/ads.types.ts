import { Ad } from '@/database/entities/Ad.ts';
import { ExcludeMethods } from './utils.types.ts';
import { CategoryId } from './categories.types.ts';

type AdContentNoCategory = Omit<
  ExcludeMethods<Ad>,
  'id' | 'createdAt' | 'category' | 'tags'
>;

export type AdContent = AdContentNoCategory & {
  category: CategoryId;
};
