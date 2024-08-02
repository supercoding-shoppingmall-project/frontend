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
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

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

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    setToken(token);
    const userEmail = getEmailFromToken(token);
    setEmail(userEmail);
  }, []);

  const cancelHandle = () => setCancelClicked(true);

  const addHandle = async (event) => {
    event.preventDefault();

    if (!email) {
      setErrors("이메일을 가져올 수 없습니다.");
      return;
    }

    const formData = new FormData();

    images.forEach((image) => {
      formData.append("images", image);
    });

    const productData = createProductData(event.target);

    formData.append("product", JSON.stringify(productData));

    try {
      const response = await axios.post("/api/sell/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      console.log("등록하기 성공:", response.data);
      setAddClicked(true);
    } catch (error) {
      apiErrorHandle(error);
    }
  };

  const apiErrorHandle = (error) => {
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
  };

  const createProductData = (target) => {
    const filteredDescriptions = descriptions
      .filter((desc) => desc && desc.trim() !== "")
      .map((desc) => ({ description: desc }));

    const today = new Date().toISOString().split("T")[0];

    return {
      seller: email,
      category: target.category.value,
      productName: target.productName.value,
      productPrice: Number(target.productPrice.value),
      descriptions: filteredDescriptions,
      endtime: target.endtime.value,
      createdAt: today,
      stockDtos: buildStockData(target),
    };
  };

  const buildStockData = (target) => {
    const stockData = SIZES.map((size) => {
      const quantity = target[`${size.size}_quantity`].value;
      return quantity
        ? {
            size: size.size,
            sizeStock: Number(quantity),
          }
        : null;
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
