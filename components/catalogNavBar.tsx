import React from "react";
import { CatalogNavBarStyles } from "./styles/CatalogNavBarStyles";
import Checkbox from "./Checkbox";
import {
  ButtonCatalogNavFilter,
  ButtonCatalogNavClear,
} from "./styles/ButtonStyles";

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

      <h2>Gender</h2>
      <Checkbox>Men</Checkbox>
      <Checkbox>Women</Checkbox>

      <h2>Categories</h2>
      <Checkbox>Shoes</Checkbox>
      <Checkbox>Boots</Checkbox>
      <Checkbox>Trainers</Checkbox>
      <Checkbox>Sandals</Checkbox>
      <Checkbox>Flip Flops</Checkbox>

      <ButtonCatalogNavFilter>FILTER</ButtonCatalogNavFilter>
      <ButtonCatalogNavClear>CLEAR</ButtonCatalogNavClear>
    </CatalogNavBarStyles>
  );
}

export default CatalogNavBar;
