import { graphql } from "@/gql";

export const GET_CATEGORIES = graphql(/* GraphQL */ `
  query categories {
    categories {
      id
      name
    }
  }
`);
