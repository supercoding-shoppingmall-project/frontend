import React, { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";

const AddImages = ({ onImagesChange }) => {
  const imageSlots = ["productImage1", "productImage2", "productImage3"];
  const [imagePreviews, setImagePreviews] = useState({});

  const fileChangeHandle = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [id]: reader.result,
        }));

        onImagesChange((prev) => [...prev, file]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-10">
      <label
        htmlFor="productImage"
        className="block font-bold leading-6 text-gray-900"
      >
        이미지 등록
      </label>
      <div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {imageSlots.map((id, index) => (
            <div
              className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 col-span-2 relative overflow-hidden"
              key={id}
            >
              <div className="text-center">
                <PhotoIcon
                  aria-hidden="true"
                  className="mx-auto h-12 w-12 text-gray-300"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor={id}
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>이미지 등록하기</span>
                    <input
                      id={id}
                      name="productImage"
                      type="file"
                      className="sr-only"
                      accept="image/png, image/jpeg, image/gif"
                      required={index === 0}
                      onChange={(event) => fileChangeHandle(id, event)}
                    />
                  </label>
                  <p className="pl-1">0MB 이하 PNG, JPG, GIF</p>
                </div>
                {imagePreviews[id] && (
                  <div className="absolute left-0 top-0 w-full h-full rounded">
                    <img
                      src={imagePreviews[id]}
                      alt={`미리보기 ${id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddImages;
