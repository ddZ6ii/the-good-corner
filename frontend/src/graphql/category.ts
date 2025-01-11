import { graphql } from "@/gql";

export const GET_CATEGORY = graphql(/* GraphQL */ `
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
    }
  }
`);
