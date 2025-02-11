import { z } from 'zod'
import { CATEGORY_CONSTRAINTS } from '@/schemas/category.validation'
import { TAG_CONSTRAINTS } from '@/schemas/tag.validation'

const AD_CONSTRAINTS = {
  title: {
    minLength: 5,
    maxLength: 50,
  },
  description: {
    minLength: 5,
    maxLength: 500,
  },
  location: {
    minLength: 3,
    maxLength: 50,
  },
}

export const AdContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(AD_CONSTRAINTS.title.minLength)
    .max(AD_CONSTRAINTS.title.maxLength),
  description: z
    .string()
    .trim()
    .min(AD_CONSTRAINTS.description.minLength)
    .max(AD_CONSTRAINTS.description.maxLength),
  price: z.number().int().positive(),
  picture: z.string().trim().url(),
  location: z
    .string()
    .trim()
    .min(AD_CONSTRAINTS.location.minLength)
    .max(AD_CONSTRAINTS.location.maxLength),
  category: z.object(
    {
      id: z.string(),
    },
    {
      invalid_type_error: 'is invalid',
    },
  ),
  tags: z
    .object(
      {
        id: z.string(),
      },
      {
        invalid_type_error:
          "Expected an array of objects with an 'id' property.",
      },
    )
    .array()
    .optional(),
})

export const AdPartialContentSchema = AdContentSchema.partial()

export const AdSchema = AdContentSchema.extend({
  id: z.string(),
  category: z.object(
    {
      id: z.string(),
      name: z
        .string()
        .trim()
        .min(CATEGORY_CONSTRAINTS.name.minLength)
        .max(CATEGORY_CONSTRAINTS.name.maxLength),
    },
    {
      invalid_type_error: "Expected an object with 'id' and 'name' properties.",
    },
  ),
  tags: z
    .object(
      {
        id: z.string(),
        name: z
          .string()
          .trim()
          .min(TAG_CONSTRAINTS.name.minLength)
          .max(TAG_CONSTRAINTS.name.maxLength),
      },
      {
        invalid_type_error:
          "Expected an array of objects with an 'id' property.",
      },
    )
    .array()
    .optional(),
})
