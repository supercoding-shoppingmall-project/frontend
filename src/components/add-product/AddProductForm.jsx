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

    const data = createProductData();

    try {
      // JSON.stringify로 데이터를 문자열로 변환하여 전송
      const response = await axios.post(
        "/api/sell/save",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json", // JSON 형식으로 전송
          },
        }
      );
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
    const imageUrls = images.filter(
      (url) => typeof url === "string" && url.trim() !== ""
    );
    const filteredDescriptions = descriptions
      .filter((desc) => desc && desc.trim() !== "")
      .map((desc) => ({ description: desc }));

    return {
      seller: seller,
      category: category,
      productName: productName,
      productPrice: Number(productPrice),
      descriptions: filteredDescriptions,
      productImage: imageUrls,
      endtime: endtime,
      createdAt: createdAt,
      stockDtos: buildStockData(),
    };
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
