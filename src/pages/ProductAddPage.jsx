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
  const [fetchToken, setFetchToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    const email = getEmailFromToken(token);

    if (!email) {
      setErrors("이메일을 가져올 수 없습니다.");
      return;
    }

    setSeller(email);
    setFetchToken(token);
  }, []);

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

  const cancelHandle = () => setCancelClicked(true);

  const addHandle = async (event) => {
    event.preventDefault();
    // setAddClicked(true);

    const formData = new FormData();

    // 이미지 파일 추가
    images.forEach((image) => {
      formData.append("images", image); // 이미지 파일 추가
    });

    // 제품 데이터를 생성
    const productData = createProductData(formData);
    formData.append("product", JSON.stringify(productData));

    try {
      const response = await axios.post("/api/sell/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: fetchToken,
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

  const createProductData = (formData) => {
    const filteredDescriptions = descriptions
      .filter((desc) => desc && desc.trim() !== "")
      .map((desc) => ({ description: desc }));

    return {
      seller,
      category: formData.get("category"),
      productName: formData.get("productName"),
      productPrice: Number(formData.get("productPrice")),
      descriptions: filteredDescriptions,
      endtime: formData.get("endtime"),
      createdAt: formData.get("createdAt"),
      stockDtos: buildStockData(formData),
    };
  };

  const buildStockData = (formData) => {
    const stockData = SIZES.map((size) => {
      const quantity = formData.get(`${size.size}_quantity`);
      return {
        size: size.size, // 사이즈
        sizeStock: quantity ? Number(quantity) : 0, // 재고 수량
      };
    }).filter(Boolean);

    return stockData;
  };

  return (
    <>
      <AddProductForm
        onSubmit={addHandle}
        onImagesChange={setImages}
        onDescriptionsChange={setDescriptions}
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
