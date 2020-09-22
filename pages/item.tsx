import React from "react";
import SingleItem from "../components/singleItem";

interface ItemProps {
  query: {
    id: string;
  };
}

function Item(props: ItemProps) {
  return <SingleItem itemId={props.query.id} />;
}

export default Item;
