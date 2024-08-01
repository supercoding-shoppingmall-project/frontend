// className 데이터
export const STYLE = {
  addProductsForm:
    "mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8",
  productInfo: "border-b border-gray-900/10 pb-12",
  formTitle:
    "text-2xl font-semibold leading-7 text-gray-900 text-white bg-indigo-600 rounded-md p-3",
  column: "mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6",
  sizeQuantityTitle: "block font-bold leading-6 text-gray-900 sm:col-span-1",
  sizeQuantity:
    "mt-2 grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4 lg:grid-cols-8",
};

// 카테고리 데이터
export const CATEGORIES = [
  { id: "category1", value: "샌들 & 슬리퍼" },
  { id: "category2", value: "러닝" },
  { id: "category3", value: "축구" },
  { id: "category4", value: "농구" },
  { id: "category5", value: "트레이닝 & 짐" },
  { id: "category6", value: "골프" },
  { id: "category7", value: "테니스" },
  { id: "category8", value: "기타" },
];

// 사이즈 및 재고 데이터
export const SIZES = [
  { id: "size240", size: 240 },
  { id: "size250", size: 250 },
  { id: "size260", size: 260 },
  { id: "size270", size: 270 },
  { id: "size280", size: 280 },
  { id: "size290", size: 290 },
  { id: "size300", size: 300 },
  { id: "size310", size: 310 },
];

// 상품등록 모달 데이터
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export const MODAL_DATA = [
  {
    icon: (
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        <ExclamationTriangleIcon
          aria-hidden="true"
          className="h-6 w-6 text-red-600"
        />
      </div>
    ),
    title: "입력을 취소하시겠습니까?",
    content: "변경사항이 저장되지 않습니다.",
    buttonLabel: ["취소", "페이지 나가기"],
    buttonStyles: [
      "inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto",
      "mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mt-0 sm:w-auto sm:ml-3",
    ],
  },
  {
    icon: (
      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
        <CheckCircleIcon
          aria-hidden="true"
          className="h-6 w-6 text-indigo-600"
        />
      </div>
    ),
    title: "상품 등록이 완료되었습니다",
    buttonLabel: ["확인"],
    buttonStyles: [
      "mt-3 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:mt-0 sm:w-auto sm:ml-3",
    ],
  },
];
