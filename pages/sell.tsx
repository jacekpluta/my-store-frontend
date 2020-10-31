import React from "react";
import CreateItem from "../components/nav/createItem";
import RequestToLogin from "../components/user/requestToLogin";

type SellProps = {};

const Sell = (props: SellProps) => (
  <RequestToLogin>
    <CreateItem></CreateItem>
  </RequestToLogin>
);

export default Sell;
