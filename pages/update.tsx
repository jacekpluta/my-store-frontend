import React from "react";
import RequestToSignIn from "../components/requestToSignIn";
import UpdateItem from "../components/udateItem";

type SellProps = { query: { id: string } };

const Update = (props: SellProps) => {
  return (
    <RequestToSignIn>
      <UpdateItem id={props.query.id}></UpdateItem>
    </RequestToSignIn>
  );
};

export default Update;
