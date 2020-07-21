import React from "react";
import SignUp from "../components/SignUp";

import { ColumnCenter } from "../styles/ColumnCenter";

type SignUpProps = {};

const SignUpPage = (props: SignUpProps) => (
  <ColumnCenter>
    <SignUp></SignUp>
  </ColumnCenter>
);

export default SignUpPage;
