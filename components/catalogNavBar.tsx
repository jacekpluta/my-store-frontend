import React, { useState } from "react";
import { CatalogNavBarStyles } from "./styles/CatalogNavBarStyles";
import Checkbox from "./checkbox";
import {
  ButtonCatalogNavFilter,
  ButtonCatalogNavClear,
} from "./styles/ButtonStyles";
import { filters, clearFilters } from "../lib/vars";

enum FilterList {
  Nike = "Nike",
  Puma = "Puma",
  Rebook = "Rebook",
  Asics = "Asics",
  low = "$0 - $25",
  mid = "$25 - $50",
  high = "$50 - $75",
  vhigh = "$75 - $100",
  shigh = "$100+",
  Men = "Men",
  Women = "Women",
  Shoes = "Shoes",
  Boots = "Boots",
  Trainers = "Trainers",
  Sandals = "Sandals",
}

function CatalogNavBar() {
  const [filterList, setFilterList] = useState<Array<string> | null>([]);

  const startFiltering = () => {
    filters(filterList);
  };

  function changeFilter(filterItem: FilterList) {
    if (filterList.includes(filterItem)) {
      const listWithoutItem = filterList.filter((item) => filterItem !== item);
      setFilterList(listWithoutItem);
    } else {
      setFilterList((filterList) => [...filterList, filterItem]);
    }
  }

  function clearFiltering() {
    filters([]);
    setFilterList([]);
    clearFilters(true);
  }

  return (
    <CatalogNavBarStyles>
      <h2>Shop By Brand</h2>
      <Checkbox changeFilter={changeFilter}>Nike</Checkbox>
      <Checkbox changeFilter={changeFilter}>Puma</Checkbox>
      <Checkbox changeFilter={changeFilter}>Rebook</Checkbox>
      <Checkbox changeFilter={changeFilter}>Asics</Checkbox>

      <h2>Shop By Price</h2>
      <Checkbox changeFilter={changeFilter}>$0 - $25</Checkbox>
      <Checkbox changeFilter={changeFilter}>$25 - $50</Checkbox>
      <Checkbox changeFilter={changeFilter}>$50 - $75</Checkbox>
      <Checkbox changeFilter={changeFilter}>$75 - $100</Checkbox>
      <Checkbox changeFilter={changeFilter}>$100+</Checkbox>

      <h2>Gender</h2>
      <Checkbox changeFilter={changeFilter}>Men</Checkbox>
      <Checkbox changeFilter={changeFilter}>Women</Checkbox>

      <h2>Categories</h2>
      <Checkbox changeFilter={changeFilter}>Shoes</Checkbox>
      <Checkbox changeFilter={changeFilter}>Boots</Checkbox>
      <Checkbox changeFilter={changeFilter}>Trainers</Checkbox>
      <Checkbox changeFilter={changeFilter}>Sandals</Checkbox>

      <div style={{ position: "relative", left: "20px" }}>
        <ButtonCatalogNavFilter onClick={startFiltering}>
          FILTER
        </ButtonCatalogNavFilter>
        <ButtonCatalogNavClear onClick={clearFiltering}>
          CLEAR
        </ButtonCatalogNavClear>
      </div>
    </CatalogNavBarStyles>
  );
}

export default CatalogNavBar;
