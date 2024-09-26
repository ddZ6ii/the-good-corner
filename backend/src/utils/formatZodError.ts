import { ZodIssue } from 'zod';
import { isEmpty } from '@tgc/common';

export function formatZodErrorMessage(issue: ZodIssue): string {
  let errorMessage = '';
  const fieldName = issue.path[0];
  if (typeof fieldName === 'string') {
    errorMessage += `"${fieldName}":`;
  }
  const message = issue.message.toLowerCase();
  errorMessage += `${isEmpty(fieldName) ? message : ` ${message}`}.`;
  return errorMessage;
}
