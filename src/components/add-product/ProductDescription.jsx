import React, { useState } from "react";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

const ProductDescription = ({ onDescriptionsChange }) => {
  const [inputs, setInputs] = useState(["", ""]);

  const inputChangeHandle = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    onDescriptionsChange(newInputs);
  };

  const addInputHandle = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index + 1, 0, "");
    setInputs(newInputs);
    onDescriptionsChange(newInputs);
  };

  const removeInputHandle = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
    onDescriptionsChange(newInputs);
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="desc"
        className="block font-semibold leading-7 text-gray-900"
      >
        상품 설명
      </label>
      <ul className="mt-2 grid grid-cols-8 gap-x-6 gap-y-6">
        {/* 동적으로 li 추가하기 */}
        {inputs.map((input, index) => (
          <li
            className="col-span-8 sm:col-span-7 lg:col-span-5 flex align-center"
            key={index}
          >
            <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 block w-full lg:w-2/3">
              <input
                id="descriptions"
                name="descriptions"
                type="text"
                autoComplete="descriptions"
                className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none h-10"
                //required={index === 0}
                value={input}
                onChange={(e) => inputChangeHandle(index, e.target.value)}
              />
            </div>
            <div className="flex justify-center align-center">
              {/* + 버튼 클릭시 li 추가 */}
              <button
                type="button"
                className="ml-5"
                onClick={() => addInputHandle(index)}
              >
                <PlusCircleIcon
                  aria-hidden="true"
                  className="h-8 w-8 text-indigo-500"
                />
              </button>
              {/* - 버튼 클릭시 li 삭제 */}
              <button
                type="button"
                className={`ml-3 ${
                  index === 0 ? `opacity-0 pointer-events-none` : ""
                } `}
                onClick={() => removeInputHandle(index)}
              >
                <MinusCircleIcon
                  aria-hidden="true"
                  className="h-8 w-8 text-indigo-500"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDescription;
