import React, { useState } from "react";
import axios from "axios";
import Alert from "./Alert";

const AddToCartButton = ({
  productId,
  selectedSize,
  quantity,
  userId,
  productImageUrl,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const addToCartHandle = async () => {
    const cartItem = {
      id: productId,
      size: selectedSize,
      quantity: quantity,
      productImageUrl: productImageUrl,
    };

    if (userId) {
      try {
        await axios.post(`/api/cart/${userId}`, cartItem, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        });
        console.log("Added to cart:", cartItem);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      console.error("User ID is not available");
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <div>
      <button
        type="button"
        onClick={addToCartHandle}
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        장바구니에 담기
      </button>
      {showAlert && <Alert />}
    </div>
  );
};

export default AddToCartButton;