import { gql } from "@/gql";

export const WHO_AM_I = gql(/* GraphQL */ `
  query WhoAmI {
    whoAmI {
      id
      email
    }
  }
`);
