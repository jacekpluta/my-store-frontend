import React from "react";
import RequestReset from "../components/requestReset";

import { ColumnCenter } from "../styles/ColumnCenter";

type RequesttokenProps = {};

const requestreset = (props: RequesttokenProps) => (
  <ColumnCenter>
    <RequestReset></RequestReset>
  </ColumnCenter>
);

export default requestreset;