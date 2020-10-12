import { InMemoryCache } from "@apollo/client";
import { isCartOpen } from "./vars";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartOpen: {
          read() {
            return isCartOpen();
          },
        },
      },
    },
  },
});
