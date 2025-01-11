import { graphql } from "@/gql";

export const GET_AD = graphql(/* GraphQL */ `
  query ad($id: ID!) {
    ad(id: $id) {
      id
      title
      picture
      price
      description
      location
      owner
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`);
