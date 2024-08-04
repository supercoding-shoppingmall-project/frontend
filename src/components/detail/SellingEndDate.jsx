import React from "react";

const SellingEndDate = ({ endDate }) => {
  const formattedDate = new Date(endDate).toLocaleDateString();

  return (
    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
      <div className="mt-10">
        <h3 className="text-2xl font-semibold leading-7 text-gray-900">
          판매 마감일자
        </h3>{" "}
        <div className="mt-4">
          <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
            <li className="text-gray-400">
              <span className="text-gray-600">{formattedDate}</span>{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellingEndDate;
