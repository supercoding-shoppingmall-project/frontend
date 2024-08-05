import React, { useState } from "react";
import FormatToKRW from "../../utils/FormatToKRW";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, currentPage, itemsPerPage }) => {
  const [sortOption, setSortOption] = useState("default");

  const sortChangeHandle = (event) => {
    setSortOption(event.target.value);
  };

  const sortedDatas = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "createdAt-asc":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "createdAt-desc":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = sortedDatas.slice(startIndex, endIndex);

  return (
    <div>
      <div>
        <div>
          <select value={sortOption} onChange={sortChangeHandle}>
            <option value="default">상품 정렬</option>
            <option value="price-asc">낮은 가격순</option>
            <option value="price-desc">높은 가격순</option>
            <option value="createdAt-asc">등록 날짜순 (오름차순)</option>
            <option value="createdAt-desc">등록 날짜순 (내림차순)</option>
          </select>
        </div>
        <h2>Products</h2>
        <div>
          {currentProducts.map((product) => {
            return (
              <div key={product.id}>
                <Link to={`/detail/${product.id}`}>
                  <div>
                    <img
                      alt={product.imageUrls[1]}
                      src={product.imageUrls[1]}
                    />
                  </div>
                </Link>
                <h3>{product.name}</h3>
                <p>{FormatToKRW(Number(product.price))}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
