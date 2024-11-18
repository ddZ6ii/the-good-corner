import { gql } from "@apollo/client";

export const UPDATE_AD = gql`
  mutation updateAd($data: UpdateAdInput!, $id: ID!) {
    updateAd(data: $data, id: $id) {
      id
    }
  }
`;
