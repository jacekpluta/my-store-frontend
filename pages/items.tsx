import { useQuery } from "@apollo/react-hooks";
import React, { useEffect } from "react";
import Items from "../components/items";
import { FILTERS_QUERY } from "../lib/queries";

interface ItemsProps {
  query: {
    page: string;
  };
}
//props.query
function items(props: ItemsProps) {
  const filtersData = useQuery(FILTERS_QUERY, { fetchPolicy: "network-only" });

  if (filtersData.loading) return <p>Loading...</p>;
  if (filtersData.error) return <p>ERROR: {filtersData.error.message}</p>;

  const filtersUppercased = filtersData.data.filters.map((filter: String) =>
    filter.toUpperCase()
  );

  const filters = filtersUppercased.map((filter: String) => {
    if (filter.includes("$0 - $25")) return { gte: 0, lte: 25 };
    if (filter.includes("$25 - $50")) return { gte: 25, lte: 50 };
    if (filter.includes("$50 - $75")) return { gte: 50, lte: 75 };
    if (filter.includes("$75 - $100")) return { gte: 75, lte: 100 };
    if (filter.includes("$100+")) return { gte: 100, lte: 999 };
    return filter;
  });

  return (
    <Items filters={filters} page={parseFloat(props.query.page) || 1}></Items>
  );
}

export default items;
