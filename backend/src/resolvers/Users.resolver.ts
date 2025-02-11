import { hash, verify } from 'argon2'
import chalk from 'chalk'
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'
import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import {
  COOKIES_OPTIONS,
  HASHING_OPTIONS,
  JWT_OPTIONS,
  JWT_SECRET_KEY,
} from '@/config'
import { getUserFromContext } from '@/middlewares'
import { usersModel } from '@/models'
import {
  CreateUserInput,
  GetUserArgs,
  GetUsersArgs,
  LogInInput,
} from '@/schemas'
import { User } from '@/schemas/entities'
import { ContextType, UserIDJwtPayload } from '@/types'

@Resolver()
export class UsersResolver {
  @Query(() => [User])
  async users(
    // Allow to pass optional parameter to find user by email.
    @Args(() => GetUsersArgs) { email }: GetUsersArgs,
  ): Promise<User[]> {
    const users = await usersModel.findAll(email)
    return users
  }

  // Set nullable to true to allow returning null if no user is found, and avoid throwing an error.
  @Query(() => User, { nullable: true })
  async user(
    @Args(() => GetUserArgs) { id }: GetUserArgs,
  ): Promise<User | null> {
    const user = await usersModel.findOneById(id)
    return user
  }

  /*
    Query the client (frontend) can use to know whether the user is authenticated or not.
   
    ⚠️ This request should not fail (to avoid dealing with both response data and errors in the frontend)!
    It should either return the current User (if authenticated) or either null.
  */
  @Query(() => User, { nullable: true })
  async whoAmI(@Ctx() context: ContextType): Promise<User | null> {
    const user = await getUserFromContext(context)
    return user
  }

  @Mutation(() => User)
  async createUser(
    @Arg('data', () => CreateUserInput) data: CreateUserInput,
  ): Promise<User> {
    try {
      const match = await usersModel.findOneByEmail(data.email)
      if (match !== null) {
        throw new Error('Account already exists.')
      }
      const hashedPassword = await hash(data.password, HASHING_OPTIONS)
      const newUserContent = Object.assign(data, {
        hashedPassword,
        password: null, // remove clear password
      })
      const createdUser = await usersModel.create(newUserContent)
      return createdUser
    } catch (error) {
      console.error(chalk.red(error))
      if (error instanceof Error) {
        throw Error(error.message)
      }
      throw new Error('Server error: failed to create user.')
    }
  }

  @Mutation(() => User, { nullable: true })
  async logInUser(
    @Arg('data', () => LogInInput) data: LogInInput,
    @Ctx() context: ContextType,
  ): Promise<User | null> {
    try {
      // Authenticate user (verify its identity through credentials).
      const user = await usersModel.findOneByEmail(data.email)
      if (!user) {
        return null
      }
      const passwordMatch = await verify(user.hashedPassword, data.password)
      if (!passwordMatch) {
        return null
      }
      // Authorize user (generate JWT to be stored in the client's browser's cookies, will be sent in all further requests to serve as a proof of the user'identity).
      const payload: UserIDJwtPayload = { id: user.id }
      const token = jwt.sign(payload, JWT_SECRET_KEY, JWT_OPTIONS)
      const cookies = new Cookies(context.req, context.res)
      cookies.set('token', token, COOKIES_OPTIONS)
      return user
    } catch (error) {
      console.error(chalk.red(error))
      let errorMessage = 'Failed to sign in!'
      if (error instanceof Error) {
        errorMessage += `: ${error.message}`
      }
      throw new Error(errorMessage)
    }
  }

  @Mutation(() => Boolean)
  logOutUser(@Ctx() context: ContextType): boolean {
    try {
      const cookies = new Cookies(context.req, context.res)
      // Remove JWT from the client's browser's cookies (cookie expires instantly (after 0 milliseconds), expired cookies are automatically deleted by the client browser).
      cookies.set('token', '', { maxAge: 0 })
      return true
    } catch (error: unknown) {
      console.error(chalk.red(error))
      return false
    }
  }
}
