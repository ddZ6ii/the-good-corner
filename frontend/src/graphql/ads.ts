import { gql } from "@apollo/client";

export const GET_ADS = gql`
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
