import React from "react";

import ImageGallery from "../components/mock-data/ImageGallery";
import ProductInfo from "../components/detail/ProductInfo";
import ProductOptions from "../components/detail/ProductOptions";
import MockDatas from "../components/mock-data/MockDatas";
import DetailDescription from "../components/detail/DetailDescription";
import { SizeOption } from "../constants/SizeOption";

import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function DetailPage() {
  const { id } = useParams();
  const product = MockDatas.find((product) => product.id.toString() === id);
  const { addToCart } = useCart();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <ImageGallery imageSrc={product.imageSrc} />
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-8xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>
          <ProductOptions
            MockData={product}
            SizeOption={SizeOption}
            addToCart={addToCart}
          />
          <ProductInfo MockData={product} />
          <DetailDescription />
        </div>
      </div>
    </div>
  );
}
