import React from "react";
import _ from "lodash";
import { Query } from "react-apollo";
import Pagination from "../pagination";
import { perPage } from "../../config";
import { CatalogStyles } from "../styles/CatalogStyles";
import { Bar } from "../styles/Bar";
import { ItemsList } from "../styles/ItemsList";
import CatalogNavBar from "./catalogNavBar";
import { CatalogGrid } from "../styles/CatalogGrid";
import Search from "../search";
import { SearchSortStyles } from "../styles/SearchSortStyles";
import Sort from "./sort";
import MenuItem from "../homePage/menuItem";
import { ADD_TO_CART_ITEM_QUERY, ALL_ITEMS_QUERY } from "../../lib/queries";
import PickSize from "../singleItem/pickSize";
import { ItemsProps, ItemsState, Order, IItem } from "../../lib/interfaces";

class Items extends React.Component<ItemsProps, ItemsState> {
  constructor(props: ItemsProps) {
    super(props);
    this.state = {
      filterOptions: {
        skip: props.page * perPage - perPage,
        first: perPage,
        orderBy: Order.createdAtDESC,
      },
      showPickSize: false,
    };
  }

  handleShowPickSize = (show: Boolean) => {
    this.setState((currentState) => {
      return { ...currentState, showPickSize: show };
    });
  };

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
          // const filterOptions = {
          //   ...currentState.filterOptions,
          //   gender_in: undefined,
          // };

          const { gender_in, ...filterOptions } = currentState.filterOptions;

          return currentState;
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
          // const filterOptions = {
          //   ...currentState.filterOptions,
          //   category_in: undefined,
          // };
          return _.omit(currentState, "category_in");
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
          return _.omit(currentState, "brand_in");
        });
      }

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
          return _.omit(currentState, "a", "c");
        });
      }
    }
  }

  render() {
    const { page, filters } = this.props;

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
                    <MenuItem
                      width={null}
                      key={id}
                      id={id}
                      item={item}
                      handleShowPickSize={this.handleShowPickSize}
                    />
                  ))}
                </ItemsList>
              );
            }}
          </Query>
        </CatalogGrid>

        <Query query={ADD_TO_CART_ITEM_QUERY}>
          {({ data, error, loading }: any) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            const item = data.addToCartItem;

            return (
              <PickSize
                showPickSize={this.state.showPickSize}
                item={item}
                handleShowPickSize={this.handleShowPickSize}
              ></PickSize>
            );
          }}
        </Query>

        <Pagination page={this.props.page} />
      </CatalogStyles>
    );
  }
}

export default Items;
