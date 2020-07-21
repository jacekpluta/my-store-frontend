import React from "react";
import RequestToSignIn from "../components/RequestToSignIn";
import Order from "../components/Order";
type OrderProps = { query: { id: string } };

const orderpage = (props: OrderProps) => (
  <RequestToSignIn>
    <Order orderId={props.query.id} />
  </RequestToSignIn>
);

export default orderpage;
