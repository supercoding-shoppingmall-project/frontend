import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import ImageGallery from "../components/ImageGallery";
import ProductInfo from "../components/ProductInfo";
import ProductOptions from "../components/ProductOption";
import { MockProduct } from "../components/MockProduct";
import { Reviews } from "../components/Reviews";

export default function DetailPage() {
  return (
    <div className="bg-white">
      <div className="pt-6">
        <Breadcrumb
          breadcrumbs={MockProduct.breadcrumbs}
          productHref={MockProduct.href}
          productName={MockProduct.name}
        />
        <ImageGallery images={MockProduct.images} />
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {MockProduct.name}
            </h1>
          </div>
          <ProductOptions MockProduct={MockProduct} Reviews={Reviews} />
          <ProductInfo MockProduct={MockProduct} />
        </div>
      </div>
    </div>
  );
}
