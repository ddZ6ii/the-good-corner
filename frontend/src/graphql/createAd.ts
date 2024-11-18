import { gql } from "@apollo/client";

export const CREATE_AD = gql`
  mutation createAd($data: AddAdInput!) {
    createAd(data: $data) {
      id
      title
      picture
      price
      createdAt
    }
  }
`;
