// ImageGallery.jsx
import React from "react";

const ImageGallery = ({ imageSrc = [] }) => {
  console.log("ImageGallery imageSrc:", imageSrc); // 확인용 로그
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      {imageSrc.length > 1 && (
        <div className="lg:col-span-2 lg:row-span-2 aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
          <img
            src={imageSrc[1]}
            alt={`Image ${imageSrc[1]}`}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
      {imageSrc.length > 0 && (
        <div className="lg:col-span-1 lg:row-start-1 aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img
            src={imageSrc[0]}
            alt={`Image ${imageSrc[0]}`}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
      {imageSrc.length > 2 && (
        <div className="lg:col-span-1 lg:row-start-2 aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
          <img
            src={imageSrc[2]}
            alt={`Image ${imageSrc[2]}`}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
