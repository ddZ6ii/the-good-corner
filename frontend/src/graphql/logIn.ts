import { gql } from "@/gql";

export const LOG_IN = gql(/* GraphQL */ `
  mutation LogInUser($data: LogInInput!) {
    logInUser(data: $data) {
      id
    }
  }
`);
