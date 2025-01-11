import type { CodegenConfig } from "@graphql-codegen/cli";

// The `API_URL` environment variable is provided by docker-compose `environment` attribute.
const API_URL = process.env.API_URL ?? "http://localhost:3000";

const config: CodegenConfig = {
  schema: API_URL,
  documents: ["src/graphql/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};
export default config;
