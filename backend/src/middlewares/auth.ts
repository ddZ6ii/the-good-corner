import chalk from 'chalk';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { JWT_SECRET_KEY } from '@/config/safety.options';
import * as usersModel from '@/models/users.model';
import { User } from '@/schemas/entities/User';
import { ContextType, UserIDJwtPayload } from '@/types/index.types';

/** Retrieve the current user from the context (utilitary function, avoid code duplication)
 *
 * @param context - The context object that contains the request and response objects.
 * @returns The user object if found (authenticated user), otherwise null.
 *
 */
export const getUserFromContext = async (
  context: ContextType,
): Promise<User | null> => {
  try {
    // Retrieve user's JWT from cookies (request headers).
    const cookies = new Cookies(context.req, context.res);
    const token = cookies.get('token');
    if (!token) {
      throw new Error('No token provided.');
    }

    // Check user's authorization (verify both JWT signature validity and expiration) and retrieve user's ID from the decoded payload (if a callback function is not provided, the `verify` method returns the decoded payload).
    const payload = jwt.verify(
      token,
      JWT_SECRET_KEY,
    ) as unknown as UserIDJwtPayload;

    // Retrieve user's data from the database.
    const user = await usersModel.findOneById(payload.id);

    return user;
  } catch (error: unknown) {
    let errorMessage = 'Access denied:';
    if (error instanceof jwt.JsonWebTokenError) {
      errorMessage += ` ${error.message}`;
      if (error instanceof jwt.TokenExpiredError) {
        errorMessage += ` at ${new Date(error.expiredAt).toLocaleString()}`;
      }
    } else {
      errorMessage += ` ${JSON.stringify(error)}`;
    }
    console.error(chalk.red(errorMessage));
    return null;
  }
};

/** Authorization checker function (similar to a middleware)
 *
 * The order of execution for the GraphQL standalone server is as follows:
 * 1. The `context` function is called for each request.
 * Next step(s) will depend whether the requested resource is protected or not:
 *
 * For `public` resources (without the `@Authorized` decorator):
 *  2. The related `resolver` function is called directly for each request. The `authChecker` function is not called!
 *
 * For `private` resources (with the `@Authorized` decorator):
 *  2. The `authChecker` function is called for each request and determine whether the user is allowed (has permission, is authorized) to access the protected resource. If the user is not allowed, the request is rejected and the `resolver` function is not called. If the user is authorized, the request proceeds to the next step.
 *  3. Finally, the `resolver` function related to the requested resource is called for each request (public => all the time, private => only if the user has access). *
 */
export const authChecker: AuthChecker<ContextType> = async (
  { context },
  roles,
): Promise<boolean> => {
  // Least privileged by default: if not roles are provided within the `@Authorized` decorator of a protected route, the user must have the `admin` role to access the resource.
  if (!roles.length) {
    roles.push('admin');
  }

  // Retrieve the current user from both JWT and the database.
  const user = await getUserFromContext(context);

  // Add user to the context object to share data between resolvers.
  context.user = user;

  // Proceed to resolver's function only if user is authenticated and authorized for the request ressource (check user's permission against the privilege level required for the requested ressource)
  return !!(user && roles.includes(user.role)); // cast a "truthy" or "falsy" value to a boleean value: return true if the user is allowed to access the resource (valid token), false otherwise (invalid token or token expired)
};
