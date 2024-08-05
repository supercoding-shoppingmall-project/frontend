"use client";

import { useEffect, useState } from "react";
import QuantityModal from "./QuantityModal";
import FormatToKRW from "../../utils/FormatToKRW";
import ProductsList from "./ProductsList";
import axios from "axios";

export default function MyProducts({ sortOption }) {
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

  const sortProducts = (products) => {
    switch (sortOption) {
      case "판매마감 임박순":
        return [...products].sort(
          (a, b) => new Date(a.endtime) - new Date(b.endtime)
        );
      case "판매마감 여유순":
        return [...products].sort(
          (a, b) => new Date(b.endtime) - new Date(a.endtime)
        );
      case "높은 가격순":
        return [...products].sort((a, b) => b.productPrice - a.productPrice);
      case "낮은 가격순":
        return [...products].sort((a, b) => a.productPrice - b.productPrice);
      default:
        return products; // 기본 정렬
    }
  };

  const sortData = sortProducts(data);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-7xl">
          <ProductsList
            products={sortData.filter(
              (product) => new Date(product.endtime) > new Date()
            )}
            title="판매 중"
          />
          <ProductsList
            products={sortData.filter(
              (product) => new Date(product.endtime) <= new Date()
            )}
            title="판매 종료"
          />
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
