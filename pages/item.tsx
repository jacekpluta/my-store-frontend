import React from "react";
import SingleItem from "../components/SingleItem";

function Item(props) {
  return <SingleItem itemId={props.query.id} />;
}

export default Item;
