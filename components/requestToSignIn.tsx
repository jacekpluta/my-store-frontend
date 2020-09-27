import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CURRENT_USER_QUERY } from "./queries";
import SignIn from "./signIn";
import Error from "./errorMessage";

interface MyProps {}

const RequestToSignIn: React.FunctionComponent<MyProps> = (props) => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <Error error={error}></Error>;
  }
  if (data && data.user && data.user.id) return <div>{props.children}</div>;

  return (
    <div>
      <p>Please sign in to do that</p>
      <SignIn />
    </div>
  );
};

export default RequestToSignIn;
