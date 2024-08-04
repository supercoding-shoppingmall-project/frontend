// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import CartPage from "../components/cart/CartPage";
// import axios from "axios";

// export default function PayPage() {
//   const [paymentMethod, setPaymentMethod] = useState("card");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const cart = state?.cart || [];

//   const openModal = () => {
//     setIsModalOpen(true);
//     setIsPaymentComplete(false); // 모달이 열릴 때 결제 완료 상태를 초기화
//   };
//   const closeModal = () => setIsModalOpen(false);

//   // const confirmHandle = () => {
//   //   setIsPaymentComplete(true); // 결제 완료 상태로 변경

//   // };

//   const { state } = useLocation();
//   const userInfo = state?.userInfo || {
//     name: "",
//     phone: "",
//     address: "",
//   };

//   const submitHandle = (e) => {
//     e.preventDefault();
//     // Handle form submission logic, e.g., sending data to a server
//     console.log("Form submitted with:", {
//       cardNumber,
//       expiryDate,
//       cvv,
//       bankName,
//       accountNumber,
//     });

//     // Reset input fields
//     setCardNumber("");
//     setExpiryDate("");
//     setCvv("");
//     setBankName("");
//     setAccountNumber("");
//   };

//   const paymentMethodChangeHandle = (method) => {
//     setPaymentMethod(method);
//   };

//   const confirmPaymentHandle = () => {
//     cart.forEach(async (item) => {
//       try {
//         await axios.delete(`/api/cart/${item.id}`);
//       } catch (error) {
//         console.error("Failed to remove item from cart", error);
//       }
//     });
//     setIsPaymentComplete(true); // Indicate that payment is complete
//     setTimeout(() => {
//       closeModal(); // Close the modal
//     }, 1000); // Delay navigation to allow user to see the confirmation
//   };

//   return (
//     <div className="isolate bg-white px-6">
//       <div className="mx-auto max-w-2xl text-center">
//         <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//           주문 / 결제
//         </h2>
//       </div>
//       <form onSubmit={submitHandle} className="mx-auto mt-10 max-w-xl sm:mt-20">
//         <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-semibold leading-6 text-gray-900"
//             >
//               이름
//             </label>
//             <div className="mt-2.5">
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={userInfo.name}
//                 autoComplete="name"
//                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 required
//               />
//             </div>
//           </div>
//           <div>
//             <label
//               htmlFor="phone-number"
//               className="block text-sm font-semibold leading-6 text-gray-900"
//             >
//               전화번호
//             </label>
//             <div className="mt-2.5">
//               <input
//                 id="phone-number"
//                 name="phone-number"
//                 type="text"
//                 value={userInfo.phone}
//                 autoComplete="phone"
//                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 required
//               />
//             </div>
//           </div>
//           <div className="sm:col-span-2">
//             <label
//               htmlFor="address"
//               className="block text-sm font-semibold leading-6 text-gray-900"
//             >
//               배송지{"   "}
//               <span className="text-xs leading-6 text-gray-500">
//                 {"   "}도로명 주소 / 상세 주소 / 우편 번호
//               </span>
//             </label>
//             <div className="mt-2.5">
//               <input
//                 id="address"
//                 name="address"
//                 type="text"
//                 value={userInfo.address}
//                 autoComplete="address"
//                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 required
//               />
//             </div>
//           </div>
//         </div>
//         <CartPage showPurchaseButton={false} />
//         <div className="mt-10">
//           <h2 className="text-xl font-bold mb-4">
//             결제 정보 (Payment Information)
//           </h2>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               결제 수단 <span className="text-red-500">*</span>
//             </label>
//             <div className="flex space-x-4">
//               <button
//                 type="button"
//                 onClick={() => paymentMethodChangeHandle("card")}
//                 className={`py-2 px-4 border rounded-md ${
//                   paymentMethod === "card"
//                     ? "bg-blue-500 text-white"
//                     : "bg-white text-gray-700"
//                 }`}
//               >
//                 신용/직불 카드
//               </button>
//               <button
//                 type="button"
//                 onClick={() => paymentMethodChangeHandle("bank")}
//                 className={`py-2 px-4 border rounded-md ${
//                   paymentMethod === "bank"
//                     ? "bg-blue-500 text-white"
//                     : "bg-white text-gray-700"
//                 }`}
//               >
//                 계좌이체
//               </button>
//             </div>
//           </div>

//           {paymentMethod === "card" && (
//             <div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   카드 번호 <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={cardNumber}
//                   onChange={(e) => setCardNumber(e.target.value)}
//                   className="w-full p-2 border rounded-md border-gray-300"
//                   placeholder="1234 5678 9012 3456"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   만료일 <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={expiryDate}
//                   onChange={(e) => setExpiryDate(e.target.value)}
//                   className="w-full p-2 border rounded-md border-gray-300"
//                   placeholder="MM/YY"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   CVV 코드 <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={cvv}
//                   onChange={(e) => setCvv(e.target.value)}
//                   className="w-full p-2 border rounded-md border-gray-300"
//                   placeholder="123"
//                   required
//                 />
//               </div>
//             </div>
//           )}

//           {paymentMethod === "bank" && (
//             <div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   은행 이름 <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={bankName}
//                   onChange={(e) => setBankName(e.target.value)}
//                   className="w-full p-2 border rounded-md border-gray-300"
//                   placeholder="은행 이름"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   계좌 번호 <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   value={accountNumber}
//                   onChange={(e) => setAccountNumber(e.target.value)}
//                   className="w-full p-2 border rounded-md border-gray-300"
//                   placeholder="계좌 번호"
//                   required
//                 />
//               </div>
//             </div>
//           )}
//           <div className="mt-10 flex justify-center">
//             <button
//               type="submit"
//               onClick={openModal}
//               className="w-1/4 rounded-md bg-blue-600 mb-10 px-3.5 py-2.5 text-center text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
//             >
//               결제
//             </button>
//             {isModalOpen && (
//               <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
//                 <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//                   <h2 className="text-lg font-semibold mb-4">
//                     결제 하시겠습니까?
//                   </h2>
//                   <div className="flex justify-end space-x-4">
//                     <Link to={"/"}>
//                       <button
//                         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
//                         onClick={confirmPaymentHandle}
//                       >
//                         Yes
//                       </button>
//                     </Link>
//                     <button
//                       onClick={closeModal}
//                       className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200"
//                     >
//                       No
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CartPage from "../components/cart/CartPage";
import axios from "axios";

export default function PayPage() {
  const { state } = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isModalOpen, setIsModalOpen, setIsPaymentComplete] = useState(false);

  const cart = state?.cart || [];
  const userInfo = state?.userInfo || {
    name: "",
    phone: "",
    address: "",
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsPaymentComplete(false);
  };

  const closeModal = () => setIsModalOpen(false);

  const submitHandle = (e) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      cardNumber,
      expiryDate,
      cvv,
      bankName,
      accountNumber,
    });

    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setBankName("");
    setAccountNumber("");
  };

  const paymentMethodChangeHandle = (method) => {
    setPaymentMethod(method);
  };

  const confirmPaymentHandle = async () => {
    try {
      for (const item of cart) {
        await axios.delete(`/api/cart/${item.id}`);
      }
      setIsPaymentComplete(true);
      setTimeout(() => {
        closeModal();
      }, 1000);
    } catch (error) {
      console.error("Failed to remove item from cart", error);
    }
  };

  return (
    <div className="isolate bg-white px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          주문 / 결제
        </h2>
      </div>
      <form onSubmit={submitHandle} className="mx-auto mt-10 max-w-xl sm:mt-20">
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
                value={userInfo.name}
                autoComplete="name"
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
                value={userInfo.phone}
                autoComplete="phone"
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
                type="text"
                value={userInfo.address}
                autoComplete="address"
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
                onClick={() => paymentMethodChangeHandle("card")}
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
                onClick={() => paymentMethodChangeHandle("bank")}
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
                  className="w-full p-2 border rounded-md border-gray-300"
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
                  className="w-full p-2 border rounded-md border-gray-300"
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
                  className="w-full p-2 border rounded-md border-gray-300"
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
                  className="w-full p-2 border rounded-md border-gray-300"
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
                  className="w-full p-2 border rounded-md border-gray-300"
                  placeholder="계좌 번호"
                  required
                />
              </div>
            </div>
          )}
          <div className="mt-10 flex justify-center">
            <button
              type="submit"
              onClick={openModal}
              className="w-1/4 rounded-md bg-blue-600 mb-10 px-3.5 py-2.5 text-center text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              결제
            </button>
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                  <h2 className="text-lg font-semibold mb-4">
                    결제 하시겠습니까?
                  </h2>
                  <div className="flex justify-end space-x-4">
                    <Link to={"/"}>
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                        onClick={confirmPaymentHandle}
                      >
                        Yes
                      </button>
                    </Link>
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
