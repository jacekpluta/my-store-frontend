import React from "react";
import Items from "../components/items";

interface ItemsProps {
  query: {
    page: string;
  };
}
//props.query
function items(props: ItemsProps) {
  return <Items page={parseFloat(props.query.page) || 1}></Items>;
}

export default items;
