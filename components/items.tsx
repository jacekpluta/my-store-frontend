import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Pagination from "./pagination";
import { perPage } from "../config";
import { CatalogStyles } from "./styles/CatalogStyles";
import { Bar } from "./styles/Bar";
import { ItemsList } from "./styles/ItemsList";
import CatalogNavBar from "./catalogNavBar";
import { CatalogGrid } from "./styles/CatalogGrid";
import Search from "./search";
import { SearchSortStyles } from "./styles/SearchSortStyles";
import Sort from "./sort";
import MenuItem from "./menuItem";

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

class Items extends React.Component<ItemsProps, ItemsState> {
  constructor(props: ItemsProps) {
    super(props);
  }

  render() {
    const { page } = this.props;
    return (
      <CatalogStyles>
        <Bar>Catalog</Bar>
        <SearchSortStyles>
          <Search />
          <Sort />
        </SearchSortStyles>
        <CatalogGrid>
          <CatalogNavBar />

          <Query
            query={ALL_ITEMS_QUERY}
            fetchPolicy="network-only"
            variables={{
              skip: page * perPage - perPage,
              first: perPage,
            }}
          >
            {({ data, error, loading }: any) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error.message}</p>;
              return (
                <ItemsList>
                  {data.items.map((item: IItem, id: number) => (
                    <MenuItem key={id} id={id} item={item} />
                  ))}
                </ItemsList>
              );
            }}
          </Query>
        </CatalogGrid>
        <Pagination page={this.props.page} />
      </CatalogStyles>
    );
  }
}

export default Items;
