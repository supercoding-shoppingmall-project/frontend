import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import ProductGrid from "../components/main/ProductGrid";
import { ItemsPerPage } from "../constants/ItemsPerPage";

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (page, pageSize) => {
    try {
      const response = await axios.get(
        `/api/product/all?page=${page}&pageSize=${pageSize}`
      );
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProducts(currentPage, 100);
  }, [currentPage]);

  const totalPages = Math.ceil(products.length / ItemsPerPage);

  const pageChangeHandle = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        products={products}
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
