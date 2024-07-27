"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function AddProductsModal({
  cancelClicked,
  setCancelClicked,
  addClicked,
  setAddClicked,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cancelClicked || addClicked) {
      setOpen(true);
    }
  }, [cancelClicked, addClicked]);

  const closeHandle = () => {
    setOpen(false);
    setCancelClicked(false);
    setAddClicked(false);
  };

  const modalContents = [
    {
      isTrue: cancelClicked,
      icon: (
        <ExclamationTriangleIcon
          aria-hidden="true"
          className="h-6 w-6 text-red-600"
        />
      ),
      title: "입력을 취소하시겠습니까?",
      content: "변경사항이 저장되지 않습니다.",
      buttonLabel: ["취소", "페이지 나가기"],
      buttonAction: [
        closeHandle,
        () => {
          document.getElementById("addProductsForm").reset();
          navigate("/sell");
        },
      ],
      buttonStyles: [
        "inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto",
        "mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mt-0 sm:w-auto sm:ml-3",
      ],
    },
    {
      isTrue: addClicked,
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
      buttonAction: [
        () => {
          navigate("/sell");
        },
      ],
      buttonStyles: [
        "mt-3 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:mt-0 sm:w-auto sm:ml-3",
      ],
    },
  ];

  return (
    <Dialog open={open} onClose={closeHandle} className="relative z-10">
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
            {modalContents
              .filter((modalContent) => modalContent.isTrue)
              .map((modalContent, index) => (
                <div key={index}>
                  <section className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-center">
                      {modalContent.icon}
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {modalContent.title}
                        </DialogTitle>
                      </div>
                    </div>
                  </section>
                  <section className="bg-white px-4 pb-4 pt-5 sm:p-6">
                    {modalContent.content && <div>{modalContent.content}</div>}
                    <div className="pt-3 sm:flex sm:flex-row sm:justify-end">
                      {modalContent.buttonLabel.map((label, buttonIndex) => (
                        <button
                          type="button"
                          data-autofocus
                          className={modalContent.buttonStyles[buttonIndex]}
                          key={buttonIndex}
                          onClick={modalContent.buttonAction[buttonIndex]}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              ))}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
