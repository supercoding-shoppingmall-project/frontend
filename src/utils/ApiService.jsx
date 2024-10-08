import axios from "axios";

const API_BASE_URL = "/api"; // API의 기본 URL 설정

// DELETE 요청을 처리하는 함수
export const deleteCartItem = async (id, userId) => {
  const token = localStorage.getItem("Authorization");
  try {
    await axios.delete(`${API_BASE_URL}/cart/${userId}/items/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.error("Failed to remove item from cart", error);
    throw error;
  }
};
