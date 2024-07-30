import React from "react";
import { useInputValue } from "../../hooks/useInputValue";

const AddProductName = () => {
  const [productName, setProductName] = useInputValue("");

  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="productName"
        className="block font-bold leading-6 text-gray-900"
      >
        상품명
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
          <input
            id="productName"
            name="productName"
            type="text"
            autoComplete="productName"
            className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none h-10"
            //required
            value={productName}
            onChange={setProductName}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProductName;
