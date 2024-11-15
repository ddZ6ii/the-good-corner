import { gql } from "@apollo/client";

export const CORE_AD_FIELDS = gql`
  fragment CoreAdFields on Ad {
    id
  }
`;
