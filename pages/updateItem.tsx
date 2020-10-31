import React from "react";
import RequestToLogin from "../components/user/requestToLogin";
import UpdateItem from "../components/singleItem/udateItem";

type UpdateProps = { query: { id: string } };

const Update = (props: UpdateProps) => {
  return (
    <RequestToLogin>
      <UpdateItem id={props.query.id}></UpdateItem>
    </RequestToLogin>
  );
};

export default Update;
