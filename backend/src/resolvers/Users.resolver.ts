import { hash, verify } from 'argon2';
import chalk from 'chalk';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';
import {
  Arg,
  Args,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import {
  COOKIES_OPTIONS,
  HASHING_OPTIONS,
  JWT_OPTIONS,
  JWT_SECRET_KEY,
} from '@/config/safety.options';
import * as usersModel from '@/models/users.model';
import {
  AddUserInput,
  GetUserArgs,
  GetUsersArgs,
  SignInInput,
} from '@/schemas/users.schemas';
import { User } from '@/schemas/entities/User';
import { ContextType, UserIDJwtPayload } from '@/types/index.types';

@Resolver()
export class UsersResolver {
  @Query(() => [User])
  async users(
    // Allow to pass optional parameter to find user by email.
    @Args(() => GetUsersArgs) { email }: GetUsersArgs,
  ): Promise<User[]> {
    const users = await usersModel.findAll(email);
    return users;
  }

  // Set nullable to true to allow returning null if no user is found, and avoid throwing an error.
  @Query(() => User, { nullable: true })
  async user(
    @Args(() => GetUserArgs) { id }: GetUserArgs,
  ): Promise<User | null> {
    const user = await usersModel.findOneById(id);
    return user;
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async whoAmI(@Ctx() context: ContextType): Promise<User | null> {
    const cookies = new Cookies(context.req, context.res);
    const token = cookies.get('token');
    if (!token) {
      return null;
    }
    const payload = jwt.decode(token) as unknown as UserIDJwtPayload;
    const user = await usersModel.findOneById(payload.id);
    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Arg('data', () => AddUserInput) data: AddUserInput,
  ): Promise<User> {
    try {
      const match = await usersModel.findOneByEmail(data.email);
      if (match !== null) {
        throw new Error('User already exists.');
      }
      const hashedPassword = await hash(data.password, HASHING_OPTIONS);
      const newUserContent = Object.assign(data, {
        hashedPassword,
        password: null, // remove clear password
      });
      const createdUser = await usersModel.create(newUserContent);
      return createdUser;
    } catch (error) {
      console.error(chalk.red(error));
      let errorMessage = 'Failed to create user!';
      if (error instanceof Error) {
        errorMessage += ` ${error.message}`;
      }
      throw new Error(errorMessage);
    }
  }

  @Mutation(() => User, { nullable: true })
  async signInUser(
    @Arg('data', () => SignInInput) data: SignInInput,
    @Ctx() context: ContextType,
  ): Promise<User | null> {
    try {
      // Authenticate user (verify its identity through credentials).
      const user = await usersModel.findOneByEmail(data.email);
      if (!user) {
        return null;
      }
      const passwordMatch = await verify(user.hashedPassword, data.password);
      if (!passwordMatch) {
        return null;
      }
      // Authorize user (generate JWT token to be stored in the client's browser's cookies, will be sent in all further requests to serve as a proof of the user'identity).
      const payload: UserIDJwtPayload = { id: user.id };
      const token = jwt.sign(payload, JWT_SECRET_KEY, JWT_OPTIONS);
      const cookies = new Cookies(context.req, context.res);
      cookies.set('token', token, COOKIES_OPTIONS);
      return user;
    } catch (error) {
      console.error(chalk.red(error));
      let errorMessage = 'Failed to sign in!';
      if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      }
      throw new Error(errorMessage);
    }
  }
}
