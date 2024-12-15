import { gql } from "@apollo/client";

export const GET_CATEGORIES_BY_NAME = gql`
  query categories($name: String!) {
    categories {
      id
      name
    }
  }
`;
