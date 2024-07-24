import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import ImageGallery from "../components/ImageGallery";
import ProductInfo from "../components/ProductInfo";
import ProductOptions from "../components/ProductOption";
import { product, reviews } from "../components/mockData";

export default function Detail() {
  return (
    <div className="bg-white">
      <div className="pt-6">
        <Breadcrumb
          breadcrumbs={product.breadcrumbs}
          productHref={product.href}
          productName={product.name}
        />
        <ImageGallery images={product.images} />
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>
          <ProductOptions product={product} reviews={reviews} />
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
