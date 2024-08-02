import React from "react";

const AddPeriod = () => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="sm:col-span-2">
      <label
        htmlFor="endtime"
        className="block font-bold leading-6 text-gray-900"
      >
        판매 마감
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            id="endtime"
            name="endtime"
            type="date"
            min={today}
            autoComplete="endtime"
            className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none h-10"
            //required
          />
        </div>
      </div>
    </div>
  );
};

export default AddPeriod;
