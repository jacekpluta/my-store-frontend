import React from "react";
import { Query } from "react-apollo";
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

import { ALL_ITEMS_QUERY } from "../lib/queries";

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
  filters: any[]; //array of string and objects(with numbers)
}

export interface ItemsState {
  filterOptions: {
    skip: number;
    first: number;
    orderBy: string;
    gender_in?: string[] | undefined;
    category_in?: string[] | undefined;
    brand_in?: string[] | undefined;
    price_gte?: number | undefined;
    price_lte?: number | undefined;
  };
}

enum Order {
  createdAtDESC = "createdAt_DESC",
  titleDESC = "title_DESC",
  titleASC = "title_ASC",
  priceASC = "price_ASC",
  priceDESC = "price_DESC",
}

class Items extends React.Component<ItemsProps, ItemsState> {
  constructor(props: ItemsProps) {
    super(props);
    this.state = {
      filterOptions: {
        skip: props.page * perPage - perPage,
        first: perPage,
        orderBy: Order.createdAtDESC,
      },
    };
  }

  handleOnSort = (order: Order) => {
    this.setState((currentState) => {
      const filterOptions = { ...currentState.filterOptions, orderBy: order };
      return { filterOptions };
    });
  };

  componentDidMount() {
    this.setState((currentState) => {
      const filterOptions = { ...currentState.filterOptions };
      return { filterOptions };
    });
  }

  componentDidUpdate(nextProps: ItemsProps) {
    const filters = this.props.filters;

    if (this.props !== nextProps) {
      if (filters.includes("MEN") || filters.includes("WOMEN")) {
        this.setState((currentState) => {
          const filterOptions = {
            ...currentState.filterOptions,
            gender_in: filters.filter((filter) => {
              if (filter === "MEN") {
                return filter;
              }
              if (filter === "WOMEN") {
                return filter;
              }
            }),
          };
          return { filterOptions };
        });
      } else {
        this.setState((currentState) => {
          const filterOptions = {
            ...currentState.filterOptions,
            gender_in: undefined,
          };
          return { filterOptions };
        });
      }

      if (
        filters.includes("SHOES") ||
        filters.includes("BOOTS") ||
        filters.includes("TRAINERS") ||
        filters.includes("SANDALS")
      ) {
        this.setState((currentState) => {
          const filterOptions = {
            ...currentState.filterOptions,
            category_in: filters.filter((filter) => {
              if (filter === "SHOES") {
                return filter;
              }
              if (filter === "BOOTS") {
                return filter;
              }
              if (filter === "TRAINERS") {
                return filter;
              }
              if (filter === "SANDALS") {
                return filter;
              }
            }),
          };
          return { filterOptions };
        });
      } else {
        this.setState((currentState) => {
          const filterOptions = {
            ...currentState.filterOptions,
            category_in: undefined,
          };
          return { filterOptions };
        });
      }

      if (
        filters.includes("NIKE") ||
        filters.includes("ASICS") ||
        filters.includes("PUMA") ||
        filters.includes("REBOOK")
      ) {
        this.setState((currentState) => {
          const filterOptions = {
            ...currentState.filterOptions,
            brand_in: filters.filter((filter) => {
              if (filter === "NIKE") {
                return filter;
              }
              if (filter === "ASICS") {
                return filter;
              }
              if (filter === "PUMA") {
                return filter;
              }
              if (filter === "REBOOK") {
                return filter;
              }
            }),
          };
          return { filterOptions };
        });
      } else {
        this.setState((currentState) => {
          const filterOptions = {
            ...currentState.filterOptions,
            brand_in: undefined,
          };
          return { filterOptions };
        });
      }
      console.log(filters);
      if (filters.find((obj) => obj.gte >= 0)) {
        const priceArray = filters.filter((obj) => obj.gte >= 0);

        const priceLow = priceArray.reduce(
          (min, p) => (p.gte < min ? p.gte : min),
          priceArray[0].gte
        );
        const pricHigh = priceArray.reduce(
          (max, p) => (p.lte > max ? p.lte : max),
          priceArray[0].lte
        );

        this.setState((currentState) => {
          const filterOptions = {
            ...currentState.filterOptions,
            price_gte: priceLow,
            price_lte: pricHigh,
          };
          return { filterOptions };
        });
      } else {
        this.setState((currentState) => {
          const filterOptions = {
            ...currentState.filterOptions,
            price_lte: undefined,
            price_gte: undefined,
          };
          return { filterOptions };
        });
      }
    }
  }

  render() {
    const { page, filters } = this.props;
    console.log(this.state.filterOptions);
    return (
      <CatalogStyles>
        <Bar>Catalog</Bar>
        <SearchSortStyles>
          <Search />
          <Sort handleOnSort={this.handleOnSort} />
        </SearchSortStyles>
        <CatalogGrid>
          <CatalogNavBar />

          <Query
            query={ALL_ITEMS_QUERY}
            fetchPolicy="network-only"
            variables={
              filters.length === 0
                ? {
                    skip: page * perPage - perPage,
                    first: perPage,
                    orderBy: this.state.filterOptions.orderBy,
                  }
                : this.state.filterOptions
            }
          >
            {({ data, error, loading }: any) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error: {error.message}</p>;
              return (
                <ItemsList>
                  {data.items.map((item: IItem, id: number, width: number) => (
                    <MenuItem width={null} key={id} id={id} item={item} />
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
