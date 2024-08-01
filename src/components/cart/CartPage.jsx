import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../contexts/CartContext";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import FormatToKRW from "../../utils/FormatToKRW";
import { Link } from "react-router-dom";

export default function CartPage({ showPurchaseButton = true }) {
  const { cart, setCart, removeFromCart, updateQuantity } = useCart();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchedUserId = localStorage.getItem("userId");
    setUserId(fetchedUserId);

    if (fetchedUserId) {
      axios
        .get(`/api/cart/${fetchedUserId}`)
        .then((response) => {
          setCart(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch cart data", error);
        });
    }
  }, [setCart]);

  const quantityChangeHandle = (productId, size, delta) => {
    const product = cart.find(
      (item) => item.id === productId && item.size === size
    );
    if (product) {
      const newQuantity = Math.max(1, product.quantity + delta);
      updateQuantity(productId, size, newQuantity);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      return total + price * product.quantity;
    }, 0);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">장바구니</h2>
      <div className="mb-6">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cart.map((product) => (
            <li key={`${product.id}-${product.size}`} className="flex py-6">
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
                  <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        quantityChangeHandle(product.id, product.size, -1);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    <p className="mx-2 text-gray-500">{product.quantity} 개</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        quantityChangeHandle(product.id, product.size, 1);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id, product.size)}
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
      <div className="border-t border-gray-200 py-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>총 가격</p>
          <p>{FormatToKRW(calculateTotalPrice())}</p>
        </div>
        {showPurchaseButton && (
          <div className="mt-6 flex justify-center">
            <Link to={"/pay"}>
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
  );
}
