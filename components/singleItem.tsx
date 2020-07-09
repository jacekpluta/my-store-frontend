import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "./errorMessage";
import styled from "styled-components";
import Head from "next/head";

const SingleItemStyle = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export interface SingleItemProps {
  itemId: number;
}

export default function SingleItem(props: SingleItemProps) {
  const { itemId } = props;
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: itemId },
  });

  if (loading) return "Loading...";
  if (error) return <Error error={error} />;
  if (!data.item) return <p>No item found for item with id - {itemId}</p>;

  const item = data.item;

  return (
    <SingleItemStyle>
      <Head>
        <title>MyShop | {item.title}</title>
      </Head>
      <img src={item.largeImage} alt={item.title} />
      <div className="details">
        <h2>Viewing {item.title}</h2>
        <p>{item.description}</p>
      </div>
    </SingleItemStyle>
  );
}
