import React from "react";
import RequestToLogin from "../components/user/requestToLogin";
import Order from "../components/nav/order";
type OrderProps = { query: { id: string } };

const orderpage = (props: OrderProps) => (
  <RequestToLogin>
    <Order orderId={props.query.id} />
  </RequestToLogin>
);

export default orderpage;
