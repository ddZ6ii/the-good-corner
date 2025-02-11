import { User } from '@/gql/graphql'
import { Nullish } from '@/types'

/*
  User authentication status
 
  user is `undefined` => uncertain state: user authentication status is not known yet(waiting for the server response)

  user is `null` => user is not authenticated (server responded with null)
 
  user is `User` => user is authenticated (server responded with user data)
 */
export type AuthUser = Nullish<User>

export enum AuthStatus {
  ADMIN = 'admin',
  UNAUTHENTICATED = 'unauthenticated',
  USER = 'user',
}
