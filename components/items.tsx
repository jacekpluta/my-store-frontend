import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./item";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
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

export interface ItemsProps {}

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
    return (
      <Center>
        <p>Items</p>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }: any) => {
            if (loading) return <p>Loading</p>;
            if (error) {
              console.log(error);
              return <p>Error: {error.mesage}</p>;
            }

            return (
              <ItemsList>
                {data.items.map((item: IItem) => {
                  return <Item key={item.id} item={item} />;
                })}
              </ItemsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Items;
