import React from "react";
import UpdateItem from "../components/updateItem";

type SellProps = { query: { id: string } };

const Update = (props: SellProps) => {
  return (
    <div>
      <UpdateItem id={props.query.id}></UpdateItem>
    </div>
  );
};

export default Update;
