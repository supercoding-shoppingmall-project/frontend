"use client";

import { useEffect, useState } from "react";
import QuantityModal from "./QuantityModal";
import FormatToKRW from "../../utils/FormatToKRW";
import axios from "axios";

export default function MyProducts() {
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentStockDtos, setCurrentStockDtos] = useState("");

  const btnClickHandle = (productName, stockDtos) => {
    setIsClicked(true);
    setCurrentProduct(productName);
    setCurrentStockDtos(stockDtos);
  };

  const getEmailFromToken = (token) => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.email;
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
        return null;
      }
    }
    return null;
  };

  const fetchData = async () => {
    const token = localStorage.getItem("Authorization");
    const email = getEmailFromToken(token);

    if (!email) {
      setError("이메일을 가져올 수 없습니다.");
      return;
    }

    try {
      const encodedEmail = encodeURIComponent(email);
      const response = await axios.get(`/api/sell/${encodedEmail}`, {
        headers: {
          Authorization: token,
        },
      });
      setData(response.data);
    } catch (error) {
      if (error.response) {
        console.error("판매 물품 조회 중 오류 발생:", error.response.data);
        console.error("상태 코드:", error.response.status);
        console.error("헤더:", error.response.headers);

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
        console.error("응답을 받지 못했습니다:", error.request);
      } else {
        console.error("요청 설정 중 오류 발생:", error.message);
      }
    }
  };

  const refreshProducts = () => {
    setData(null);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>데이터가 존재하지 않습니다.</div>;
  }

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-7xl">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
            {data && data.length > 0 ? (
              data.map((product, index) => (
                <div
                  key={index}
                  className="group p-3 border border-solid border-slate-300 rounded"
                >
                  <div className="mt-1 text-sm font-medium text-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">
                      {product.productName}
                    </h3>
                    <div>{product.endtime}</div>
                  </div>
                  <div className="mt-1 text-sm font-medium text-gray-700 flex justify-between items-center">
                    <div>{FormatToKRW(product.productPrice)}</div>
                    <button
                      onClick={() =>
                        btnClickHandle(product.productName, product.stockDtos)
                      }
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
        productName={currentProduct}
        stockDtos={currentStockDtos}
        refreshProducts={refreshProducts}
      />
    </>
  );
}
