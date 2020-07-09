import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./item";
import Pagination from "./pagination";
import { perPage } from "../config";

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

export interface IItem {
  description: string;
  id: string;
  image: string;
  largeImage: string;
  price: number;
  title: string;
}

export interface ItemsProps {
  page: number;
}

export interface ItemsState {}

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${(props) => props.theme.max};
`;

class Items extends React.Component<ItemsProps, ItemsState> {
  constructor(props: ItemsProps) {
    super(props);
  }

  render() {
    const { page } = this.props;
    return (
      <Center>
        <Pagination page={page} />

        <Query
          query={ALL_ITEMS_QUERY}
          fetchPolicy="network-only"
          variables={{
            skip: page * perPage - perPage,
            first: perPage,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ItemsList>
                {data.items.map((item) => (
                  <Item item={item} key={item.id} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export default Items;
