import { graphql } from "@/gql";

export const CREATE_TAG = graphql(/* GraphQL */ `
  mutation createTag($data: AddTagInput!) {
    createTag(data: $data) {
      id
      name
    }
  }
`);
