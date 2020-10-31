import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Head from "next/head";
import gql from "graphql-tag";
import Error from "../errorMessage";
import OrderItemStyles from "../styles/OrderItemStyles";
import formatMoney from "../utils/formatMoney";
import styled from "styled-components";
import Link from "next/link";

export const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY($skip: Int = 0, $first: Int = 10) {
    orders(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      total
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

const OrdersUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-rows: repeat(auto-fit, minmax(40%, 1fr));
`;

export default function Orders() {
  const allOrdersQuery = useQuery(ALL_ORDERS_QUERY);

  if (allOrdersQuery.loading) return <p>Loading...</p>;
  if (allOrdersQuery.error) return <Error error={allOrdersQuery.error} />;

  const orders = allOrdersQuery.data.orders;

  return (
    <>
      <Head>MyShop - Orders</Head>

      <h2>Orders - {orders.length} </h2>

      <OrdersUl>
        {orders.map((order: any) => (
          <Link
            href={{
              pathname: "/",
            }}
            key={order.id}
          >
            <OrderItemStyles>
              <div className="order-meta">
                <p>
                  {order.items.reduce(
                    (all: any, item: any) => all + item.quantity,
                    0
                  )}{" "}
                  items
                </p>
                <p>{order.items.length} products</p>
                {/* <p> {formatDistance(order.createdAt, new Date())} </p> */}
                <p>
                  <span>Order total: {formatMoney(order.total)}</span>
                </p>
              </div>
              <div className="images">
                {order.items.map((item: any) => (
                  <img key={item.id} src={item.image} alt={item.title} />
                  // <div className="item-details">
                  //   <h2>{item.title}</h2>
                  //   <p>Quantity: {item.quantity}</p>
                  //   <p>Each: {formatMoney(item.price)}</p>
                  //   <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                  //   <p>Description: {item.description}</p>
                  // </div>
                ))}
              </div>
            </OrderItemStyles>
          </Link>
        ))}
      </OrdersUl>
    </>
  );
}
