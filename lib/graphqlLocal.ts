import gql from "graphql-tag";
import { ApolloCache } from "apollo-cache";
import { Resolvers } from "apollo-client";
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from "../components/cart";

export const typeDefs = gql`
  extend type Query {
    cartOpen: Boolean!
  }
`;

type ResolverFn = (
  parent: any,
  args: any,
  { cache }: { cache: ApolloCache<any> }
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface AppResolvers extends Resolvers {
  // We will update this with our app's resolvers later
}

export const resolvers = {
  Mutation: {
    toggleCart: (_: any, { cache }: { cache: any }): any[] => {
      const { cartOpen } = cache.readFragment({ query: LOCAL_STATE_QUERY });
      const data: any = {
        data: { cartOpen: !cartOpen },
      };
      cache.writeData(data);
      return data;
    },
  },
};
