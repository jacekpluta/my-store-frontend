import React from "react";
import SignIn from "../components/SignIn";
import { ColumnCenter } from "../styles/ColumnCenter";

type SignInProps = {};

const SignInPage = (props: SignInProps) => (
  <ColumnCenter>
    <SignIn></SignIn>
  </ColumnCenter>
);

export default SignInPage;
