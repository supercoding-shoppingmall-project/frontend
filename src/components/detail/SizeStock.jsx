import React from "react";

const SizeStock = ({ product }) => {
  return (
    <div>
      <div>
        <h2 class="text-2xl font-semibold leading-7 text-gray-900">
          상품 사이즈별 재고
        </h2>
        <div className="max-w-md mx-auto mt-8">
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
                {product.sizeStock.map((stock, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {
                        [
                          "240",
                          "250",
                          "260",
                          "270",
                          "280",
                          "290",
                          "300",
                          "310",
                        ][index]
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stock}
                    </td>
                  </tr>
                ))}
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
