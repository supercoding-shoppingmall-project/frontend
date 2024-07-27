import { useState } from "react";
import AddImages from "./AddImages";
import SizeQuantity from "./SizeQuantity";
import ProductDescription from "./ProductDescription";
import AddProductsModal from "./AddProductsModal";

export default function AddProducts() {
  const [cancelClicked, setCancelClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);

  const cancelHandle = () => {
    setCancelClicked(true);
  };

  const addHandle = (event) => {
    event.preventDefault();
    setAddClicked(true);
  };

  const categories = [
    { id: "category1", value: "샌들 & 슬리퍼" },
    { id: "category2", value: "러닝" },
    { id: "category3", value: "축구" },
    { id: "category4", value: "농구" },
    { id: "category5", value: "트레이닝 & 짐" },
    { id: "category6", value: "골프" },
    { id: "category7", value: "테니스" },
    { id: "category8", value: "기타" },
  ];
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
            <AddImages />

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
                  >
                    {categories.map((category) => (
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
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="block font-bold leading-6 text-gray-900 sm:col-span-1">
                사이즈 및 개수
              </div>
              <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4 lg:grid-cols-8">
                {/* 사이즈 선택 */}
                <SizeQuantity />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* 가격 */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block font-bold leading-6 text-gray-900"
                >
                  가격
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="price"
                      name="price"
                      type="number"
                      autoComplete="price"
                      className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none h-10"
                    />
                  </div>
                </div>
              </div>

              {/* 날짜 */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="closingDate"
                  className="block font-bold leading-6 text-gray-900"
                >
                  판매 마감
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="closingDate"
                      name="closingDate"
                      type="date"
                      autoComplete="closingDate"
                      className="block w-full flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none h-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 상품 상세 설명 */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <ProductDescription />
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
