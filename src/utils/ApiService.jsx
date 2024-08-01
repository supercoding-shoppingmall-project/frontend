// apiService.js

import axios from "axios";

const API_BASE_URL = "/api"; // API의 기본 URL 설정

// DELETE 요청을 처리하는 함수
export const deleteCartItem = async (userId, productId, size, token) => {
  try {
    await axios.delete(`${API_BASE_URL}/cart/${userId}/item`, {
      headers: {
        Authorization: token,
      },
      data: { productId, size },
    });
  } catch (error) {
    console.error("Failed to remove item from cart", error);
    throw error;
  }
};
