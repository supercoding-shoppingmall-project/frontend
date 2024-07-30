import React, { useState } from "react";
import Pagination from "../components/Pagination";
import ProductGrid from "../components/main/ProductGrid";
import MockDatas from "../components/mock-data/MockDatas";
import { ItemsPerPage } from "../constants/ItemsPerPage";

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(MockDatas.length / ItemsPerPage);

  const pageChangeHandle = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            SHOES MARKET
          </h1>
        </div>
      </main>

      <ProductGrid
        MockDatas={MockDatas}
        currentPage={currentPage}
        itemsPerPage={ItemsPerPage}
      />
      <div className="flex justify-center items-center my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={pageChangeHandle}
        />
      </div>
    </>
  );
}
