import { IncomingMessage, ServerResponse } from 'node:http';

export type ContextType = {
  req: IncomingMessage;
  res: ServerResponse;
};
