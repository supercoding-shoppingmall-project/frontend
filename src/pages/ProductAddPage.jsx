import { useEffect, useState } from "react";
import { SIZES } from "../constants/AddProducts";
import AddProductForm from "../components/add-product/AddProductForm";
import AddProductModal from "../components/add-product/AddProductModal";
import axios from "axios";

const ProductAddPage = () => {
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [errors, setErrors] = useState(null);
  const [seller, setSeller] = useState(null);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [endtime, setEndtime] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    const authEmail = localStorage.getItem("Authorization");
    if (authEmail) {
      setSeller(authEmail);
    }
  }, []);

  const cancelHandle = () => setCancelClicked(true);

  const addHandle = async (event) => {
    event.preventDefault();
    setAddClicked(true);

    const formData = createProductData();

    try {
      const response = await axios.post("/api/sell/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // multipart/form-data로 전송
        },
      });
      console.log("등록하기 성공:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("등록하기 오류:", error.response.data);
        setErrors({
          api: `등록하기 오류: ${
            error.response.data.message || "알 수 없는 오류입니다."
          }`,
        });
      } else if (error.request) {
        console.error(
          "등록하기 오류: 요청이 이루어졌으나 응답이 없습니다.",
          error.request
        );
        setErrors({ api: "서버 응답을 받을 수 없습니다." });
      } else {
        console.error("등록하기 오류:", error.message);
        setErrors({ api: "등록하기 중 오류가 발생했습니다." });
      }
    }
  };

  const createProductData = () => {
    const formData = new FormData();

    const imageUrls = images.filter(
      (url) => typeof url === "string" && url.trim() !== ""
    );
    const filteredDescriptions = descriptions
      .filter((desc) => desc && desc.trim() !== "")
      .map((desc) => ({ description: desc }));

    formData.append("seller", seller);
    formData.append("category", category);
    formData.append("productName", productName);
    formData.append("productPrice", Number(productPrice));
    formData.append("endtime", endtime);
    formData.append("createdAt", createdAt);

    // descriptions와 images를 FormData에 추가
    filteredDescriptions.forEach((desc) => {
      formData.append("descriptions", JSON.stringify(desc));
    });
    imageUrls.forEach((url) => {
      formData.append("productImage", url); // 각 이미지 URL 추가
    });

    // 재고 데이터 추가
    buildStockData().forEach((stock) => {
      formData.append("stockDtos", JSON.stringify(stock));
    });

    return formData;
  };

  const buildStockData = () => {
    return SIZES.map((size) => {
      const quantity = size.quantity; // size 객체에 quantity가 있다고 가정
      return quantity
        ? {
            size: size.size,
            sizeStock: Number(quantity),
          }
        : null;
    }).filter(Boolean);
  };

  return (
    <>
      <AddProductForm
        onSubmit={addHandle}
        onImagesChange={setImages}
        onDescriptionsChange={setDescriptions}
        setProductName={setProductName}
        setCategory={setCategory}
        setProductPrice={setProductPrice}
        setEndtime={setEndtime}
        setCreatedAt={setCreatedAt}
        cancelHandle={cancelHandle}
      />
      <AddProductModal
        cancelClicked={cancelClicked}
        setCancelClicked={setCancelClicked}
        addClicked={addClicked}
        setAddClicked={setAddClicked}
      />
      {errors && <div>{errors.api}</div>}
    </>
  );
};

export default ProductAddPage;
