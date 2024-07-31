import { useContext, useState } from "react";
import { SIZES } from "../constants/AddProducts";
import AddProductForm from "../components/add-product/AddProductForm";
import AddProductModal from "../components/add-product/AddProductModal";
import axios from "axios";

const ProductAddPage = () => {
  // const { user } = useContext(UserContext);
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  // const [errors, setErrors] = useState(null);

  const cancelHandle = () => setCancelClicked(true);

  const addHandle = async (event) => {
    event.preventDefault();
    setAddClicked(true);

    const formData = new FormData(event.target);
    const data = createProductData(formData);

    // if (user && user.id) {
    //   data.append(`seller`, user.id);
    // } else {
    //   console.error("로그인된 유저의 ID가 없습니다.");
    //   setErrors({ api: "로그인된 유저의 ID가 필요합니다." });
    //   return;
    // }

    try {
      const response = await axios.post("/api/sell/save", data);
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

    console.log(data);
  };

  const createProductData = (formData) => {
    const imageUrls = images.filter(
      (url) => typeof url === "string" && url.trim() !== ""
    );
    const filteredDescriptions = descriptions
      .filter((desc) => desc && desc.trim() !== "")
      .map((desc) => ({ description: desc }));

    return {
      // seller: user.id,
      seller: "test@gmail.com",
      category: formData.get("category"),
      productName: formData.get("productName"),
      productPrice: Number(formData.get("productPrice")),
      descriptions: filteredDescriptions,
      productImage: imageUrls,
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
      {/* {errors && <div>{errors.api}</div>} */}
    </>
  );
};

export default ProductAddPage;
