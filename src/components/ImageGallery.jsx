import React from "react";

const ImageGallery = ({ images }) => {
  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div className="lg:col-span-2 lg:row-span-2 aspect-h-4 aspect-w-3 overflow-hidden rounded-lg">
        <img
          src={images[0].src}
          alt={images[0].alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="lg:col-span-1 lg:row-start-1 aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
        <img
          src={images[1].src}
          alt={images[1].alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="lg:col-span-1 lg:row-start-2 aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
        <img
          src={images[2].src}
          alt={images[2].alt}
          className="h-full w-full object-cover object-center"
        />
      </div>
    </div>
  );
};

export default ImageGallery;

{
  /* <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
  <img
    src={images[3].src}
    alt={images[3].alt}
    className="h-full w-full object-cover object-center"
  />
</div> */
}
