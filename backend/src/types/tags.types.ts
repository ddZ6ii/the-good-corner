import { Tag } from '@/database/entities/Tag.ts';
import { ExcludeMethods } from './utils.types.ts';

export type TagContent = Omit<ExcludeMethods<Tag>, 'id' | 'ads'>;

export type TagId = Omit<ExcludeMethods<Tag>, 'ads' | 'name'>;
