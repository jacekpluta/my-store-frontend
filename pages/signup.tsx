import React from "react";
import SignUp from "../components/signUp";

import styled from "styled-components";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

type SignUpProps = {};

const SignUpPage = (props: SignUpProps) => (
  <Columns>
    <SignUp></SignUp>
  </Columns>
);

export default SignUpPage;
