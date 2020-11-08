import { useMutation, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

import { CartPageStyles } from "../styles/CartPageStyles";

export const GET_DELETED_ITEM_ID = gql`
  {
    id @client
  }
`;

interface propsCartPage {}

const CartPage = ({}: propsCartPage) => {
  return <CartPageStyles>PAGE IN DEVELOPMENT</CartPageStyles>;
};
export default CartPage;
