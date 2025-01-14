import chalk from 'chalk';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { ContextType } from '@/types/context.types';
import { JWT_SECRET_KEY } from '@/config/safety.options';

/** Authorization checker function (similar to a middleware)
 *
 * The order of execution for the GraphQL standalone server is as follows:
 * 1. The `context` function is called for each request.
 * 2. The `authChecker` function is called for each request and determine whether the user can access the requested resource (public = has access, private = restricted access) based on user's authorization token and resource permissions.
 * 3. The `resolver` function related to the requested resource is called for each request (public => all the time, private => only if the user has access).
 *
 */

export const authChecker: AuthChecker<ContextType> = (
  { context },
  _roles,
): boolean => {
  try {
    // Retrieve user's JWT token from cookies (request headers).
    const cookies = new Cookies(context.req, context.res);
    const token = cookies.get('token');
    if (!token) {
      console.warn(chalk.yellow('Access denied! No token provided.'));
      return false; // access dedied
    }
    // Verify JWT token.
    jwt.verify(token, JWT_SECRET_KEY);

    // Optional: check the user's permission against the `roles` argument that comes from the '@Authorized' decorator, eg. ["ADMIN", "MODERATOR"].

    return true; // valid token, access granted
  } catch (error: unknown) {
    let errorMessage = 'Access denied';
    if (error instanceof jwt.JsonWebTokenError) {
      errorMessage += `: ${error.message}`;
      if (error instanceof jwt.TokenExpiredError) {
        errorMessage += ` at ${new Date(error.expiredAt).toLocaleString()}.`;
      }
      errorMessage += `.`;
    } else {
      errorMessage += '!';
    }
    console.error(chalk.red(errorMessage));
    return false; // invalid token, access denied
  }
};
