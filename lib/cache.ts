import { InMemoryCache } from "@apollo/client";
import {
  isCartOpen,
  filters,
  clearFilters,
  addToCartItem,
  isNavOpen,
  cartLocal,
} from "./vars";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartOpen: {
          read() {
            return isCartOpen();
          },
        },
        navOpen: {
          read() {
            return isNavOpen();
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
        cartLocal: {
          read() {
            return cartLocal();
          },
        },
      },
    },
  },
});
