import { argon2id, hash, verify } from 'argon2';
import chalk from 'chalk';
import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '@/entities/User';
import * as usersModel from '@/models/users.model';
import {
  AddUserInput,
  GetUserArgs,
  GetUsersArgs,
  SignInInput,
} from '@/types/users.types';

/** OWASP minimum recommendations for argon2id:
 *
 *    - memoryCost (memory size m): 19 MiB (2^14.28)
 *    - timeCost (iteration count t): 2
 *    - parallelism (degree of parallelism p): 1
 *
 * For more information, see: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#:~:text=To%20sum%20up%20our%20recommendations,and%201%20degree%20of%20parallelism.
 */
const HASHING_OPTIONS = {
  type: argon2id,
  memoryCost: 2 ** 14.28,
  timeCost: 2,
  parallelism: 1,
};

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
      console.log(chalk.red(error));
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
  ): Promise<User | null> {
    try {
      const user = await usersModel.findOneByEmail(data.email);
      if (!user) {
        return null;
      }
      const passwordMatch = await verify(user.hashedPassword, data.password);
      if (!passwordMatch) {
        return null;
      }
      // !TODO: create jwt token...
      // !TODO: store jwt token in cookie...
      return user;
    } catch (error) {
      console.log(chalk.red(error));
      throw new Error('Failed to sign in!');
    }
  }
}
