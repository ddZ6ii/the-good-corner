import { gql } from "@apollo/client";

export const DELETE_AD = gql`
  mutation deleteAd($id: ID!) {
    deleteAd(id: $id)
  }
`;
