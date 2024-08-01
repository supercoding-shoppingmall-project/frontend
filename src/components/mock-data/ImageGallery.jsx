// ImageGallery.jsx
import React from "react";

const ImageGallery = ({ imageUrls = [] }) => {
  console.log("ImageGallery imageUrls:", imageUrls);
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      {imageUrls.length > 1 && (
        <div className="lg:col-span-2 lg:row-span-2 aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
          <img
            src={imageUrls[1]}
            alt={`Image ${imageUrls[1]}`}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
      {imageUrls.length > 0 && (
        <div className="lg:col-span-1 lg:row-start-1 aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img
            src={imageUrls[0]}
            alt={`Image ${imageUrls[0]}`}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
      {imageUrls.length > 2 && (
        <div className="lg:col-span-1 lg:row-start-2 aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img
            src={imageUrls[2]}
            alt={`Image ${imageUrls[2]}`}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
