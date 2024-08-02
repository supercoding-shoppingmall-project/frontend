import React, { useState, useEffect } from "react";
import { RadioGroup, Radio } from "@headlessui/react";
import Alert from "./Alert";
import ClassNames from "../../utils/ClassNames";
import FormatToKRW from "../../utils/FormatToKRW";
import AddToCartButton from "./AddToCartButton";

const ProductOptions = ({ SizeOption, product, userId }) => {
  const [selectedSize, setSelectedSize] = useState(SizeOption.sizes[0]);
  const [showAlert, setShowAlert] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log("ProductOptions rendering with product:", product);
  }, [product]);

  const productPrice = Number(product.price);
  if (isNaN(productPrice)) {
    console.error("Price is not a number:", product.price);
  }

  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <p className="text-3xl tracking-tight text-gray-900">
        {FormatToKRW(productPrice)}
      </p>

      <form className="mt-10">
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              사이즈 옵션
            </a>
          </div>

          <fieldset aria-label="Choose a size" className="mt-4">
            <RadioGroup
              value={selectedSize}
              onChange={setSelectedSize}
              className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
            >
              {SizeOption.sizes.map((size) => (
                <Radio
                  key={size.name}
                  value={size.name} // size 객체가 아닌 size.name을 사용
                  disabled={!size.inStock}
                  className={({ checked }) =>
                    ClassNames(
                      size.inStock
                        ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                        : "cursor-not-allowed bg-gray-50 text-gray-200",
                      checked ? "ring-2 ring-indigo-500 border-indigo-500" : "",
                      "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                    )
                  }
                >
                  <span>{size.name}</span>
                  {size.inStock ? (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                    >
                      <svg
                        stroke="currentColor"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                      >
                        <line
                          x1={0}
                          x2={100}
                          y1={100}
                          y2={0}
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </span>
                  )}
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>
        </div>

        <div className="flex items-center justify-between mt-6"></div>
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">구매 수량</span>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            min="1"
          />
        </div>

        {/* 직접적으로 사이즈 값을 지정 */}
        <AddToCartButton
          productId={product.id}
          selectedSize={240} // 직접적으로 사이즈 값을 지정합니다.
          quantity={quantity}
          userId={userId}
        />
      </form>

      {showAlert && <Alert />}
    </div>
  );
};

export default ProductOptions;
