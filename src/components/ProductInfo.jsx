import React from "react";

const ProductInfo = ({ MockData }) => {
  return (
    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
      <div className="mt-10">
        <h3 className="text-sm font-medium text-gray-900">상품 스펙</h3>
        <div className="mt-4">
          <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
            {MockData.highlights.map((highlight) => (
              <li key={highlight} className="text-gray-400">
                <span className="text-gray-600">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-sm font-medium text-gray-900">상품 상세 정보</h2>
        <div className="mt-4 space-y-6">
          <p className="text-sm text-gray-600">{MockData.details}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
