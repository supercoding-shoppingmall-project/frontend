import React, { useEffect, useState } from "react";
import axios from "axios";

const SizeStock = ({ productId, sizes }) => {
  const [sizeStocks, setSizeStocks] = useState({});

  useEffect(() => {
    const fetchSizeStock = async (id, size) => {
      try {
        const response = await axios.get(`/api/product/${id}/${size}Stock`);
        return response.data.stock;
      } catch (error) {
        console.error(`Failed to fetch stock for size ${size}:`, error);
        return null;
      }
    };

    const fetchAllSizeStocks = async () => {
      const stocks = {};
      for (let size of sizes) {
        const stock = await fetchSizeStock(productId, size.name);
        stocks[size.name] = stock;
      }
      setSizeStocks(stocks);
    };

    fetchAllSizeStocks();
  }, [productId, sizes]);

  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <fieldset aria-label="Choose a size" className="mt-4">
        <RadioGroup value={selectedSize} onChange={setSelectedSize}>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
            {sizes.map((size) => (
              <Radio
                key={size.name}
                value={size.name}
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
                {/* 재고 표시 */}
                <span className="block text-sm text-gray-600 mt-1">
                  재고:{" "}
                  {sizeStocks[size.name] !== undefined
                    ? sizeStocks[size.name]
                    : "조회 중..."}
                </span>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </fieldset>
    </div>
  );
};

export default SizeStock;
