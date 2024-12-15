import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation createCategory($data: AddCategoryInput!) {
    createCategory(data: $data) {
      id
      name
    }
  }
`;
