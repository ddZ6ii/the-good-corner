/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
};

export type Ad = {
  __typename?: "Ad";
  category: Category;
  createdAt: Scalars["DateTime"]["output"];
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  description: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  location: Scalars["String"]["output"];
  picture: Scalars["String"]["output"];
  price: Scalars["Int"]["output"];
  tags?: Maybe<Array<Tag>>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

/** New ad data */
export type AddAdInput = {
  category: IdInput;
  description: Scalars["String"]["input"];
  location: Scalars["String"]["input"];
  picture: Scalars["String"]["input"];
  price: Scalars["Int"]["input"];
  tags?: InputMaybe<Array<IdInput>>;
  title: Scalars["String"]["input"];
};

/** New category data */
export type AddCategoryInput = {
  name: Scalars["String"]["input"];
};

/** New tag data */
export type AddTagInput = {
  name: Scalars["String"]["input"];
};

export type Category = {
  __typename?: "Category";
  ads: Array<Ad>;
  createdAt: Scalars["DateTime"]["output"];
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

/** New user data */
export type CreateUserInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type IdInput = {
  id: Scalars["ID"]["input"];
};

/** User login credentials */
export type LogInInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  createAd: Ad;
  createCategory: Category;
  createTag: Tag;
  createUser: User;
  deleteAd?: Maybe<Ad>;
  deleteCategory?: Maybe<Category>;
  deleteTag?: Maybe<Tag>;
  logInUser?: Maybe<User>;
  logOutUser: Scalars["Boolean"]["output"];
  updateAd?: Maybe<Ad>;
  updateCategory?: Maybe<Category>;
  updateTag?: Maybe<Tag>;
};

export type MutationCreateAdArgs = {
  data: AddAdInput;
};

export type MutationCreateCategoryArgs = {
  data: AddCategoryInput;
};

export type MutationCreateTagArgs = {
  data: AddTagInput;
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationDeleteAdArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteTagArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationLogInUserArgs = {
  data: LogInInput;
};

export type MutationUpdateAdArgs = {
  data: UpdateAdInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateTagArgs = {
  data: UpdateTagInput;
  id: Scalars["ID"]["input"];
};

export type Query = {
  __typename?: "Query";
  ad?: Maybe<Ad>;
  ads: Array<Ad>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  user?: Maybe<User>;
  users: Array<User>;
  whoAmI?: Maybe<User>;
};

export type QueryAdArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryAdsArgs = {
  categoryName?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCategoriesArgs = {
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCategoryArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTagArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryTagsArgs = {
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryUserArgs = {
  id: Scalars["ID"]["input"];
};

export type QueryUsersArgs = {
  email?: InputMaybe<Scalars["String"]["input"]>;
};

export type Tag = {
  __typename?: "Tag";
  ads: Array<Ad>;
  createdAt: Scalars["DateTime"]["output"];
  createdBy?: Maybe<User>;
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

/** Update ad data */
export type UpdateAdInput = {
  category?: InputMaybe<IdInput>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  picture?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["Int"]["input"]>;
  tags?: InputMaybe<Array<IdInput>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

/** Update category data */
export type UpdateCategoryInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
};

/** Update tag data */
export type UpdateTagInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"]["output"];
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  email: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  role: UserRole;
  updatedAt: Scalars["DateTime"]["output"];
};

/** User possible roles */
export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
}

export type AdQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type AdQuery = {
  __typename?: "Query";
  ad?: {
    __typename?: "Ad";
    id: string;
    title: string;
    picture: string;
    price: number;
    description: string;
    location: string;
    createdAt: any;
    category: { __typename?: "Category"; id: string; name: string };
    tags?: Array<{ __typename?: "Tag"; id: string; name: string }> | null;
    createdBy?: { __typename?: "User"; id: string; email: string } | null;
  } | null;
};

export type AdsQueryVariables = Exact<{ [key: string]: never }>;

export type AdsQuery = {
  __typename?: "Query";
  ads: Array<{
    __typename?: "Ad";
    id: string;
    title: string;
    picture: string;
    price: number;
    createdAt: any;
    createdBy?: { __typename?: "User"; id: string; email: string } | null;
  }>;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
  __typename?: "Query";
  categories: Array<{
    __typename?: "Category";
    id: string;
    name: string;
    createdAt: any;
    createdBy?: { __typename?: "User"; id: string; email: string } | null;
  }>;
};

export type CategoryQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type CategoryQuery = {
  __typename?: "Query";
  category?: {
    __typename?: "Category";
    id: string;
    name: string;
    createdAt: any;
    ads: Array<{
      __typename?: "Ad";
      id: string;
      title: string;
      picture: string;
      price: number;
      createdAt: any;
    }>;
    createdBy?: { __typename?: "User"; id: string; email: string } | null;
  } | null;
};

export type CreateAdMutationVariables = Exact<{
  data: AddAdInput;
}>;

export type CreateAdMutation = {
  __typename?: "Mutation";
  createAd: {
    __typename?: "Ad";
    id: string;
    title: string;
    picture: string;
    price: number;
    createdAt: any;
  };
};

export type CreateCategoryMutationVariables = Exact<{
  data: AddCategoryInput;
}>;

export type CreateCategoryMutation = {
  __typename?: "Mutation";
  createCategory: {
    __typename?: "Category";
    id: string;
    name: string;
    createdAt: any;
  };
};

export type CreateTagMutationVariables = Exact<{
  data: AddTagInput;
}>;

export type CreateTagMutation = {
  __typename?: "Mutation";
  createTag: { __typename?: "Tag"; id: string; name: string; createdAt: any };
};

export type DeleteAdMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteAdMutation = {
  __typename?: "Mutation";
  deleteAd?: { __typename?: "Ad"; id: string } | null;
};

export type LogInUserMutationVariables = Exact<{
  data: LogInInput;
}>;

export type LogInUserMutation = {
  __typename?: "Mutation";
  logInUser?: { __typename?: "User"; id: string } | null;
};

export type LogOutUserMutationVariables = Exact<{ [key: string]: never }>;

export type LogOutUserMutation = {
  __typename?: "Mutation";
  logOutUser: boolean;
};

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: { __typename?: "User"; id: string };
};

export type TagsQueryVariables = Exact<{ [key: string]: never }>;

export type TagsQuery = {
  __typename?: "Query";
  tags: Array<{
    __typename?: "Tag";
    id: string;
    name: string;
    createdAt: any;
    createdBy?: { __typename?: "User"; id: string; email: string } | null;
  }>;
};

export type UpdateAdMutationVariables = Exact<{
  data: UpdateAdInput;
  id: Scalars["ID"]["input"];
}>;

export type UpdateAdMutation = {
  __typename?: "Mutation";
  updateAd?: { __typename?: "Ad"; id: string } | null;
};

export type WhoAmIQueryVariables = Exact<{ [key: string]: never }>;

export type WhoAmIQuery = {
  __typename?: "Query";
  whoAmI?: {
    __typename?: "User";
    id: string;
    email: string;
    role: UserRole;
  } | null;
};

export const AdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ad" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ad" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "picture" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "location" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tags" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createdBy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdQuery, AdQueryVariables>;
export const AdsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ads" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "ads" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "picture" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createdBy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdsQuery, AdsQueryVariables>;
export const CategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "categories" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "categories" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createdBy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "category" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "category" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ads" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "picture" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createdBy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CategoryQuery, CategoryQueryVariables>;
export const CreateAdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createAd" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AddAdInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAd" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "picture" } },
                { kind: "Field", name: { kind: "Name", value: "price" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateAdMutation, CreateAdMutationVariables>;
export const CreateCategoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createCategory" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AddCategoryInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createCategory" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>;
export const CreateTagDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createTag" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AddTagInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTag" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTagMutation, CreateTagMutationVariables>;
export const DeleteAdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteAd" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteAd" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteAdMutation, DeleteAdMutationVariables>;
export const LogInUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LogInUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "LogInInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "logInUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogInUserMutation, LogInUserMutationVariables>;
export const LogOutUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LogOutUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "logOutUser" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogOutUserMutation, LogOutUserMutationVariables>;
export const CreateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateUserInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const TagsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "tags" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "tags" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "createdBy" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TagsQuery, TagsQueryVariables>;
export const UpdateAdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateAd" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "data" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateAdInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateAd" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "data" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "data" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateAdMutation, UpdateAdMutationVariables>;
export const WhoAmIDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "WhoAmI" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "whoAmI" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<WhoAmIQuery, WhoAmIQueryVariables>;
