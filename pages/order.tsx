import React from "react";
import RequestToSignIn from "../components/requestToSignIn";
import Order from "../components/order";
type OrderProps = { query: { id: string } };

const orderpage = (props: OrderProps) => (
  <RequestToSignIn>
    <Order orderId={props.query.id} />
  </RequestToSignIn>
);

export default orderpage;
