
import React from "react";

import RequestToLogin from "../components/user/requestToLogin";
import Account from "../components/account"

export default function AccountPage() : JSX.Element{
  return (
    <RequestToLogin>
     <Account/>
    </RequestToLogin>
  );
}
