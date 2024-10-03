import { IconBase } from "react-icons";
import { ZodError } from "zod";

export function mapZodError<T extends object>(
  error: ZodError,
  formError: T,
): T {
  const zodError = error.formErrors.fieldErrors;
  const nextFormError = { ...formError };
  const keys = Object.keys(zodError) as (keyof T)[];
  for (const key of keys) {
    const currentValue = formError[key];
    const nextValue = (zodError[key]?.[0] ?? "") as T[keyof T];
    nextFormError[key] = key in formError ? nextValue : currentValue;
  }
  return nextFormError;
}
