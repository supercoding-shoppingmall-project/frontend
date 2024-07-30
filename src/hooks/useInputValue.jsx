import { useState } from "react";

export const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const changeHandle = (event) => {
    setValue(event.target.value);
  };

  return [value, changeHandle];
};
