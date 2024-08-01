"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import SizeQuantity from "../add-product/SizeQuantity";

export default function QuantityModal({
  isClicked,
  setIsClicked,
  sizes,
  productName,
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [quantityData, setQuantityData] = useState({});

  useEffect(() => {
    if (isClicked) {
      setOpen(true);
    }
  }, [isClicked]);

  const quantityChangeHandle = (size, quantity) => {
    setQuantityData((prev) => ({ ...prev, [size]: quantity }));
    console.log("현재 재고 수량 데이터:", {
      ...quantityData,
      [size]: quantity,
    });
  };

  const submitHandle = async (event) => {
    event.preventDefault(); // 기본 폼 제출 방지
    try {
      const token = localStorage.getItem("Authorization");
      await axios.post(`/api/sell/update/${productName}`, quantityData, {
        headers: {
          Authorization: token,
        },
      });
      // 성공적으로 업데이트된 후 모달 닫기
      if (response.status === 200) {
        setOpen(false);
        setIsClicked(false);
        alert("재고 수량이 변경되었습니다.");
      }
    } catch (error) {
      console.error("재고 수량 변경 중 오류 발생:", error);
      setError("재고 수량 변경에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        setIsClicked(false);
      }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <section className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-center">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <PencilIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    재고 수량 변경
                  </DialogTitle>
                </div>
              </div>
            </section>
            <section className="bg-white px-4 pb-4 pt-5 sm:p-6">
              <form onSubmit={submitHandle}>
                {/* 사이즈별 재고 변경 */}
                <fieldset aria-label="Choose a size">
                  <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 lg:grid-cols-4">
                    <SizeQuantity
                      sizes={sizes}
                      onQuantityChange={quantityChangeHandle}
                    />
                  </div>
                </fieldset>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:justify-end sm:px-6">
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => {
                      setOpen(false);
                      setIsClicked(false);
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mt-0 sm:w-auto sm:ml-3"
                  >
                    변경
                  </button>
                </div>
              </form>
              {error && <div className="text-red-500">{error}</div>}
            </section>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
