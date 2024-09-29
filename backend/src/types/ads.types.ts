import { Ad } from '@/database/entities/Ad.ts';
import { ExcludeMethods } from './utils.types.ts';
import { CategoryId } from './categories.types.ts';
import { TagId } from './tags.types.ts';

type AdContentNoRelation = Omit<
  ExcludeMethods<Ad>,
  'id' | 'createdAt' | 'category' | 'tags'
>;

export type AdContent = AdContentNoRelation & {
  category: CategoryId;
} & {
  tags?: TagId[];
};
