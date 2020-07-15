import React from "react";
import RequestToSignIn from "../components/requestToSignIn";
import Orders from "../components/orders";

const orderpage = () => (
  <RequestToSignIn>
    <Orders />
  </RequestToSignIn>
);

export default orderpage;
