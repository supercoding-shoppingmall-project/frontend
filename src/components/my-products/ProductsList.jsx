import React from "react";
import FormatToKRW from "../../utils/FormatToKRW";

const ProductsList = ({ products, title, btnClickHandle }) => {
  return (
    <>
      <h2 className="mt-10 text-lg font-semibold">{title}</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={index}
              className="group p-3 border border-solid border-slate-300 rounded"
            >
              <div className="mt-1 text-sm font-medium text-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">
                  {product.productName}
                </h3>
                <div>{product.endtime}</div>
              </div>
              <div className="mt-1 text-sm font-medium text-gray-700 flex justify-between items-center">
                <div>{FormatToKRW(product.productPrice)}</div>
                <button
                  onClick={() =>
                    btnClickHandle(product.productName, product.stockDtos)
                  }
                  className="text-center bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm flex justify-around rounded"
                >
                  재고 수량 변경
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            {title === "판매 중"
              ? "판매중인 물품이 없습니다."
              : "판매 종료된 물품이 없습니다."}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsList;
