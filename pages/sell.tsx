import React from "react";
import CreateItem from "../components/createItem";
import RequestToSignIn from "../components/requestToSignIn";

type SellProps = {};

const Sell = (props: SellProps) => (
  <RequestToSignIn>
    <CreateItem></CreateItem>
  </RequestToSignIn>
);

export default Sell;
