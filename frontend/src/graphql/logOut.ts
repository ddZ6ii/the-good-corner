import { gql } from '@/gql'

export const LOG_OUT = gql(/* GraphQL */ `
  mutation LogOutUser {
    logOutUser
  }
`)
