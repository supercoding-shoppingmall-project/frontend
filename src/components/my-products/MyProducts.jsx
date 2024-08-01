"use client";

import { useEffect, useState } from "react";
import QuantityModal from "./QuantityModal";
import { PRODUCTS } from "../../constants/MyProducts";
import { SIZES } from "../../constants/AddProducts";
import axios from "axios";

export default function MyProducts() {
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState(null);
  const email = getEmailFromToken();

  const btnClickHandle = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // 로컬 스토리지에서 토큰 가져오기
        const response = await axios.get(`/api/sell/${email}`, {
          headers: {
            Authorization: token, // 직접 토큰을 헤더에 추가
          },
        });
        setData(response.data);
      } catch (error) {
        if (error.response) {
          // 서버가 응답을 했고, 상태 코드가 2xx가 아닌 경우
          console.error("판매 물품 조회 중 오류 발생:", error.response.data);
          console.error("상태 코드:", error.response.status);
          console.error("헤더:", error.response.headers);

          // 상태 코드에 따라 사용자에게 알림 처리
          if (error.response.status === 404) {
            console.error("판매 물품을 찾을 수 없습니다.");
          } else if (error.response.status === 401) {
            console.error("인증되지 않았습니다. 다시 로그인해 주세요.");
          } else if (error.response.status === 403) {
            console.error("접근이 거부되었습니다. 권한이 없습니다.");
          } else {
            console.error("판매 물품 조회 중 문제가 발생했습니다.");
          }
        } else if (error.request) {
          // 요청이 이루어졌지만 응답을 받지 못한 경우
          console.error("응답을 받지 못했습니다:", error.request);
        } else {
          // 오류를 발생시킨 요청 설정
          console.error("요청 설정 중 오류 발생:", error.message);
        }
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  const getEmailFromToken = () => {
    // JWT 토큰에서 이메일 추출 로직 구현
    const token = localStorage.getItem("Authorization");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // JWT의 페이로드를 디코드
      return payload.email; // 이메일 반환
    }
    return null; // 이메일이 없을 경우 null 반환
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-7xl">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
            {data && data.length > 0 ? (
              data.map((product) => (
                <div
                  key={product.id}
                  className="group p-3 border border-solid border-slate-300 rounded"
                >
                  <div className="mt-1 text-sm font-medium text-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">
                      {product.name}
                    </h3>
                    <div>{product.closingDate}</div>
                  </div>
                  <div className="mt-1 text-sm font-medium text-gray-700 flex justify-between items-center">
                    <div>{product.price} 원</div>
                    <button
                      onClick={btnClickHandle}
                      className="text-center bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm flex justify-around rounded"
                    >
                      재고 수량 변경
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                판매 물품이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 재고수량 변경 모달 */}
      <QuantityModal
        isClicked={isClicked}
        setIsClicked={setIsClicked}
        sizes={SIZES}
      />
    </>
  );
}
