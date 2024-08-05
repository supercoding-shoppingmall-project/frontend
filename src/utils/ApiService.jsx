import axios from "axios";

const API_BASE_URL = "/api"; // API의 기본 URL 설정

// DELETE 요청을 처리하는 함수
export const deleteCartItem = async (productId, size, userId) => {
  const token = localStorage.getItem("Authorization");
  await axios.delete(`/api/cart/${userId}`, {
    headers: {
      Authorization: token,
    },
    data: {
      productId,
      size,
    },
  });
};
