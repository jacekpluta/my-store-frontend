import React from "react";
import RequestToLogin from "../components/user/requestToLogin";
import Orders from "../components/nav/orders";

const orderpage = () => (
  <RequestToLogin>
    <Orders />
  </RequestToLogin>
);

export default orderpage;
