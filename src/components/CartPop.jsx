"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

const initialProducts = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    size: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    size: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

export default function CartPop({ showPurchaseButton = true }) {
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState(initialProducts);

  const handleRemove = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleQuantityChange = (productId, delta) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          : product
      )
    );
  };

  const calculateTotalPrice = () => {
    return products.reduce(
      (total, product) =>
        total + parseFloat(product.price.slice(1)) * product.quantity,
      0
    );
  };

  const formatPrice = (price) => {
    return `$${Math.round(price)}`;
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-semibold text-gray-900">
                      장바구니
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {products.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={product.imageAlt}
                                src={product.imageSrc}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>{product.name}</a>
                                  </h3>
                                  <p className="ml-4">{product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.size}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleQuantityChange(product.id, -1);
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <MinusIcon className="h-5 w-5" />
                                  </button>
                                  <p className="mx-2 text-gray-500">
                                    {product.quantity} 개
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleQuantityChange(product.id, 1);
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    <PlusIcon className="h-5 w-5" />
                                  </button>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleRemove(product.id);
                                    }}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 총 가격 */}
                <div className="border-t border-gray-200 py-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p className="ml-4">총 가격</p>
                    <p className="mr-4">{formatPrice(calculateTotalPrice())}</p>
                  </div>
                  {showPurchaseButton && (
                    <div className="mt-6 flex justify-center">
                      <Link to={"/PayPage"}>
                        <button
                          type="button"
                          className="flex items-center justify-center rounded-md border border-transparent bg-green-300 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-400"
                        >
                          구매하기
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
