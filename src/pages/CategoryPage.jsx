import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductGrid from "../components/main/ProductGrid";
import Pagination from "../components/Pagination";
import { ItemsPerPage } from "../constants/ItemsPerPage";

export default function CategoryPage() {
  const { number } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/product/category/${number}`);
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [number]);

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
    <div className="bg-white">
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
    </div>
  );
}
