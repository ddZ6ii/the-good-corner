import { graphql } from "@/gql";

export const GET_TAGS = graphql(/* GraphQL */ `
  query tags {
    tags {
      id
      name
    }
  }
`);
