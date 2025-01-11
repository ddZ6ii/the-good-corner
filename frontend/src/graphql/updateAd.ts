import { graphql } from "@/gql";

export const UPDATE_AD = graphql(/* GraphQL */ `
  mutation updateAd($data: UpdateAdInput!, $id: ID!) {
    updateAd(data: $data, id: $id) {
      id
    }
  }
`);
