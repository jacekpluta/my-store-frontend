import React from "react";
import RequestToLogin from "../components/requestToLogin";
import UpdateItem from "../components/udateItem";

type SellProps = { query: { id: string } };

const Update = (props: SellProps) => {
  return (
    <RequestToLogin>
      <UpdateItem id={props.query.id}></UpdateItem>
    </RequestToLogin>
  );
};

export default Update;
