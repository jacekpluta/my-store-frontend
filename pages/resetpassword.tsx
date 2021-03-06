import React from "react";
import ResetPass from "../components/user/resetPassword";

import ColumnCenter from "../components/styles/ColumnCenter";

interface ResetpasswordProps {
  query: { resetToken: string };
}

const resetpassword = (props: ResetpasswordProps) => (
  <ColumnCenter>
    <ResetPass resetToken={props.query.resetToken}></ResetPass>
  </ColumnCenter>
);

export default resetpassword;
