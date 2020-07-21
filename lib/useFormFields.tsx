import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    function (event: React.ChangeEvent<HTMLInputElement>) {
      const val: string | number =
        event.target.type === "number"
          ? parseFloat(event.target.value)
          : event.target.value;

      setValues({
        ...fields,
        [event.target.id]: val,
      });
    },
  ];
}
