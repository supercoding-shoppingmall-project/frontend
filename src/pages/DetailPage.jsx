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

      <div>
        <h2>Size Stock:</h2>
        {product.sizeStock ? (
          Array.isArray(product.sizeStock) ? (
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
                      {SizeOption}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stock}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>sizeStock is not an array</div>
          )
        ) : (
          <div>No sizeStock data</div>
        )}
      </div>
      {console.log("sizeStock:", product.sizeStock)}
    </div>
  );
}
