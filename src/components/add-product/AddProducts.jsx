import { useState } from "react";
import AddImages from "./AddImages";
import SizeQuantity from "./SizeQuantity";
import ProductDescription from "./ProductDescription";
import AddProductsModal from "./AddProductsModal";
import { CATEGORIES, SIZES } from "../../constants/AddProducts";
import { useInputValue } from "../../hooks/useInputValue";

export default function AddProducts() {
  // 상품 정보 state
  const [images, setImages] = useState([]);
  const [category, setCategory] = useInputValue("");
  const [productName, setProductName] = useInputValue("");
  const [productPrice, setProductPrice] = useInputValue("");
  const [endtime, setendtime] = useInputValue("");
  const [descriptions, setDescriptions] = useState([]);

  // 버튼 클릭여부
  const [cancelClicked, setCancelClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);

  // 판매 등록 날짜 (오늘)
  const today = new Date().toISOString().split("T")[0];

  const cancelHandle = () => {
    setCancelClicked(true);
  };

  const addHandle = async (event) => {
    event.preventDefault();
    setAddClicked(true);

    const addProductsFormData = new FormData(event.target);

    const imageUrls = images.filter(
      (url) => typeof url === "string" && url.trim() !== ""
    );
    const filteredDescriptions = descriptions.filter(
      (desc) => desc && desc.trim() !== ""
    );

    const data = {
      seller: "abcdefg@gmail.com",
      category: {
        categoryName: addProductsFormData.get("category"),
      },
      productName: addProductsFormData.get("productName"),
      productPrice: Number(addProductsFormData.get("productPrice")),
      productDescription: filteredDescriptions,
      productImage: imageUrls,
      endtime: addProductsFormData.get("endtime"),
      createdAt: addProductsFormData.get("createdAt"),
      stockDtos: [],
    };

    SIZES.forEach((size) => {
      const quantity = addProductsFormData.get(`${size.size}_quantity`);
      if (quantity) {
        data.stockDtos.push({
          size: size.size,
          sizeStock: Number(quantity),
        });
      }
    });

    console.log(data);
  };

  return (
    <>
      <form
        id="addProductsForm"
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
        onSubmit={addHandle}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900 text-white bg-indigo-600 rounded-md p-3">
              상품 정보
            </h2>

            {/* 이미지 등록 */}
            <AddImages onImagesChange={setImages} />

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* 카테고리 선택 */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block font-bold leading-6 text-gray-900"
                >
                  카테고리
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus-visible:outline-none h-10"
                    value={category}
                    onChange={setCategory}
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category.id} value={category.value}>
                        {category.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 상품명 */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="productName"
                  className="block font-bold leading-6 text-gray-900"
                >
                  상품명
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      id="productName"
                      name="productName"
                      type="text"
                      autoComplete="productName"
                      className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none h-10"
                      required
                      value={productName}
                      onChange={setProductName}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 사이즈 선택 */}
            <div className="mt-10">
              <div className="block font-bold leading-6 text-gray-900 sm:col-span-1">
                사이즈 및 개수
              </div>
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4 lg:grid-cols-8">
                <SizeQuantity sizes={SIZES} />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* 가격 */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="productPrice"
                  className="block font-bold leading-6 text-gray-900"
                >
                  가격
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="productPrice"
                      name="productPrice"
                      type="number"
                      autoComplete="productPrice"
                      className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none h-10"
                      required
                      value={productPrice}
                      onChange={setProductPrice}
                    />
                  </div>
                </div>
              </div>

              {/* 판매 마감 날짜 */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="endtime"
                  className="block font-bold leading-6 text-gray-900"
                >
                  판매 마감
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="endtime"
                      name="endtime"
                      type="date"
                      min={today}
                      autoComplete="endtime"
                      className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none h-10"
                      required
                      value={endtime}
                      onChange={setendtime}
                    />
                  </div>
                </div>
              </div>

              {/* 등록 날짜 */}
              <div className="sm:col-span-2 hidden">
                <label
                  htmlFor="createdAt"
                  className="block font-bold leading-6 text-gray-900"
                >
                  판매 등록일
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                    <input
                      id="createdAt"
                      type="text"
                      name="createdAt"
                      className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 sm:text-sm sm:leading-6 h-10"
                      value={today}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 상품 상세 설명 */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <ProductDescription onDescriptionsChange={setDescriptions} />
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={cancelHandle}
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            상품 등록
          </button>
        </div>
      </form>

      {/* 버튼 클릭 모달 */}
      <AddProductsModal
        cancelClicked={cancelClicked}
        setCancelClicked={setCancelClicked}
        addClicked={addClicked}
        setAddClicked={setAddClicked}
      />
    </>
  );
}
