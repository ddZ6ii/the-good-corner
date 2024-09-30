import { ZodError } from 'zod';

export function formatZodErrorMessage(error: ZodError): string {
  let errorMessage = '';
  const issues = error.issues;
  if (issues.length === 1 && issues[0].path.length < 1) {
    errorMessage = error.errors[0].message;
  } else {
    issues.forEach((issue) => {
      const formattedPath = issue.path
        .map((p) => `"${p.toString()}"`)
        .join(': ');
      const formattedMessage = issue.message.toLowerCase();
      errorMessage += `${formattedPath} ${formattedMessage}.`;
    });
  }
  return errorMessage;
}
