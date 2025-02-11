import { gql } from '@/gql'

export const GET_CATEGORY = gql(/* GraphQL */ `
  query category($id: ID!) {
    category(id: $id) {
      id
      name
      ads {
        id
        title
        picture
        price
        createdAt
      }
      createdAt
      createdBy {
        id
        email
      }
    }
  }
`)
