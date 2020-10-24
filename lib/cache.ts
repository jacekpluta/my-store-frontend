import { InMemoryCache } from "@apollo/client";
import { isCartOpen, filters, clearFilters, addToCartItem } from "./vars";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartOpen: {
          read() {
            return isCartOpen();
          },
        },
        filters: {
          read() {
            return filters();
          },
        },
        clearFilters: {
          read() {
            return clearFilters();
          },
        },
        addToCartItem: {
          read() {
            return addToCartItem();
          },
        },
      },
    },
  },
});
