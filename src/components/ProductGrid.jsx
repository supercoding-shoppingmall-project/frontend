import React, { useState } from "react";
import FormatToKRW from "../utils/FormatToKRW";
import { Link } from "react-router-dom";

const ProductGrid = ({ MockDatas, currentPage, itemsPerPage }) => {
  const [sortOption, setSortOption] = useState("default");

  // 정렬 기능
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedMockDatas = [...MockDatas].sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.price - b.price;
    } else if (sortOption === "price-desc") {
      return b.price - a.price;
    } else if (sortOption === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "name-desc") {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  // 선택한 페이지의 1번째 인덱스. 예) 현재 페이지 2, 페이지당 아이템 4 -> 4번 인덱스가 1번째 인덱스
  const startIndex = (currentPage - 1) * itemsPerPage;
  // 마지막 인덱스
  const endIndex = startIndex + itemsPerPage;
  // 선택한 페이지에 펼쳐질 인덱스들
  const currentProducts = sortedMockDatas.slice(startIndex, endIndex);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-end mb-4">
          <select
            className="border rounded p-2"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="default">상품 정렬</option>
            <option value="price-asc">낮은 가격순</option>
            <option value="price-desc">높은 가격순</option>
            <option value="name-asc">오름차순</option>
            <option value="name-desc">내림차순</option>
          </select>
        </div>
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {currentProducts.map((MockData) => (
            <div key={MockData.id} className="group">
              <Link to={`/detail/${MockData.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    alt={MockData.imageAlt}
                    src={MockData.imageSrc}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
              </Link>
              <h3 className="mt-4 text-sm text-gray-700">{MockData.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {FormatToKRW(MockData.price)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
