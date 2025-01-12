import { gql } from "@/gql";

export const GET_TAGS = gql(/* GraphQL */ `
  query tags {
    tags {
      id
      name
    }
  }
`);
