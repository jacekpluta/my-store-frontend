import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./item";
import Pagination from "./pagination";
import { CatalogNavBarStyles } from "./styles/CatalogNavBarStyles";
import Checkbox from "./Checkbox";
import { ButtonCatalogFilter } from "./styles/ButtonStyles";

function CatalogNavBar() {
  return (
    <CatalogNavBarStyles>
      <h2>Shop By Brand</h2>
      <Checkbox>Nike</Checkbox>
      <Checkbox>Puma</Checkbox>
      <Checkbox>Rebook</Checkbox>
      <Checkbox>dsad</Checkbox>

      <h2>Shop By Price</h2>
      <Checkbox>$0 - $25</Checkbox>
      <Checkbox>$25 - $50</Checkbox>
      <Checkbox>$50 - $75</Checkbox>
      <Checkbox>$75 - $100</Checkbox>

      <ButtonCatalogFilter>START SHOPPING</ButtonCatalogFilter>
    </CatalogNavBarStyles>
  );
}

export default CatalogNavBar;
