import React from "react";
import RequestToSLogin from "../components/requestToLogin";
import Orders from "../components/orders";

const orderpage = () => (
  <RequestToLogin>
    <Orders />
  </RequestToLogin>
);

export default orderpage;
