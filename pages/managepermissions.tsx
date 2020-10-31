import React from "react";

import ManagePermissions from "../components/user/managePermissions";
import RequestToLogin from "../components/user/requestToLogin";

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
