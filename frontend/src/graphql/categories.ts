import { gql } from '@/gql'

export const GET_CATEGORIES = gql(/* GraphQL */ `
  query categories {
    categories {
      id
      name
      createdAt
      createdBy {
        id
        email
      }
    }
  }
`)
