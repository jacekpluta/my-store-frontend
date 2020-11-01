import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { ADD_TO_CART_MUTATION, CURRENT_USER_QUERY } from "../../lib/queries";
import { CartPageStyles } from "../styles/CartPageStyles";
import { DELETE_CART_ITEM_MUTATION } from "./cartItem";

export const GET_DELETED_ITEM_ID = gql`
  {
    id @client
  }
`;

export interface IItem {
  item: {
    id: number;
    price: number;
    user: null;
    image: string;
    title: string;
    description: string;
    largeImage: string;
  };
}

interface propsCartPage {}

const CartPage = ({}: propsCartPage) => {
  const [addToCart, addToCartMutation] = useMutation(ADD_TO_CART_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const [deleteCartItem, deleteCartItemMutation] = useMutation(
    DELETE_CART_ITEM_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const currentUserQuery = useQuery(CURRENT_USER_QUERY);

  return <CartPageStyles>PAGE IN DEVELOPMENT</CartPageStyles>;
};
export default CartPage;
