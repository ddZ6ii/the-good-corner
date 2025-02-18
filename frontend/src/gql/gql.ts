/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  '\n  query ad($id: ID!) {\n    ad(id: $id) {\n      id\n      title\n      picture\n      price\n      description\n      location\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n':
    types.AdDocument,
  '\n  query ads {\n    ads {\n      id\n      title\n      picture\n      price\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n':
    types.AdsDocument,
  '\n  query categories {\n    categories {\n      id\n      name\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n':
    types.CategoriesDocument,
  '\n  query category($id: ID!) {\n    category(id: $id) {\n      id\n      name\n      ads {\n        id\n        title\n        picture\n        price\n        createdAt\n      }\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n':
    types.CategoryDocument,
  '\n  mutation createAd($data: AddAdInput!) {\n    createAd(data: $data) {\n      id\n      title\n      picture\n      price\n      createdAt\n    }\n  }\n':
    types.CreateAdDocument,
  '\n  mutation createCategory($data: AddCategoryInput!) {\n    createCategory(data: $data) {\n      id\n      name\n      createdAt\n    }\n  }\n':
    types.CreateCategoryDocument,
  '\n  mutation createTag($data: AddTagInput!) {\n    createTag(data: $data) {\n      id\n      name\n      createdAt\n    }\n  }\n':
    types.CreateTagDocument,
  '\n  mutation deleteAd($id: ID!) {\n    deleteAd(id: $id) {\n      id\n    }\n  }\n':
    types.DeleteAdDocument,
  '\n  mutation LogInUser($data: LogInInput!) {\n    logInUser(data: $data) {\n      id\n    }\n  }\n':
    types.LogInUserDocument,
  '\n  mutation LogOutUser {\n    logOutUser\n  }\n': types.LogOutUserDocument,
  '\n  mutation createUser($data: CreateUserInput!) {\n    createUser(data: $data) {\n      id\n    }\n  }\n':
    types.CreateUserDocument,
  '\n  query tags {\n    tags {\n      id\n      name\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n':
    types.TagsDocument,
  '\n  mutation updateAd($data: UpdateAdInput!, $id: ID!) {\n    updateAd(data: $data, id: $id) {\n      id\n    }\n  }\n':
    types.UpdateAdDocument,
  '\n  query WhoAmI {\n    whoAmI {\n      id\n      email\n      role\n    }\n  }\n':
    types.WhoAmIDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ad($id: ID!) {\n    ad(id: $id) {\n      id\n      title\n      picture\n      price\n      description\n      location\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n',
): (typeof documents)['\n  query ad($id: ID!) {\n    ad(id: $id) {\n      id\n      title\n      picture\n      price\n      description\n      location\n      category {\n        id\n        name\n      }\n      tags {\n        id\n        name\n      }\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query ads {\n    ads {\n      id\n      title\n      picture\n      price\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n',
): (typeof documents)['\n  query ads {\n    ads {\n      id\n      title\n      picture\n      price\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query categories {\n    categories {\n      id\n      name\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n',
): (typeof documents)['\n  query categories {\n    categories {\n      id\n      name\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query category($id: ID!) {\n    category(id: $id) {\n      id\n      name\n      ads {\n        id\n        title\n        picture\n        price\n        createdAt\n      }\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n',
): (typeof documents)['\n  query category($id: ID!) {\n    category(id: $id) {\n      id\n      name\n      ads {\n        id\n        title\n        picture\n        price\n        createdAt\n      }\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createAd($data: AddAdInput!) {\n    createAd(data: $data) {\n      id\n      title\n      picture\n      price\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  mutation createAd($data: AddAdInput!) {\n    createAd(data: $data) {\n      id\n      title\n      picture\n      price\n      createdAt\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createCategory($data: AddCategoryInput!) {\n    createCategory(data: $data) {\n      id\n      name\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  mutation createCategory($data: AddCategoryInput!) {\n    createCategory(data: $data) {\n      id\n      name\n      createdAt\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createTag($data: AddTagInput!) {\n    createTag(data: $data) {\n      id\n      name\n      createdAt\n    }\n  }\n',
): (typeof documents)['\n  mutation createTag($data: AddTagInput!) {\n    createTag(data: $data) {\n      id\n      name\n      createdAt\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation deleteAd($id: ID!) {\n    deleteAd(id: $id) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation deleteAd($id: ID!) {\n    deleteAd(id: $id) {\n      id\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation LogInUser($data: LogInInput!) {\n    logInUser(data: $data) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation LogInUser($data: LogInInput!) {\n    logInUser(data: $data) {\n      id\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation LogOutUser {\n    logOutUser\n  }\n',
): (typeof documents)['\n  mutation LogOutUser {\n    logOutUser\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation createUser($data: CreateUserInput!) {\n    createUser(data: $data) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation createUser($data: CreateUserInput!) {\n    createUser(data: $data) {\n      id\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query tags {\n    tags {\n      id\n      name\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n',
): (typeof documents)['\n  query tags {\n    tags {\n      id\n      name\n      createdAt\n      createdBy {\n        id\n        email\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation updateAd($data: UpdateAdInput!, $id: ID!) {\n    updateAd(data: $data, id: $id) {\n      id\n    }\n  }\n',
): (typeof documents)['\n  mutation updateAd($data: UpdateAdInput!, $id: ID!) {\n    updateAd(data: $data, id: $id) {\n      id\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query WhoAmI {\n    whoAmI {\n      id\n      email\n      role\n    }\n  }\n',
): (typeof documents)['\n  query WhoAmI {\n    whoAmI {\n      id\n      email\n      role\n    }\n  }\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
