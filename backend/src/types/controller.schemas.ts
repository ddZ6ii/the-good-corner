import z from 'zod';
import {
  AdContentSchema,
  AdPartialContentSchema,
  CategoryContentSchema,
  CategoryPartialContentSchema,
  TagContentSchema,
  TagPartialContentSchema,
} from '@tgc/common';

/* -------------------------------------------------------------------------- */
/*                                Utils                                       */
/* -------------------------------------------------------------------------- */
export function SearchSchema<T>(schema: z.ZodType<T>) {
  return z.object({
    query: schema,
  });
}

export const IdParamSchema = z.object({
  id: z.string(),
});

export const IdSchema = IdParamSchema.extend({
  id: z.coerce.number().int().safe().positive(),
});

/* -------------------------------------------------------------------------- */
/*                                Ads                                         */
/* -------------------------------------------------------------------------- */
export const FilterAdSchema = z.optional(
  z.object({
    category: z.string().optional(),
  }),
);

export const FindAllAdsWithFilterSchema = SearchSchema(FilterAdSchema);

export const FindByIdSchema = z.object({
  params: IdSchema,
});

export const CreateAdSchema = z.object({
  body: AdContentSchema,
});

export const PatchAdSchema = z.object({
  body: AdPartialContentSchema,
  params: IdSchema,
});

export const EditAdSchema = z.object({
  body: AdContentSchema,
  params: IdSchema,
});

/* -------------------------------------------------------------------------- */
/*                             Categories                                     */
/* -------------------------------------------------------------------------- */
export const CategoryFilterSchema = z.optional(
  z.object({
    name: z.string().optional(),
  }),
);

export const FindAllCategoriesWithFilterSchema =
  SearchSchema(CategoryFilterSchema);

export const CreateCategorySchema = z.object({
  body: CategoryContentSchema,
});

export const PatchCategorySchema = z.object({
  body: CategoryPartialContentSchema,
  params: IdSchema,
});

export const EditCategorySchema = z.object({
  body: CategoryContentSchema,
  params: IdSchema,
});

/* -------------------------------------------------------------------------- */
/*                                Tags                                        */
/* -------------------------------------------------------------------------- */
export const TagFilterSchema = z.optional(
  z.object({
    name: z.string().optional(),
  }),
);

export const FindAllTagsWithFilterSchema = SearchSchema(TagFilterSchema);

export const CreateTagSchema = z.object({
  body: TagContentSchema,
});

export const PatchTagSchema = z.object({
  body: TagPartialContentSchema,
  params: IdSchema,
});

export const EditTagSchema = z.object({
  body: TagContentSchema,
  params: IdSchema,
});
