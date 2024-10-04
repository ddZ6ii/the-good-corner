import { ZodError } from "zod";

export function mapZodError<T extends object>(
  error: ZodError,
  currentFormError: T,
): T {
  const zodError = error.formErrors.fieldErrors;
  const keys = Object.keys(zodError) as (keyof T)[];
  return keys.reduce((acc, key) => {
    const zodErrorMessage = zodError[key]?.[0];
    return { ...acc, [key]: zodErrorMessage };
  }, currentFormError);
}
