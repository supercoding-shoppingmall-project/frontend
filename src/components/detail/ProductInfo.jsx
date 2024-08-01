import React from "react";

const ProductInfo = ({ description }) => {
  return (
    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
      <div className="mt-10">
        <h3 className="text-2xl font-medium text-gray-900">상품 스펙</h3>
        <div className="mt-4">
          <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
            {description.map((highlight) => (
              <li key={description} className="text-gray-400">
                <span className="text-gray-600">{description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
