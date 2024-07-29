import React from "react";
import User from "./User";

const PurchaseList = () => {
  return (
    <>
      <div className="flex justify-center bg-white text-base py-40 px-80 border border-gray-300">
        <User />
        <div className="w-2/3 ml-10 h-full flex flex-col border border-solid border-gray-200 p-6">
          구매목록
        </div>
      </div>
    </>
  );
};

export default PurchaseList;
