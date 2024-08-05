import React from "react";
import { SizeOption } from "../../constants/SizeOption";

const SizeStock = ({ product, selectedSize }) => {
  const sizeIndex = SizeOption.sizes.findIndex(
    (size) => size.name === selectedSize
  );

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
          구매 가능한 수량
        </h2>
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
          {product.sizeStock && Array.isArray(product.sizeStock) && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {sizeIndex !== -1 && (
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {selectedSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sizeStock[sizeIndex]}{" "}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {(!product.sizeStock || !Array.isArray(product.sizeStock)) && (
            <div>No sizeStock data</div>
          )}
        </div>
        {console.log("sizeStock:", product.sizeStock)}
      </div>
    </div>
  );
};

export default SizeStock;
