import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cla8cip8f0kvr01tf35gp8xzt/master",
  cache: new InMemoryCache(),
});
