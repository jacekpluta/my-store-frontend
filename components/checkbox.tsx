import { useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { CLEAR_FILTERS_QUERY } from "../lib/queries";
import { clearFilters } from "../lib/vars";

interface MyProps {
  changeFilter: Function;
}

const Checkbox: React.FunctionComponent<MyProps> = (props) => {
  const { children, changeFilter } = props;
  const [checked, setChecked] = useState<boolean>(false);

  const clearFiltersData = useQuery(CLEAR_FILTERS_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (!clearFiltersData.loading && !clearFiltersData.error) {
      const clearIt = clearFiltersData.data.clearFilters;

      if (clearIt) {
        setChecked(false);
        clearFilters(false);
      }
    }
  }, [checked, clearFiltersData.data]);

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <label style={{ paddingLeft: "30px" }}>{children}</label>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            changeFilter(children);
          }}
        />
        <span className="checkbox-custom rectangular" />
      </label>
    </div>
  );
};

export default Checkbox;
