// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
// import FormatToKRW from "../../utils/FormatToKRW";
// import { Link, useNavigate } from "react-router-dom";
// import { deleteCartItem } from "../../utils/ApiService";

// export default function CartPage({ showPurchaseButton = true }) {
//   const [cart, setCart] = useState([]); // 장바구니 항목
//   const [userId, setUserId] = useState(null); // 수정: setUserId를 하나로 변경
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("Authorization");
//     if (token) {
//       const payload = token.split(".")[1];
//       const decodedPayload = JSON.parse(atob(payload));
//       setUserId(decodedPayload.userId);

//       axios
//         .get(`/api/cart/${decodedPayload.userId}`, {
//           headers: {
//             Authorization: token,
//           },
//         })
//         .then((response) => {
//           setCart(response.data.items);
//         })
//         .catch((error) => {
//           setError("Failed to fetch cart data");
//           console.error("Failed to fetch cart data", error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } else {
//       setError("No authorization token found");
//       setLoading(false);
//     }
//   }, []);

//   const quantityChangeHandle = (productId, size, delta) => {
//     const product = cart.find(
//       (item) => item.productId === productId && item.size === size
//     );
//     if (product) {
//       const newQuantity = Math.max(1, product.quantity + delta);
//       updateQuantity(productId, size, newQuantity);
//     }
//   };

//   const calculateTotalPrice = () => {
//     return cart.reduce((total, product) => {
//       const price = parseFloat(product.price) || 0;
//       return total + price * (product.quantity || 1);
//     }, 0);
//   };

//   const getUserIdToken = (token) => {
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         return payload.userId;
//       } catch (error) {
//         console.error("Token decoding error:", error);
//         return null;
//       }
//     }
//     return null;
//   };

//   const payClickHandle = async () => {
//     try {
//       const token = localStorage.getItem("Authorization");
//       const userId = getUserIdToken(token);

//       const response = await axios.get(`/api/mypage/${userId}`, {
//         headers: {
//           Authorization: token,
//         },
//       });

//       navigate("/pay", { state: { userInfo: response.data } });
//     } catch (error) {
//       console.error("Failed to fetch user info:", error);
//     }
//   };

//   const removeHandle = async (id) => {
//     const token = localStorage.getItem("Authorization");
//     const payload = token.split(".")[1];
//     const decodedPayload = JSON.parse(atob(payload));
//     const userId = decodedPayload.userId;

//     if (userId && token) {
//       try {
//         await deleteCartItem(id, userId);
//         // 장바구니 상태를 업데이트
//         const response = await axios.get(`/api/cart/${userId}`, {
//           headers: {
//             Authorization: token,
//           },
//         });
//         setCart(response.data.items);
//       } catch (error) {
//         setError("Failed to remove item from cart");
//         console.error("Failed to remove item from cart", error);
//       }
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6 text-center">장바구니</h2>
//       <div className="mb-6">
//         <ul role="list" className="-my-6 divide-y divide-gray-200">
//           {cart.length > 0 ? (
//             cart.map((product) => (
//               <li
//                 key={`${product.productId}-${product.size}`}
//                 className="flex py-6"
//               >
//                 <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                   <img
//                     alt={product.name || "Product Image"}
//                     src={product.productImageUrl || "default-image-url.jpg"}
//                     className="h-full w-full object-cover object-center"
//                   />
//                 </div>
//                 <div className="ml-4 flex flex-1 flex-col">
//                   <div>
//                     <div className="flex justify-between text-base font-medium text-gray-900">
//                       <h3>{product.name || "No Name"}</h3>
//                       <p className="ml-4">{FormatToKRW(product.price || 0)}</p>
//                     </div>
//                     <p className="mt-1 text-sm text-gray-500">{`Size: ${product.size}`}</p>
//                   </div>
//                   <div className="flex flex-1 items-end justify-between text-sm">
//                     <div className="flex items-center">
//                       <button
//                         onClick={(e) => {
//                           e.preventDefault();
//                           quantityChangeHandle(
//                             product.productId,
//                             product.size,
//                             -1
//                           );
//                         }}
//                         className="text-gray-500 hover:text-gray-700"
//                       >
//                         <MinusIcon className="h-5 w-5" />
//                       </button>
//                       <p className="mx-2 text-gray-500">{`${product.quantity} 개`}</p>
//                       <button
//                         onClick={(e) => {
//                           e.preventDefault();
//                           quantityChangeHandle(
//                             product.productId,
//                             product.size,
//                             1
//                           );
//                         }}
//                         className="text-gray-500 hover:text-gray-700"
//                       >
//                         <PlusIcon className="h-5 w-5" />
//                       </button>
//                     </div>
//                     <div className="flex">
//                       <button
//                         type="button"
//                         onClick={() => removeHandle(product.id)}
//                         className="font-medium text-indigo-600 hover:text-indigo-500"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))
//           ) : (
//             <li className="py-6 text-center">장바구니에 아이템이 없습니다.</li>
//           )}
//         </ul>
//       </div>

//       <div className="border-t border-gray-200 py-6">
//         <div className="flex justify-between text-base font-medium text-gray-900">
//           <p>총 가격</p>
//           <p>{FormatToKRW(calculateTotalPrice())}</p>
//         </div>
//         {showPurchaseButton && (
//           <div className="mt-6 flex justify-center">
//             <Link to={"/pay"}>
//               <button
//                 type="button"
//                 onClick={payClickHandle}
//                 className="flex items-center justify-center rounded-md border border-transparent bg-green-300 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-400"
//               >
//                 구매하기
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import FormatToKRW from "../../utils/FormatToKRW";
import { Link, useNavigate } from "react-router-dom";
import { deleteCartItem } from "../../utils/ApiService";

// 장바구니 수량 업데이트 함수
// const updateCartItemQuantity = async (productId, size, newQuantity) => {
//   const token = localStorage.getItem("Authorization");
//   const userId = getUserIdFromToken(token);

//   try {
//     await axios.post(
//       `/api/cart/${userId}`,
//       { productId, size, quantity: newQuantity },
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Failed to update item quantity", error);
//     throw error;
//   }
// };

// 토큰에서 사용자 ID 추출 함수
const getUserIdFromToken = (token) => {
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.userId;
    } catch (error) {
      console.error("Token decoding error:", error);
      return null;
    }
  }
  return null;
};

export default function CartPage({ showPurchaseButton = true }) {
  const [cart, setCart] = useState([]); // 장바구니 항목
  const [userId, setUserId, cartItemId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      setUserId(decodedPayload.userId);

      axios
        .get(`/api/cart/${decodedPayload.userId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setCart(response.data.items);
        })
        .catch((error) => {
          setError("Failed to fetch cart data");
          console.error("Failed to fetch cart data", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("No authorization token found");
      setLoading(false);
    }
  }, []);

  const quantityChangeHandle = async (productId, size, delta) => {
    const product = cart.find(
      (item) => item.productId === productId && item.size === size
    );
    if (product) {
      const newQuantity = Math.max(1, product.quantity + delta);

      try {
        // API 호출을 통해 수량 업데이트
        await axios.put(
          `/api/cart/${userId}/items/${cartItemId}`,
          {
            productId: productId,
            size: size,
            quantity: newQuantity,
          },
          {
            headers: {
              Authorization: localStorage.getItem("Authorization"),
            },
          }
        );

        // 상태 업데이트
        setCart(
          cart.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      } catch (error) {
        console.error("Failed to update item quantity", error);
        setError("Failed to update item quantity");
      }
    }
  };

  //     try {
  //       await updateCartItemQuantity(productId, size, newQuantity);
  //       // 클라이언트 측 장바구니 상태 업데이트
  //       setCart(
  //         cart.map((item) =>
  //           item.productId === productId && item.size === size
  //             ? { ...item, quantity: newQuantity }
  //             : item
  //         )
  //       );
  //     } catch (error) {
  //       setError("Failed to update item quantity");
  //       console.error("Failed to update item quantity", error);
  //     }
  //   }
  // };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      const price = parseFloat(product.price) || 0;
      return total + price * (product.quantity || 1);
    }, 0);
  };

  const payClickHandle = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      const userId = getUserIdFromToken(token);

      const response = await axios.get(`/api/mypage/${userId}`, {
        headers: {
          Authorization: token,
        },
      });

      navigate("/pay", { state: { userInfo: response.data } });
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  const removeHandle = async (id) => {
    const token = localStorage.getItem("Authorization");
    const userId = getUserIdFromToken(token);

    if (userId && token) {
      try {
        await deleteCartItem(id, userId);
        const response = await axios.get(`/api/cart/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        setCart(response.data.items);
      } catch (error) {
        setError("Failed to remove item from cart");
        console.error("Failed to remove item from cart", error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">장바구니</h2>
      <div className="mb-6">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cart.length > 0 ? (
            cart.map((product) => (
              <li
                key={`${product.productId}-${product.size}`}
                className="flex py-6"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    alt={product.name || "Product Image"}
                    src={product.productImageUrl || "default-image-url.jpg"}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{product.name || "No Name"}</h3>
                      <p className="ml-4">{FormatToKRW(product.price || 0)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{`Size: ${product.size}`}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          quantityChangeHandle(
                            product.productId,
                            product.size,
                            -1
                          );
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <MinusIcon className="h-5 w-5" />
                      </button>
                      <p className="mx-2 text-gray-500">{`${product.quantity} 개`}</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          quantityChangeHandle(
                            product.productId,
                            product.size,
                            1
                          );
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => removeHandle(product.id)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="py-6 text-center">장바구니에 아이템이 없습니다.</li>
          )}
        </ul>
      </div>

      <div className="border-t border-gray-200 py-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>총 가격</p>
          <p>{FormatToKRW(calculateTotalPrice())}</p>
        </div>
        {showPurchaseButton && (
          <div className="mt-6 flex justify-center">
            <Link to={"/pay"}>
              <button
                type="button"
                onClick={payClickHandle}
                className="flex items-center justify-center rounded-md border border-transparent bg-green-300 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-green-400"
              >
                구매하기
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
