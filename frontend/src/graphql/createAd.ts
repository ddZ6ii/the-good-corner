import { graphql } from "@/gql";

export const CREATE_AD = graphql(/* GraphQL */ `
  mutation createAd($data: AddAdInput!) {
    createAd(data: $data) {
      id
      title
      picture
      price
      createdAt
    }
  }
`);
