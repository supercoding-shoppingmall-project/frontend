"use client";

import axios from "axios";
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

  const userIconClickHandle = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("Authorization");

      if (!userId || !token) {
        console.error("User ID or token is missing.");
        navigate("/login");
        return;
      }

      // 사용자 정보 가져오기
      const response = await axios.get(`/api/mypage/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // API 요청 성공 시 프로필 페이지로 이동
      navigate("/userprofile", { state: { userInfo: response.data } });
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      navigate("/login");
    }
  };

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6 lg:px-5"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="relative -m-1.5 p-1.5 w-20 ml-6">
            <span className="sr-only">Your Company</span>
            <img src="/assets/shoes.jpg" alt="shoes" />
          </Link>
        </div>
        <PopoverGroup className="lg:flex relative lg:gap-x-12">
          <Link
            to="/category/1"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            샌들 & 슬리퍼
          </Link>
          <Link
            to="/category/2"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            러닝
          </Link>
          <Link
            to="/category/3"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            축구
          </Link>
          <Link
            to="/category/4"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            농구
          </Link>
          <Link
            to="/category/5"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            트레이닝 & 짐
          </Link>
          <Link
            to="/category/6"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            골프
          </Link>
          <Link
            to="/category/7"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            테니스
          </Link>
          <Link
            to="/category/8"
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
            <div onClick={userIconClickHandle} className="cursor-pointer">
              <UserCircleIcon
                aria-hidden="true"
                className="h-10 w-10 text-gray-300"
              />
            </div>
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
