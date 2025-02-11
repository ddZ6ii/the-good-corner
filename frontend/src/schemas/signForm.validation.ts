import { z } from 'zod'
import { isRobust } from '@/utils'

export const SignInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(1, { message: 'Password is required' }),
})

export const SignUpSchema = z
  .object({
    email: z.string().trim().email(),
    password: z.string().superRefine(isRobust),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
