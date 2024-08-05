"use client";

import { useEffect, useState } from "react";
import QuantityModal from "./QuantityModal";
import ProductsList from "./ProductsList";
import axios from "axios";
import { getEmailFromToken } from "../../utils/EmailToken";
import { errorMessageHandler } from "../../utils/ErrorMessageHandler";
import { filterProducts, sortProducts } from "../../utils/SortAndFilter";

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
      const errorMessage = errorMessageHandler(error);
      setError(errorMessage);
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
    return <div className="text-center py-20">{error}</div>;
  }

  if (!data) {
    return <div className="text-center py-20">데이터가 존재하지 않습니다.</div>;
  }

  

  const sortData = sortProducts(data, sortOption);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          <ProductsList
            products={filterProducts(sortData, true)}
            title="판매 중"
            btnClickHandle={btnClickHandle}
          />
          <ProductsList
            products={filterProducts(sortData, false)}
            title="판매 종료"
            btnClickHandle={btnClickHandle}
            className="mt-20"
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
