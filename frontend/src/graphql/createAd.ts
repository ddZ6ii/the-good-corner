import { DocumentNode, gql } from "@apollo/client";

export const CREATE_AD: DocumentNode = gql`
  mutation createAd($data: AddAdInput!) {
    createAd(data: $data) {
      id
    }
  }
`;
