import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ MockDatas }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {MockDatas.map((MockData) => (
            <div key={MockData.id} className="group">
              <Link to={`/detail/${MockData.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    alt={MockData.imageAlt}
                    src={MockData.imageSrc}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
              </Link>
              <h3 className="mt-4 text-sm text-gray-700">{MockData.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {MockData.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
