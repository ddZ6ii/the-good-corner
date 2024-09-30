import { NotFoundError } from '@/types/CustomError.types.ts';

export function handleInvalidRoute(): void {
  throw new NotFoundError('Invalid route.');
}
