import ImageGallery from "../components/mock-data/ImageGallery";
import ProductInfo from "../components/detail/ProductInfo";
import ProductOptions from "../components/detail/ProductOptions";
import DetailDescription from "../components/detail/DetailDescription";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SizeOption } from "../constants/SizeOption";
import { useCart } from "../contexts/CartContext";

export default function DetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null); // 초기값을 null로 설정
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        console.log("Fetched product:", response.data); // product 객체의 구조 확인
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    console.log("Product state updated:", product);
  }, [product]);

  console.log("DetailPage rendering");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  console.log("Rendering ImageGallery with imageUrls:", product.imageUrls);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <ImageGallery imageUrls={product.imageUrls || []} />
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name || "No Name"}
            </h1>
          </div>
          <ProductOptions
            product={product}
            SizeOption={SizeOption}
            addToCart={addToCart}
          />
          <ProductInfo description={product.description || []} />
          <DetailDescription />
        </div>
      </div>
    </div>
  );
}
