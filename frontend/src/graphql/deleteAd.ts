import { gql } from "@/gql";

export const DELETE_AD = gql(/* GraphQL */ `
  mutation deleteAd($id: ID!) {
    deleteAd(id: $id) {
      id
    }
  }
`);
