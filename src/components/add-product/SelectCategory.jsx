import React from "react";
import { CATEGORIES } from "../../constants/AddProducts";

const SelectCategory = () => {
  return (
    <div className="sm:col-span-2">
      <label
        htmlFor="category"
        className="block font-bold leading-6 text-gray-900"
      >
        카테고리
      </label>
      <div className="mt-2">
        <select
          id="category"
          name="category"
          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus-visible:outline-none h-10"
        >
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.value}>
              {category.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectCategory;
