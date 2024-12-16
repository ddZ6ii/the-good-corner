import { gql } from "@apollo/client";

export const GET_TAGS_BY_NAME = gql`
  query tags($name: String!) {
    tags {
      id
      name
    }
  }
`;
