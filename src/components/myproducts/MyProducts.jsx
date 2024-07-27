"use client";

import { useState } from "react";
import QuantityModal from "./QuantityModal";
import { PRODUCTS } from "./MyData";

export default function MyProducts() {
  const [isClicked, setIsClicked] = useState(false);

  const btnClickHandle = () => {
    setIsClicked(true);
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-7xl">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                  <button
                    onClick={btnClickHandle}
                    className="absolute left-0 bottom-0 w-full text-center bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm flex justify-around"
                  >
                    재고 수량 변경
                  </button>
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {product.name}
                </h3>
                <div className="mt-1 text-sm font-medium text-gray-700 flex justify-between">
                  <div>{product.price} 원</div>
                  <div>{product.closingDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 재고수량 변경 모달 */}
      <QuantityModal isClicked={isClicked} setIsClicked={setIsClicked} />
    </>
  );
}
