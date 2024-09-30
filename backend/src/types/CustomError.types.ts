/** Abstact class
 * ----------------------
 * Serve as a basis for other classes via inheritance (cannot be instantiated itself!), and ensure consistent interface for the errors returned to the client.
 * All abstract members must be implemented in inheriting classes (cannot have an implementation in the abstract class itself!).
 */
export abstract class CustomError extends Error {
  abstract readonly code: number;

  constructor(
    public message = 'Ooops... something went wrong!',
    public name = 'error',
  ) {
    /**
     * Javascript's built-in class 'Error' breaks the prototype chain by switching the object to be constructed (i.e. 'this') to a new different object (i.e. an instance of 'Error' instead of 'CustomError').
     * This problem can be solved by restoring the prototype chain using 'new.target', so every class inheriting from 'CustomError' will also automatically get the correct prototype chain.
     * Reference: https://stackoverflow.com/questions/41102060/typescript-extending-error-class
     */
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serialize(): CustomErrorContent {
    return {
      status: this.name,
      message: this.message,
      code: this.code,
    };
  }
}

export class BadRequestError extends CustomError {
  readonly code: number = 400;
  readonly name: string = 'Bad Request';
  constructor(message?: string, name?: string) {
    super(message ?? 'Bad request.', name);
  }
}

export class NotFoundError extends CustomError {
  readonly code: number = 404;
  readonly name: string = 'Not Found';
  constructor(message?: string, name?: string) {
    super(message ?? 'Not found.', name);
  }
}

export class ServerError extends CustomError {
  readonly code: number = 500;
  readonly name: string = 'Internal Server Error';
  constructor(message?: string, name?: string) {
    super(message ?? 'Ooops... An unexpected error has occured.', name);
  }
}

export type CustomErrorContent = {
  status: string;
  message: string;
  code: number;
};
