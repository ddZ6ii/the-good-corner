import { graphql } from "@/gql";

export const GET_ADS = graphql(/* GraphQL */ `
  query ads {
    ads {
      id
      title
      picture
      price
      createdAt
    }
  }
`);
