import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Head from "next/head";
import gql from "graphql-tag";
import Error from "../errorMessage";
import OrderItemStyles from "../styles/OrderItemStyles";
import formatMoney from "../../lib/utils/formatMoney";
import Link from "next/link";
import { OrdersStyles } from "../styles/OrdersStyles";
import { emptyOrders } from "../../lib/images";
import { ButtonContinue } from "../styles/ButtonStyles";

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

export default function Orders() {
  const allOrdersQuery = useQuery(ALL_ORDERS_QUERY);

  if (allOrdersQuery.loading) return <p>Loading...</p>;
  if (allOrdersQuery.error) return <Error error={allOrdersQuery.error} />;

  const orders = allOrdersQuery.data.orders;

  return (
    <OrdersStyles>
      <Head>
        <title>MyShop - Orders</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {orders.length === 0 && (
        <div className="noOrders">
          <img src={emptyOrders} />
          <p style={{ fontWeight: 900, fontSize: 20 }}>
            There are no orders yet.
          </p>
          <Link
            href={{
              pathname: "/catalog",
            }}
          >
            <ButtonContinue>SHOP NOW</ButtonContinue>
          </Link>
        </div>
      )}

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
            <div>
              {order.items.map((item: any) => (
                <>
                  <img key={item.id} src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h2>{item.title}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Each: {formatMoney(item.price)}</p>
                    <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                    <p>Description: {item.description}</p>
                  </div>
                </>
              ))}
            </div>
          </OrderItemStyles>
        </Link>
      ))}
    </OrdersStyles>
  );
}
