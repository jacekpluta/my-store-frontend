import React from "react";
import SingleItem from "../components/singleItem";

function Item(props) {
  return <SingleItem itemId={props.query.id} />;
}

export default Item;
