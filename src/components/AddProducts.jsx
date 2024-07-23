import { PhotoIcon } from "@heroicons/react/24/solid";

export default function AddProducts() {
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            상품 정보
          </h2>

          {/* 이미지 등록 */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-2">
              <label
                htmlFor="photo"
                className="block text-sm font-bold leading-6 text-gray-900"
              >
                이미지 등록
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto h-12 w-12 text-gray-300"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>이미지 등록하기</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                      />
                    </label>
                    <p className="pl-1">또는 드래그 앤 드롭</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    10MB 이하 PNG, JPG, GIF
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* 카테고리 선택 */}
            <div className="sm:col-span-2">
              <label
                htmlFor="size"
                className="block text-sm font-bold leading-6 text-gray-900"
              >
                카테고리
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  autoComplete="category-name"
                  className="block w-full rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 focus-visible:outline-none"
                >
                  <option>샌들 & 슬리퍼</option>
                  <option>러닝</option>
                  <option>축구</option>
                  <option>농구</option>
                  <option>트레이닝 & 짐</option>
                  <option>골프</option>
                  <option>테니스</option>
                  <option>기타</option>
                </select>
              </div>
            </div>

            {/* 상품명 */}
            <div className="sm:col-span-3">
              <label
                htmlFor="productName"
                className="block text-sm font-bold leading-6 text-gray-900"
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
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* 사이즈 선택 */}
            <div className="sm:col-span-2">
              <label
                htmlFor="size"
                className="block text-sm font-bold leading-6 text-gray-900"
              >
                사이즈
              </label>
              <div className="mt-2">
                <select
                  id="size"
                  name="size"
                  autoComplete="size-name"
                  className="block w-full rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 focus-visible:outline-none"
                >
                  <option>240</option>
                  <option>245</option>
                  <option>250</option>
                  <option>255</option>
                  <option>260</option>
                  <option>265</option>
                  <option>270</option>
                  <option>280</option>
                  <option>285</option>
                  <option>290</option>
                  <option>295</option>
                  <option>300</option>
                  <option>305</option>
                  <option>310</option>
                </select>
              </div>
            </div>

            {/* 가격 */}
            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-bold leading-6 text-gray-900"
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
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* 개수 */}
            <div className="sm:col-span-2">
              <label
                htmlFor="quantity"
                className="block text-sm font-bold leading-6 text-gray-900"
              >
                개수
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    autoComplete="quantity"
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 날짜 */}
            <div className="sm:col-span-2">
              <label
                htmlFor="closingDate"
                className="block text-sm font-bold leading-6 text-gray-900"
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
                    className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 focus-visible:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="desc"
                className="block font-semibold leading-7 text-gray-900"
              >
                상품 설명
              </label>
              <div className="mt-2">
                <textarea
                  id="desc"
                  name="desc"
                  placeholder="상품 설명을 최대한 자세하게 적어주세요"
                  rows={3}
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus-visible:outline-none"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
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
  );
}
