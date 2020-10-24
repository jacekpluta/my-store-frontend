import { makeVar } from "@apollo/client";

export const isCartOpen = makeVar(false);
export const filters = makeVar([]);
export const clearFilters = makeVar(false);
export const addToCartItem = makeVar(null);
