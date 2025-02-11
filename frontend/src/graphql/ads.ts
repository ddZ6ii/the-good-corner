import { gql } from '@/gql'

export const GET_ADS = gql(/* GraphQL */ `
  query ads {
    ads {
      id
      title
      picture
      price
      createdAt
      createdBy {
        id
        email
      }
    }
  }
`)
