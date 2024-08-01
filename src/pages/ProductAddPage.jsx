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
  const [retrievedToken, setRetrievedToken] = useState(null);

  const getEmailFromToken = (token) => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.email; // 이메일 반환
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
        return null; // 이메일이 없을 경우 null 반환
      }
    }
    return null; // 이메일이 없을 경우 null 반환
  };

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    setRetrievedToken(token);
    const email = getEmailFromToken(retrievedToken);

    if (email) {
      // 이메일이 유효할 경우 추가적인 로직을 여기에 작성
      console.log("사용자 이메일:", email);
    } else {
      console.log("유효하지 않은 토큰입니다.");
    }
  }, []);

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
    formData.append(
      "product",
      JSON.stringify(createProductData(formData, retrievedToken))
    );

    try {
      const response = await axios.post("/api/sell/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: retrievedToken,
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

  const createProductData = (formData, token) => {
    const filteredDescriptions = descriptions
      .filter((desc) => desc && desc.trim() !== "")
      .map((desc) => ({ description: desc }));

    return {
      seller: token, // token을 seller로 사용
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
    return SIZES.map((size) => {
      const quantity = formData.get(`${size.size}_quantity`);
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
