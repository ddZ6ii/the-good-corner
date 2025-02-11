import { gql } from '@/gql'

export const GET_AD = gql(/* GraphQL */ `
  query ad($id: ID!) {
    ad(id: $id) {
      id
      title
      picture
      price
      description
      location
      category {
        id
        name
      }
      tags {
        id
        name
      }
      createdAt
      createdBy {
        id
        email
      }
    }
  }
`)
