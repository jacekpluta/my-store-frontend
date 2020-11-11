import React from "react";
import { useEffect } from "react";

export const usePrevious = (value: any) => {
  const ref = React.useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
