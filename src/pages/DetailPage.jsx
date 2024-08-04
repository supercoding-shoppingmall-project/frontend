import ImageGallery from "../components/mock-data/ImageGallery";
import ProductInfo from "../components/detail/ProductInfo";
import ProductOptions from "../components/detail/ProductOptions";
import DetailDescription from "../components/detail/DetailDescription";
import SellingEndDate from "../components/detail/SellingEndDate";

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
  const [selectedSize, setSelectedSize] = useState(SizeOption.sizes[0]);

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
        const token = authHeader.split(" ")[1];
        console.log("Token:", token);
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("Payload:", payload);
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

  const sizeChangeHandle = (size) => {
    setSelectedSize(size);
  };

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
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name || "No Name"}
              </h1>
              <ProductInfo description={product.description || []} />
              <DetailDescription />
            </div>
            <div className="mt-4 lg:mt-0">
              <ProductOptions
                product={product}
                SizeOption={SizeOption}
                userId={userId}
                sizeChangeHandle={sizeChangeHandle}
              />
              <SellingEndDate endDate={product.endDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
