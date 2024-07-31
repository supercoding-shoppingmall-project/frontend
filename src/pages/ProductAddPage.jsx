import { useState } from "react";
import { SIZES } from "../constants/AddProducts";
import AddProductForm from "../components/add-product/AddProductForm";
import AddProductModal from "../components/add-product/AddProductModal";

const ProductAddPage = () => {
  const [images, setImages] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [cancelClicked, setCancelClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);

  const cancelHandle = () => setCancelClicked(true);

  const addHandle = async (event) => {
    event.preventDefault();
    setAddClicked(true);

    const formData = new FormData(event.target);
    const data = createProductData(formData);

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
      seller: "abcdefg@gmail.com",
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
    </>
  );
};

export default ProductAddPage;
