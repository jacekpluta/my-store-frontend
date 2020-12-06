import React from "react";
import RequestToLogin from "../components/user/requestToLogin";
import Orders from "../components/orders";

const orderpage = () => (
  <RequestToLogin>
    <Orders />
  </RequestToLogin>
);

export default orderpage;
