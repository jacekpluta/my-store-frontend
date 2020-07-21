import React from "react";
import CreateItem from "../components/CreateItem";
import RequestToSignIn from "../components/RequestToSignIn";

type SellProps = {};

const Sell = (props: SellProps) => (
  <RequestToSignIn>
    <CreateItem></CreateItem>
  </RequestToSignIn>
);

export default Sell;
