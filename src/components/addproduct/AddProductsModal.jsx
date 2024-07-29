"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { useNavigate } from "react-router-dom";
import { MODAL_DATA } from "./AddData";

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

  const MODAL_CONTENTS = MODAL_DATA.map((data, index) => {
    let isTrue;
    let buttonAction;

    if (index === 0) {
      isTrue = cancelClicked;
      buttonAction = [
        closeHandle,
        () => {
          document.getElementById("addProductsForm").reset();
          navigate("/sell");
        },
      ];
    } else {
      isTrue = addClicked;
      buttonAction = [
        () => {
          navigate("/sell");
        },
      ];
    }

    return {
      ...data,
      isTrue,
      buttonAction,
    };
  });

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
            {MODAL_CONTENTS.filter((modalContent) => modalContent.isTrue).map(
              (modalContent, index) => (
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
              )
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
