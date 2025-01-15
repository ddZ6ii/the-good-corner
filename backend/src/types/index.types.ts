import { IncomingMessage, ServerResponse } from 'node:http';

export type ContextType = {
  req: IncomingMessage;
  res: ServerResponse;
};

/* -------------------------------------------------------------------------- */
/*                        Utilitary functions                                 */
/* -------------------------------------------------------------------------- */
export type ExcludeMethods<T> = {
  [K in keyof T as T[K] extends () => void ? never : K]: T[K];
};
