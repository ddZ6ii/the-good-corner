import { DocumentNode, gql } from "@apollo/client";

export const GET_CATEGORY: DocumentNode = gql`
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
