import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
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
`;
