import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema:
    "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla8cip8f0kvr01tf35gp8xzt/master",
  documents: "graphql/*.graphql",
  generates: {
    "genetated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;

// generates: {
//   "graphql/*.graphql": {
//     preset: "client",
//     plugins: []
//   },
