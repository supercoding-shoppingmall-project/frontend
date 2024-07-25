"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/24/outline";

const product = {
  name: "Basic Tee 6-Pack ",
  price: "$192",
  rating: 3.9,
  reviewCount: 117,
  href: "#",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
  imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "XXL", inStock: true },
    { name: "XXXL", inStock: false },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function QuantityModal({ isClicked, setIsClicked }) {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  useEffect(() => {
    if (isClicked) {
      setOpen(true);
    }
  }, [isClicked]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setIsClicked(false);
      }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <section className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-center">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <PencilIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    재고 수량 변경
                  </DialogTitle>
                </div>
              </div>
            </section>
            <section className="bg-white px-4 pb-4 pt-5 sm:p-6">
              <form>
                {/* 사이즈별 재고 변경 */}
                <fieldset aria-label="Choose a size">
                  <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 lg:grid-cols-4">
                    <div className="mt-2 col-span-1">
                      <div>
                        <label
                          htmlFor="240"
                          className="block font-bold leading-6 text-gray-900"
                        >
                          240
                        </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
                          <input
                            id="240"
                            name="240"
                            type="number"
                            autoComplete="240"
                            className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 col-span-1">
                      <div>
                        <label
                          htmlFor="250"
                          className="block font-bold leading-6 text-gray-900"
                        >
                          250
                        </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
                          <input
                            id="250"
                            name="250"
                            type="number"
                            autoComplete="250"
                            className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 col-span-1">
                      <div>
                        <label
                          htmlFor="260"
                          className="block font-bold leading-6 text-gray-900"
                        >
                          260
                        </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
                          <input
                            id="260"
                            name="260"
                            type="number"
                            autoComplete="260"
                            className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 col-span-1">
                      <div>
                        <label
                          htmlFor="270"
                          className="block font-bold leading-6 text-gray-900"
                        >
                          270
                        </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
                          <input
                            id="270"
                            name="270"
                            type="number"
                            autoComplete="270"
                            className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 col-span-1">
                      <div>
                        <label
                          htmlFor="280"
                          className="block font-bold leading-6 text-gray-900"
                        >
                          280
                        </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
                          <input
                            id="280"
                            name="280"
                            type="number"
                            autoComplete="280"
                            className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 col-span-1">
                      <div>
                        <label
                          htmlFor="290"
                          className="block font-bold leading-6 text-gray-900"
                        >
                          290
                        </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
                          <input
                            id="290"
                            name="290"
                            type="number"
                            autoComplete="290"
                            className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 col-span-1">
                      <div>
                        <label
                          htmlFor="300"
                          className="block font-bold leading-6 text-gray-900"
                        >
                          300
                        </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
                          <input
                            id="300"
                            name="300"
                            type="number"
                            autoComplete="300"
                            className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 col-span-1">
                      <div>
                        <label
                          htmlFor="310"
                          className="block font-bold leading-6 text-gray-900"
                        >
                          310
                        </label>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
                          <input
                            id="310"
                            name="310"
                            type="number"
                            autoComplete="310"
                            className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:justify-end sm:px-6">
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => {
                      setOpen(false);
                      setIsClicked(false);
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mt-0 sm:w-auto sm:ml-3"
                  >
                    변경
                  </button>
                </div>
              </form>
            </section>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
