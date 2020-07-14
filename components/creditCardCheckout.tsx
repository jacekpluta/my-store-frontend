import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { formatMoney } from "./item";
import Router from "next/router";
import nProgress from "nprogress";
import gql from "graphql-tag";
import Error from "./errorMessage";
import { CURRENT_USER_QUERY } from "./queries";

const CREATE_ORDER_MUTATION = gql`
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
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
      awaitRefetchQueries: true,
    }
  );

  const { allItemsCount, totalPrice, cart, user } = props;

  const onToken = async (tokenId) => {
    const order = await createOrder({
      variables: {
        token: tokenId,
      },
    }).catch((err) => alert(err.message));
    console.log(order);
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
