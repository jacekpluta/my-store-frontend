import React from "react";
import RequestToSignIn from "../components/RequestToSignIn";
import Orders from "../components/Orders";

const orderpage = () => (
  <RequestToSignIn>
    <Orders />
  </RequestToSignIn>
);

export default orderpage;
