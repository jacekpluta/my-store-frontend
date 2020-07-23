import { IncomingMessage, ServerResponse } from "http";
import { useMemo } from "react";

import { endpoint, productionBackendEndpoint } from "../config";

// import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
// import { ApolloClient } from "@apollo/client";
import { typeDefs, resolvers } from "./graphqlLocal";

import { ApolloClient, InMemoryCache } from "@apollo/client";

let apolloClient: ApolloClient<any> | undefined;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

function createIsomorphLink(context: ResolverContext = {}) {
  if (typeof window === "undefined") {
    const { SchemaLink } = require("apollo-link-schema");
    const { schema } = require("./schema");
    return new SchemaLink({ schema, context });
  } else {
    const { HttpLink } = require("apollo-link-http");
    return new HttpLink({
      uri:
        process.env.NODE_ENV === "development"
          ? endpoint
          : productionBackendEndpoint,
      credentials: "include",
    });
  }
}
const cache = new InMemoryCache();

function createApolloClient(context?: ResolverContext): any {
  return new ApolloClient({
    uri:
      process.env.NODE_ENV === "development"
        ? endpoint
        : productionBackendEndpoint,
    credentials: "include",
    cache: cache,
    resolvers,
    typeDefs,
  });
}

// cache.writeData({
//   data: {
//     cartOpen: false,
//   },
// });

export function initializeApollo(
  initialState: any = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: ResolverContext
) {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
