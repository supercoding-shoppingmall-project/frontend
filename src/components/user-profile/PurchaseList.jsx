import React from "react";
import User from "./User";

const PurchaseList = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center bg-white text-base py-40 px-10 sm:px-80 border border-gray-300">
        <User />
        <div className="sm:w-2/3 sm:ml-10 w-full h-full flex flex-col border border-solid border-gray-200 p-6">
          구매목록
        </div>
      </div>
    </>
  );
};

export default PurchaseList;
