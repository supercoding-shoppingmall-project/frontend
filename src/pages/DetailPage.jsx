import React from "react";

import ImageGallery from "../components/mockData/ImageGallery";
import ProductInfo from "../components/detailPage/ProductInfo";
import ProductOptions from "../components/detailPage/ProductOptions";
import MockDatas from "../components/mockData/MockDatas";
import DetailDescription from "../components/detailPage/DetailDescription";
import { SizeOption } from "../components/Constants/SizeOption";

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
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>
          <ProductOptions
            SizeOption={SizeOption}
            MockData={product}
            addToCart={addToCart}
          />
          <ProductInfo MockData={product} />
          <DetailDescription />
        </div>
      </div>
    </div>
  );
}
