import { z } from 'zod'

export const TAG_CONSTRAINTS = {
  name: {
    minLength: 3,
    maxLength: 50,
  },
}

export const TagContentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(TAG_CONSTRAINTS.name.minLength)
    .max(TAG_CONSTRAINTS.name.maxLength),
})
