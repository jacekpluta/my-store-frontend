import React from "react";

interface MyProps {}

const Checkbox: React.FunctionComponent<MyProps> = (props) => {
  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <label style={{ paddingLeft: "30px" }}>{props.children}</label>
        <input type="checkbox" />
        <span className="checkbox-custom rectangular" />
      </label>
    </div>
  );
};

export default Checkbox;
