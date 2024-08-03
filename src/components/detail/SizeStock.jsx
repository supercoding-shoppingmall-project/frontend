import React, { useState, useEffect } from "react";
import axios from "axios";

const SizeStock = ({ productId, size }) => {
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSizeStock = async () => {
      try {
        const response = await axios.get(
          `/api/product/${productId}/${size}Stock`
        );
        setStock(response.data.stock);
      } catch (error) {
        console.error(`Failed to fetch stock for size ${size}:`, error);
        setError("Failed to fetch stock");
      } finally {
        setLoading(false);
      }
    };

    fetchSizeStock();
  }, [productId, size]);

  if (loading) return <span>조회 중...</span>;
  if (error) return <span>{error}</span>;

  return <span>재고: {stock}</span>;
};

export default SizeStock;
