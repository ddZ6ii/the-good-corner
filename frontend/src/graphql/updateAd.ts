import { gql } from '@/gql'

export const UPDATE_AD = gql(/* GraphQL */ `
  mutation updateAd($data: UpdateAdInput!, $id: ID!) {
    updateAd(data: $data, id: $id) {
      id
    }
  }
`)
