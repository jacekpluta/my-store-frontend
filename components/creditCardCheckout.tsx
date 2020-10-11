import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation } from "@apollo/react-hooks";
import Error from "./errorMessage";
import Router from "next/router";
import nProgress from "nprogress";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from "../lib/queries";
import { ALL_ORDERS_QUERY } from "./orders";
import { ICartItem } from "./cartItem";

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;
interface CreditCardCheckoutProps {
  allItemsCount: number;
  totalPrice: number;
  cart: [
    {
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
  ];
  user: {
    id: string;
    name: string;
    email: string;
    permissions: string[];
  };
  children: any;
}

export default function CreditCardCheckout(props: CreditCardCheckoutProps) {
  const { allItemsCount, cart, user, totalPrice } = props;

  const [createOrder, createOrderMutation] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [
        { query: CURRENT_USER_QUERY },
        { query: ALL_ORDERS_QUERY },
      ],
      awaitRefetchQueries: true,
    }
  );

  if (createOrderMutation.loading) {
    return null;
  }

  if (createOrderMutation.error) {
    return <Error error={createOrderMutation.error}></Error>;
  }

  const onToken = async (tokenId: string) => {
    nProgress.start();
    const order: any = await createOrder({
      variables: {
        token: tokenId,
      },
    }).catch((err) => console.log(err.message));

    Router.push({
      pathname: "/order",
      query: {
        id: order.data.createOrder.id,
      },
    });
    nProgress.done();
  };

  return (
    <div>
      <StripeCheckout
        amount={totalPrice}
        description={`Order of ${allItemsCount} item${
          allItemsCount === 1 ? `` : `s`
        }`}
        image={cart.length && cart[0].item && cart[0].item.image}
        stripeKey="pk_test_51H4tg1Ek6zFjJB8KlDCDwT748VcVdO2iKnR9uoaUNPbDCXhN7CK8OSh421lRbXd3m3AA4uNpCVoRbTl2wBPrWAhw00nVL6cIz3"
        currency="PLN"
        email={user.email}
        token={(res) => onToken(res.id)}
      >
        {props.children}
      </StripeCheckout>
    </div>
  );
}
