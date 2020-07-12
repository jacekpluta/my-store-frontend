import React from "react";

import ManagePermissions from "../components/managePermissions";
import RequestToSignIn from "../components/requestToSignIn";

interface ManagepermissionsProps {
  query: {
    page: string;
  };
}

const managepermissions = (props: ManagepermissionsProps) => (
  <RequestToSignIn>
    <ManagePermissions
      page={parseFloat(props.query.page) || 1}
    ></ManagePermissions>
  </RequestToSignIn>
);

export default managepermissions;
