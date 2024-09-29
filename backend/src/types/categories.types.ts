import { Category } from '@/database/entities/Category.ts';
import { ExcludeMethods } from './utils.types.ts';

export type CategoryContent = Omit<ExcludeMethods<Category>, 'id' | 'ads'>;

export type CategoryId = Omit<ExcludeMethods<Category>, 'ads' | 'name'>;
