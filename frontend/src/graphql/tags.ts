import { DocumentNode, gql } from "@apollo/client";

export const GET_TAGS: DocumentNode = gql`
  query tags {
    tags {
      id
      name
    }
  }
`;
