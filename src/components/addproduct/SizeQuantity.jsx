import React from "react";
import { SIZES } from "./AddData";

const SizeQuantity = () => {
  return (
    <>
      {SIZES.map((size) => (
        <div className="mt-2 col-span-1" key={size.id}>
          <label htmlFor={size.size} className="block leading-6 text-gray-900">
            {size.size}
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
            <input
              id={size.size}
              name={size.size}
              type="number"
              autoComplete={size.size}
              className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none h-10"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default SizeQuantity;
