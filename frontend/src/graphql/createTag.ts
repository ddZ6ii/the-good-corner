import { gql } from "@apollo/client";

export const CREATE_TAG = gql`
  mutation createTag($data: AddTagInput!) {
    createTag(data: $data) {
      id
      name
    }
  }
`;
