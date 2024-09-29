import z from 'zod';

/* -------------------------------------------------------------------------- */
/*                               Constants                                    */
/* -------------------------------------------------------------------------- */
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
    minLength: 5,
    maxLength: 50,
  },
};

const CATEGORY_CONSTRAINTS = {
  name: {
    minLength: 5,
    maxLength: 50,
  },
};

const TAG_CONSTRAINTS = {
  name: {
    minLength: 5,
    maxLength: 50,
  },
};

/* -------------------------------------------------------------------------- */
/*                                Schemas                                     */
/* -------------------------------------------------------------------------- */
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
  price: z.number().nonnegative(),
  picture: z.string().trim().url(),
  location: z
    .string()
    .trim()
    .min(AD_CONSTRAINTS.location.minLength)
    .max(AD_CONSTRAINTS.location.maxLength),
  category: z.object(
    {
      id: z.number().int().positive(),
    },
    {
      invalid_type_error: "Expected an object with an 'id' property.",
      // message: "Expected an object with an 'id' property.",
    }
  ),
  tags: z
    .object(
      {
        id: z.number().int().positive(),
      },
      {
        invalid_type_error:
          "Expected an array of objects with an 'id' property.",
        // message: "Expected an object with an 'id' property.",
      }
    )
    .array()
    .optional(),
});

export const AdPartialContentSchema = AdContentSchema.partial();

export const CategoryContentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(CATEGORY_CONSTRAINTS.name.minLength)
    .max(CATEGORY_CONSTRAINTS.name.maxLength),
});

export const CategoryPartialContentSchema = CategoryContentSchema.partial();

export const TagContentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(TAG_CONSTRAINTS.name.minLength)
    .max(TAG_CONSTRAINTS.name.maxLength),
});

export const TagPartialContentSchema = TagContentSchema.partial();

/* -------------------------------------------------------------------------- */
/*                        Utilitary functions                                 */
/* -------------------------------------------------------------------------- */
export function isEmpty(obj: unknown) {
  // Check for both 'null' and 'undefined' with loose comparison operator.
  if (obj == null) return true;
  if (typeof obj === 'string' && obj.trim() === '') return true;
  if (typeof obj === 'number' && Number.isNaN(obj)) return true;
  if (Array.isArray(obj) && !obj.length) return true;
  if (typeof obj === 'object' && !Object.keys(obj).length) return true;
  return false;
}
/* -------------------------------------------------------------------------- */
