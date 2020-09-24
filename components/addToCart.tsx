import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./queries";

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;
type itemId = {
  itemId: string;
};

export default function addToCart(props: itemId) {
  const [addToCart, addToCartMutation] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    awaitRefetchQueries: true,
  });

  const { itemId } = props;

  return (
    <button
      disabled={addToCartMutation.loading}
      onClick={async () => {
        await addToCart({
          variables: {
            id: itemId,
          },
        });
      }}
    >
      Add{addToCartMutation.loading ? "ing" : ""} to cart
    </button>
  );
}
