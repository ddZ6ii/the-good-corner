import z from 'zod';

export const IdParamSchema = z.object({
  id: z.string(),
});

export const IdSchema = IdParamSchema.extend({
  id: z.coerce.number().int().safe().positive(),
});

export const CategoryFilterSchema = z.optional(
  z.object({
    name: z.string().optional(),
  }),
);
