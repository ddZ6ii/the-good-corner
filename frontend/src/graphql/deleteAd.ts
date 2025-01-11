import { graphql } from "@/gql";

export const DELETE_AD = graphql(/* GraphQL */ `
  mutation deleteAd($id: ID!) {
    deleteAd(id: $id)
  }
`);
