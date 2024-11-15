import { DocumentNode, gql } from "@apollo/client";

export const GET_ADS: DocumentNode = gql`
  query ads {
    ads {
      id
      title
      picture
      price
      createdAt
    }
  }
`;
