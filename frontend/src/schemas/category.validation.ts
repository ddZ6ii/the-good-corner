import { z } from 'zod'

export const CATEGORY_CONSTRAINTS = {
  name: {
    minLength: 3,
    maxLength: 50,
  },
}

export const CategoryContentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(CATEGORY_CONSTRAINTS.name.minLength)
    .max(CATEGORY_CONSTRAINTS.name.maxLength),
})
