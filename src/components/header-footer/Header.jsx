"use client";

// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PopoverGroup } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const sellClickHandle = () => {
    if (isLoggedIn) {
      navigate("/sell");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6 lg:px-5"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="relative -m-1.5 p-1.5 w-2/5 ml-6">
            <span className="sr-only">Your Company</span>
            <img src="/assets/shoes.jpg" alt="shoes" />
          </Link>
        </div>
        <PopoverGroup className="lg:flex relative lg:gap-x-12">
          <Link
            to="/header/1"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            샌들 & 슬리퍼
          </Link>
          <Link
            to="/header/2"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            러닝
          </Link>
          <Link
            to="/api/product/category/3"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            축구
          </Link>
          <Link
            to="/api/product/category/4"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            농구
          </Link>
          <Link
            to="/api/product/category/트레이닝 & 짐"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            트레이닝 & 짐
          </Link>
          <Link
            to="/api/product/category/골프"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            골프
          </Link>
          <Link
            to="/api/product/category/테니스"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            테니스
          </Link>
          <Link
            to="/api/product/category/기타"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            기타
          </Link>
        </PopoverGroup>
        <div className="lg:flex lg:flex-1 relative lg:justify-end">
          <Link to={"/CartPage"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-6 w-8 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Link>

          <button
            onClick={sellClickHandle}
            className="relative mr-4 rounded-xl bg-black text-sm font-semibold px-3 py-1.5 text-white leading-6"
          >
            판매하기
          </button>

          {isLoggedIn ? (
            <Link to="/userprofile">
              <UserCircleIcon
                aria-hidden="true"
                className="h-10 w-10 text-gray-300"
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className="relative ml-2 mt-1 mr-3 text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { PopoverGroup } from "@headlessui/react";
// import axios from "axios";

// export default function Header() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("/api/product/category");
//         setCategories(response.data);
//       } catch (err) {
//         setError("Failed to fetch categories");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) {
//     return (
//       <header className="bg-white">
//         <nav
//           aria-label="Global"
//           className="mx-auto flex items-center justify-between p-6 lg:px-5"
//         >
//           <div className="flex lg:flex-1">
//             <Link to="/" className="relative -m-1.5 p-1.5 w-2/5 ml-6">
//               <span className="sr-only">Your Company</span>
//               <img src="/assets/shoes.jpg" alt="shoes" />
//             </Link>
//           </div>
//           <PopoverGroup className="lg:flex relative lg:gap-x-12">
//             <Link
//               to="/category/1"
//               className="text-base font-semibold leading-6 text-gray-900 mr-2"
//             >
//               샌들 & 슬리퍼
//             </Link>
//             <Link
//               to="/category/2"
//               className="text-base font-semibold leading-6 text-gray-900 mr-2"
//             >
//               러닝
//             </Link>
//             <Link
//               to="/category/3"
//               className="text-base font-semibold leading-6 text-gray-900 mr-2"
//             >
//               축구
//             </Link>
//             <Link
//               to="/category/4"
//               className="text-base font-semibold leading-6 text-gray-900 mr-2"
//             >
//               농구
//             </Link>
//             <Link
//               to="/category/5"
//               className="text-base font-semibold leading-6 text-gray-900 mr-2"
//             >
//               트레이닝 & 짐
//             </Link>
//             <Link
//               to="/category/6"
//               className="text-base font-semibold leading-6 text-gray-900 mr-2"
//             >
//               골프
//             </Link>
//             <Link
//               to="/category/7"
//               className="text-base font-semibold leading-6 text-gray-900 mr-2"
//             >
//               테니스
//             </Link>
//             <Link
//               to="/category/8"
//               className="text-base font-semibold leading-6 text-gray-900"
//             >
//               기타
//             </Link>
//           </PopoverGroup>
//           <div className="lg:flex lg:flex-1 relative lg:justify-end">
//             <Link to={"/CartPage"}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="mr-6 w-8 cursor-pointer"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
//                 />
//               </svg>
//             </Link>

//             <Link to="/sell">
//               <button className="relative mr-4 rounded-xl bg-black text-sm font-semibold px-3 py-1.5 text-white leading-6">
//                 판매하기
//               </button>
//             </Link>
//             <Link
//               to="/login"
//               className="relative ml-2 mt-1 mr-3 text-sm font-semibold leading-6 text-gray-900"
//             >
//               Log in <span aria-hidden="true">&rarr;</span>
//             </Link>
//           </div>
//         </nav>
//       </header>
//     );
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <header className="bg-white">
//       <nav
//         aria-label="Global"
//         className="mx-auto flex items-center justify-between p-6 lg:px-5"
//       >
//         <div className="flex lg:flex-1">
//           <Link to="/" className="relative -m-1.5 p-1.5 w-2/5 ml-6">
//             <span className="sr-only">Your Company</span>
//             <img src="/assets/shoes.jpg" alt="shoes" />
//           </Link>
//         </div>
//         <PopoverGroup className="lg:flex relative lg:gap-x-12">
//           {categories.map((category) => (
//             <Link
//               key={category.id}
//               to={`/category/${category.name}`}
//               className="text-base font-semibold leading-6 text-gray-900 mr-2"
//             >
//               {category.name}
//             </Link>
//           ))}
//         </PopoverGroup>
//         <div className="lg:flex lg:flex-1 relative lg:justify-end">
//           <Link to={"/CartPage"}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               className="mr-6 w-8 cursor-pointer"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
//               />
//             </svg>
//           </Link>

//           <Link to="/sell">
//             <button className="relative mr-4 rounded-xl bg-black text-sm font-semibold px-3 py-1.5 text-white leading-6">
//               판매하기
//             </button>
//           </Link>
//           <Link
//             to="/login"
//             className="relative ml-2 mt-1 mr-3 text-sm font-semibold leading-6 text-gray-900"
//           >
//             Log in <span aria-hidden="true">&rarr;</span>
//           </Link>
//         </div>
//       </nav>
//     </header>
//   );
// }
