import jwt from 'jsonwebtoken';
import { IncomingMessage, ServerResponse } from 'node:http';
import { User } from '@/schemas/entities/User';

export type ContextType = {
  req: IncomingMessage;
  res: ServerResponse;
  user: Nullable<User>; // null = user either not authenticated or either not authorized, undefined = user not checked yet, User = user authenticated and authorized
};

// Restrict the `user` type to `User` (no `null` nor `undefined` values) to be used with resources protected by the `@Authorized` decorator (checks already performed by the `authChecker` function).
export type AuthContextType = ContextType & {
  user: User;
};

export type UserIDJwtPayload = {
  id: number;
} & jwt.JwtPayload;

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

/* -------------------------------------------------------------------------- */
/*                        Utilitary functions                                 */
/* -------------------------------------------------------------------------- */
export type ExcludeMethods<T> = {
  [K in keyof T as T[K] extends () => void ? never : K]: T[K];
};

export type Nullable<T> = T | null | undefined;
