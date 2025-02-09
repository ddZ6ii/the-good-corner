import { gql } from "@/gql";

export const CREATE_CATEGORY = gql(/* GraphQL */ `
  mutation createCategory($data: AddCategoryInput!) {
    createCategory(data: $data) {
      id
      name
      createdAt
    }
  }
`);
