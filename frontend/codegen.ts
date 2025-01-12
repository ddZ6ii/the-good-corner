import type { CodegenConfig } from "@graphql-codegen/cli";

// The `API_URL` environment variable is provided by docker-compose `environment` attribute.
const config: CodegenConfig = {
  schema: process.env.API_URL ?? "http://localhost:3000",
  documents: ["src/graphql/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        // Rename the codegen automatically generated `graphql` function to `gql`.
        gqlTagName: "gql",
      },
    },
  },
};
export default config;
