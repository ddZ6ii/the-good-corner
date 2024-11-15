import { DocumentNode, gql } from "@apollo/client";

export const GET_CATEGORIES: DocumentNode = gql`
  query categories {
    categories {
      id
      name
    }
  }
`;
