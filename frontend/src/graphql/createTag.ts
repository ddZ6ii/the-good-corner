import { gql } from '@/gql'

export const CREATE_TAG = gql(/* GraphQL */ `
  mutation createTag($data: AddTagInput!) {
    createTag(data: $data) {
      id
      name
      createdAt
    }
  }
`)
