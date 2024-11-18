import { gql } from "@apollo/client";

export const GET_AD = gql`
  query ad($id: ID!) {
    ad(id: $id) {
      id
      title
      picture
      price
      description
      location
      owner
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;
