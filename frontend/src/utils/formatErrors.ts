import { ZodError } from "zod";

export function mapZodError<T extends Record<keyof T, string[]>>(
  error: ZodError,
  currentFormError: T,
): T {
  const zodError = error.formErrors.fieldErrors;
  const keys = Object.keys(zodError) as (keyof T)[];
  return keys.reduce((acc, key) => {
    return { ...acc, [key]: zodError[key] };
  }, currentFormError);
}

export function formatFormErrors<T extends Record<keyof T, string[]>>(
  currentFormError: T,
  fieldName: keyof T,
): string[] {
  if (fieldName !== "password") {
    return currentFormError[fieldName];
  }
  const formattedErrors: string[] = [
    "Please make sure your password meet the strength requirements:",
  ];
  for (const error of currentFormError[fieldName]) {
    formattedErrors.push(error);
  }
  return formattedErrors;
}
