import { z } from "zod";
import { isRobust } from "@/utils/robustPassword";

export const SignInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().superRefine(isRobust),
});

export const SignUpSchema = SignInSchema.extend({
  confirmPassword: z.string(),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
