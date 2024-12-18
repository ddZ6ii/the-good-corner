import z from "zod"

/* -------------------------------------------------------------------------- */
/*                               Constants                                    */
/* -------------------------------------------------------------------------- */
export const AD_CONSTRAINTS = {
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

export const CATEGORY_CONSTRAINTS = {
  name: {
    minLength: 3,
    maxLength: 50,
  },
}

export const TAG_CONSTRAINTS = {
  name: {
    minLength: 3,
    maxLength: 50,
  },
}

/* -------------------------------------------------------------------------- */
/*                                Schemas                                     */
/* -------------------------------------------------------------------------- */
export const IdParamSchema = z.object({
  id: z.string(),
})

export const IdSchema = IdParamSchema.extend({
  id: z.coerce.number().int().safe().positive(),
})

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
  owner: z.string().trim().email(),
  price: z.number().int().positive(),
  picture: z.string().trim().url(),
  location: z
    .string()
    .trim()
    .min(AD_CONSTRAINTS.location.minLength)
    .max(AD_CONSTRAINTS.location.maxLength),
  category: z.object(
    {
      id: z.coerce.number().int().positive(),
    },
    {
      invalid_type_error: "is invalid",
    }
  ),
  tags: z
    .object(
      {
        id: z.coerce.number().int().positive(),
      },
      {
        invalid_type_error:
          "Expected an array of objects with an 'id' property.",
      }
    )
    .array()
    .optional(),
})

export const AdPartialContentSchema = AdContentSchema.partial()

export const AdSchema = AdContentSchema.extend({
  id: z.coerce.number().int().positive(),
  category: z.object(
    {
      id: z.coerce.number().int().positive(),
      name: z
        .string()
        .trim()
        .min(CATEGORY_CONSTRAINTS.name.minLength)
        .max(CATEGORY_CONSTRAINTS.name.maxLength),
    },
    {
      invalid_type_error: "Expected an object with 'id' and 'name' properties.",
    }
  ),
  tags: z
    .object(
      {
        id: z.coerce.number().int().positive(),
        name: z
          .string()
          .trim()
          .min(TAG_CONSTRAINTS.name.minLength)
          .max(TAG_CONSTRAINTS.name.maxLength),
      },
      {
        invalid_type_error:
          "Expected an array of objects with an 'id' property.",
      }
    )
    .array()
    .optional(),
})

export const AdNoTagsSchema = AdContentSchema.omit({
  category: true,
  tags: true,
}).extend({
  id: z.number().int().positive(),
  createdAt: z.string().trim(),
  category: z.object(
    {
      id: z.number().int().positive(),
      name: z
        .string()
        .trim()
        .min(CATEGORY_CONSTRAINTS.name.minLength)
        .max(CATEGORY_CONSTRAINTS.name.maxLength),
    },
    {
      invalid_type_error: "Expected an object with 'id' and 'name' properties.",
    }
  ),
})

export const CategoryContentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(CATEGORY_CONSTRAINTS.name.minLength)
    .max(CATEGORY_CONSTRAINTS.name.maxLength),
})

export const CategorySchema = CategoryContentSchema.extend({
  id: z.number().int().positive(),
})

export const CategoryWthAdsSchema = CategorySchema.extend({
  ads: z.array(AdNoTagsSchema),
})

export const CategoryPartialContentSchema = CategoryContentSchema.partial()

export const TagContentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(TAG_CONSTRAINTS.name.minLength)
    .max(TAG_CONSTRAINTS.name.maxLength),
})

export const TagSchema = TagContentSchema.extend({
  id: z.number().int().positive(),
})

export const TagPartialContentSchema = TagContentSchema.partial()

/* -------------------------------------------------------------------------- */
/*                                Types                                     */
/* -------------------------------------------------------------------------- */
export type IdParam = z.infer<typeof IdParamSchema>
export type Id = z.infer<typeof IdSchema>
export type AdNoTags = z.infer<typeof AdNoTagsSchema>
export type Ad = z.infer<typeof AdSchema>
export type AdContent = z.infer<typeof AdContentSchema>
export type Category = z.infer<typeof CategorySchema>
export type CategoryWithAds = z.infer<typeof CategoryWthAdsSchema>
export type Tag = z.infer<typeof TagSchema>

/* -------------------------------------------------------------------------- */
/*                        Utilitary functions                                 */
/* -------------------------------------------------------------------------- */
export function isEmpty(obj: unknown) {
  // Check for both 'null' and 'undefined' with loose comparison operator.
  if (obj == null) return true
  if (typeof obj === "string" && obj.trim() === "") return true
  if (typeof obj === "number" && Number.isNaN(obj)) return true
  if (Array.isArray(obj) && !obj.length) return true
  if (typeof obj === "object" && !Object.keys(obj).length) return true
  return false
}

export function getOjectKeys<Obj extends object>(obj: Obj): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[]
}
/* -------------------------------------------------------------------------- */
