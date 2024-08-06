import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";

const PurchaseList = () => {
  const [orders, setOrders] = useState([]);

  // 사용자의 ID를 가져오는 함수
  const getUserId = () => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.userId;
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = getUserId();
        const token = localStorage.getItem("Authorization");

        if (!userId || !token) {
          console.error("User ID or token is missing.");
          return;
        }

        const response = await axios.get(`/api/orders/user/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center bg-white text-base py-40 px-10 sm:px-80 border border-gray-300">
        <User />
        <div className="sm:w-2/3 sm:ml-10 w-full h-full flex flex-col border border-solid border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">구매 목록</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="mb-6 p-4 border border-gray-200 rounded-lg"
              >
                <h3 className="font-semibold">주문 번호: {order.id}</h3>
                <p>배송 주소: {order.shippingAddress}</p>
                <p>총 금액: {order.totalPrice.toLocaleString()}원</p>
                <p>주문 상태: {order.status}</p>
                <p>
                  주문 일자: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <h4 className="mt-4 font-semibold">주문 상품:</h4>
                <ul className="list-disc pl-5">
                  {order.orderItems.map((item) => (
                    <li key={item.id}>
                      상품 ID: {item.productId} - 수량: {item.quantity} - 가격:{" "}
                      {item.totalPrice.toLocaleString()}원
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>구매 목록이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PurchaseList;
