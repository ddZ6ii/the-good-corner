import { graphql } from "@/gql";

export const CREATE_CATEGORY = graphql(/* GraphQL */ `
  mutation createCategory($data: AddCategoryInput!) {
    createCategory(data: $data) {
      id
      name
    }
  }
`);
