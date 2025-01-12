import { gql } from "@/gql";

export const CREATE_AD = gql(/* GraphQL */ `
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
