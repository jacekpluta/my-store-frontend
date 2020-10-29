import React from "react";
import CreateItem from "../components/createItem";
import RequestToLogin from "../components/requestToLogin";

type SellProps = {};

const Sell = (props: SellProps) => (
  <RequestToLogin>
    <CreateItem></CreateItem>
  </RequestToLogin>
);

export default Sell;
