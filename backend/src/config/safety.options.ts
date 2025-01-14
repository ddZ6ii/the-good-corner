import { argon2id, Options } from 'argon2';
import Cookies from 'cookies';
import { SignOptions } from 'jsonwebtoken';

/** OWASP minimum recommendations for argon2id:
 *
 *    - memoryCost (memory size m): 19 MiB (2^14.28)
 *    - timeCost (iteration count t): 2
 *    - parallelism (degree of parallelism p): 1
 *
 * For more information, see: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#:~:text=To%20sum%20up%20our%20recommendations,and%201%20degree%20of%20parallelism.
 */
export const HASHING_OPTIONS: Options = {
  type: argon2id,
  memoryCost: 2 ** 14.28,
  timeCost: 2,
  parallelism: 1,
};

export const JWT_OPTIONS: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '3 days',
};

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined!');
}

export const COOKIES_OPTIONS: Cookies.SetOption = {
  httpOnly: true, // prevents client-side JavaScript from accessing the cookies, only HTTP responses are allowed to set cookies (mitigates XSS attacks)
  maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
  sameSite: 'strict', // prevents the cookie from being sent by the browser to a different site (mitigates CSRF and XSSI attacks)
  secure: process.env.NODE_ENV === 'production', // ensures the cookie is only sent over HTTPS (production only)
};
