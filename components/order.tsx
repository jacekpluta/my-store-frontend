import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Head from "next/head";
import gql from "graphql-tag";
import Error from "./errorMessage";
import OrderStyles from "./styles/OrderStyles";
import formatMoney from "./formatMoney";

type OrderProps = { orderId: string };

export const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

export default function Order(props: OrderProps) {
  const { orderId } = props;

  const { loading, error, data } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { id: orderId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  const order = data.order;

  if (order) {
    return (
      <OrderStyles data-test="order">
        <Head>MyShop - Order {orderId}</Head>
        <p>
          <span>Order ID:{orderId} </span>
        </p>
        <p>
          <span>Charge: {order.charge}</span>
        </p>

        <p>
          <span>Item count: {order.items.length}</span>
        </p>
        <p>
          <span>Order total: {formatMoney(order.total)}</span>
        </p>
        <div className="items">
          {order.items.map((item: any) => (
            <div className="order-item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div className="item-details">
                <h2>{item.title}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Each: {formatMoney(item.price)}</p>
                <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                <p>Description: {item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </OrderStyles>
    );
  } else return <p>Please sign in!</p>;
}
