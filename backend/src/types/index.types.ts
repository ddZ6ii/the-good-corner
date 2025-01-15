import jwt from 'jsonwebtoken';
import { IncomingMessage, ServerResponse } from 'node:http';

export type ContextType = {
  req: IncomingMessage;
  res: ServerResponse;
};

export interface UserIDJwtPayload extends jwt.JwtPayload {
  id: number;
}

/* -------------------------------------------------------------------------- */
/*                        Utilitary functions                                 */
/* -------------------------------------------------------------------------- */
export type ExcludeMethods<T> = {
  [K in keyof T as T[K] extends () => void ? never : K]: T[K];
};
