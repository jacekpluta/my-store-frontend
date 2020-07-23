import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useMutation } from "@apollo/react-hooks";
import Error from "./errorMessage";
import Router from "next/router";
import nProgress from "nprogress";
import gql from "graphql-tag";

import { CURRENT_USER_QUERY } from "./queries";
import { ALL_ORDERS_QUERY } from "./orders";

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

export default function CreditCardCheckout(props) {
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

  const { allItemsCount, cart, user } = props;

  const onToken = async (tokenId) => {
    nProgress.start();
    const order = await createOrder({
      variables: {
        token: tokenId,
      },
    }).catch((err) => alert(err.message));

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
        amount={props.totalPrice}
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
