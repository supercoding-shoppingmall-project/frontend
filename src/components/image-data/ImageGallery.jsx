import React from "react";

const ImageGallery = ({ imageSrc = [] }) => {
  const renderImage = (src, index) => (
    <div
      key={index}
      className={`lg:col-span-${index === 1 ? "2" : "1"} ${
        index === 1 ? "lg:row-span-2" : "lg:row-span-1"
      } aspect-h-${
        index === 1 ? "4" : "2"
      } aspect-w-3 overflow-hidden rounded-lg`}
    >
      <img
        src={src}
        alt={`Image ${src}`}
        className="h-full w-full object-cover object-center"
      />
    </div>
  );

  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      {imageSrc.map((src, index) => index < 3 && renderImage(src, index))}
    </div>
  );
};

export default ImageGallery;
