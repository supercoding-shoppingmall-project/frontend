import ImageGallery from "../components/mock-data/ImageGallery";
import ProductInfo from "../components/detail/ProductInfo";
import ProductOptions from "../components/detail/ProductOptions";
import DetailDescription from "../components/detail/DetailDescription";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SizeOption } from "../constants/SizeOption";

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        console.log("Fetched product:", response.data);
        if (response.data) {
          setProduct(response.data[0]);
        }
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
    const authHeader = localStorage.getItem("Authorization");
    if (authHeader) {
      try {
        const token = authHeader.split(" ")[1]; // "Bearer " 부분을 제거하고 토큰만 추출
        const payload = JSON.parse(atob(token.split(".")[1])); // 토큰의 payload 부분을 디코딩하여 JSON 파싱
        const fetchedUserId = payload.userId;
        setUserId(fetchedUserId);
      } catch (error) {
        console.error("Failed to parse token:", error);
      }
    }
  }, []);

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
        <ImageGallery imageSrc={product.imageUrls || []} />
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name || "No Name"}
            </h1>
          </div>
          <ProductOptions
            product={product}
            SizeOption={SizeOption}
            userId={userId}
          />
          <ProductInfo description={product.description || []} />
          <DetailDescription />
        </div>
      </div>
    </div>
  );
}
