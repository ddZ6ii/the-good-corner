import z from 'zod';

const AD_CONSTRAINTS = {
  minLength: 5,
};

/* -------------------------------------------------------------------------- */
/*                                Schemas                                     */
/* -------------------------------------------------------------------------- */
export const AdContentSchema = z.object({
  title: z.string().trim().min(AD_CONSTRAINTS.minLength),
  description: z.string().trim().min(AD_CONSTRAINTS.minLength),
  owner: z.string().trim().email(),
  price: z.number().nonnegative(),
  picture: z.string().trim().url(),
  location: z.string().trim().min(AD_CONSTRAINTS.minLength),
});

export const AdSchema = AdContentSchema.extend({
  id: z.number().positive(),
  createdAt: z.string().datetime(),
});

export const PartialAdContentSchema = AdContentSchema.partial();

/* -------------------------------------------------------------------------- */
/*                               Types                                        */
/* -------------------------------------------------------------------------- */
export type Ad = z.infer<typeof AdSchema>;
export type AdContent = z.infer<typeof AdContentSchema>;

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
