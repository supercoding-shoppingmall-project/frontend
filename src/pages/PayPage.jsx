"use client";

import { useState } from "react";
import CartPage from "../components/CartPage";

export default function Example() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here, e.g., sending data to server

    // Reset input fields
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setBankName("");
    setAccountNumber("");
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="isolate bg-white px-6">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          주문 / 결제
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              이름
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              전화번호
            </label>
            <div className="mt-2.5">
              <input
                id="phone-number"
                name="phone-number"
                type="text"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              배송지{"   "}
              <span className="text-xs leading-6 text-gray-500">
                {"   "}도로명 주소 / 상세 주소 / 우편 번호
              </span>
            </label>
            <div className="mt-2.5">
              <input
                id="address"
                name="address"
                type="tel"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
        </div>
        <CartPage showPurchaseButton={false} />

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">
            결제 정보 (Payment Information)
          </h2>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              결제 수단 <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => handlePaymentMethodChange("card")}
                className={`py-2 px-4 border rounded-md ${
                  paymentMethod === "card"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                신용/직불 카드
              </button>
              <button
                type="button"
                onClick={() => handlePaymentMethodChange("bank")}
                className={`py-2 px-4 border rounded-md ${
                  paymentMethod === "bank"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                계좌이체
              </button>
            </div>
          </div>

          {paymentMethod === "card" && (
            <div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  카드 번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full p-2 border rounded-md border-red-500"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  만료일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full p-2 border rounded-md border-red-500"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  CVV 코드 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full p-2 border rounded-md border-red-500"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          )}

          {paymentMethod === "bank" && (
            <div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  은행 이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full p-2 border rounded-md border-red-500"
                  placeholder="은행 이름"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  계좌 번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full p-2 border rounded-md border-red-500"
                  placeholder="계좌 번호"
                  required
                />
              </div>
            </div>
          )}
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              className="w-1/4 rounded-md bg-blue-600 mb-10 px-3.5 py-2.5 text-center text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              결제
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
