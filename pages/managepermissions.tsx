import React from "react";

import ManagePermissions from "../components/managePermissions";
import RequestToLogin from "../components/requestToLogin";

interface ManagepermissionsProps {
  query: {
    page: string;
  };
}

const managepermissions = (props: ManagepermissionsProps) => (
  <RequestToLogin>
    <ManagePermissions
      page={parseFloat(props.query.page) || 1}
    ></ManagePermissions>
  </RequestToLogin>
);

export default managepermissions;
