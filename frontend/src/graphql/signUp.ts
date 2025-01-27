import { gql } from "@/gql";

export const SIGN_UP = gql(/* GraphQL */ `
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`);
