import React from "react";
import SignIn from "../components/SignIn";
import { ColumnCenter } from "../components/styles/ColumnCenter";

type SignInProps = {};

const SignInPage = (props: SignInProps) => (
  <ColumnCenter>
    <SignIn></SignIn>
  </ColumnCenter>
);

export default SignInPage;
