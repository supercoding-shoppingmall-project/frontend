"use client";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PopoverGroup } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      try {
        // 간단한 요청으로 토큰 유효성 검사
        await axios.get("/api/user/validate-token", {
          headers: { Authorization: token },
        });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        localStorage.removeItem("Authorization"); // 토큰 만료 시 삭제
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus(); // 페이지 로드 시 로그인 상태 확인
    const intervalId = setInterval(checkLoginStatus, 60000); // 1분마다 토큰 유효성 검사

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  const sellClickHandle = () => {
    if (isLoggedIn) {
      navigate("/sell");
    } else {
      navigate("/login");
    }
  };

  const cartClickHandle = async () => {
    const token = localStorage.getItem("Authorization");
    const userId = getUserIdToken(token);

    if (!userId || !token) {
      console.error("User ID 또는 token이 없습니다.");
      return;
    }

    try {
      const response = await axios.get(`/api/cart/${userId}`, {
        headers: { Authorization: token },
      });
      navigate("/CartPage", { state: { cartData: response.data } });
    } catch (error) {
      console.error("장바구니 데이터를 가져오는 데 실패했습니다:", error);
      navigate("/login");
    }
  };

  const userIconClickHandle = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      const userId = getUserIdToken(token);

      if (!userId || !token) {
        console.error("User ID or token is missing.");
        navigate("/login");
        return;
      }

      const response = await axios.get(`/api/mypage/${userId}`, {
        headers: { Authorization: token },
      });
      navigate("/userprofile", { state: { userInfo: response.data } });
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      navigate("/login");
    }
  };

  const logoutHandle = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      await axios.post(
        "/api/user/logout",
        {},
        {
          headers: { Authorization: token },
        }
      );
      localStorage.removeItem("Authorization");
      setIsLoggedIn(false); // 상태 업데이트
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getUserIdToken = (token) => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.userId;
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
        return null;
      }
    }
    return null;
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
          <div onClick={cartClickHandle}>
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
          </div>

          <button
            onClick={sellClickHandle}
            className="relative mr-4 rounded-xl bg-black text-sm font-semibold px-3 py-1.5 text-white leading-6"
          >
            판매하기
          </button>

          {isLoggedIn ? (
            <>
              <div onClick={userIconClickHandle} className="cursor-pointer">
                <UserCircleIcon
                  aria-hidden="true"
                  className="h-10 w-10 text-gray-300"
                />
              </div>
              <div
                className="relative ml-2 mt-3 mr-2 text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
                onClick={logoutHandle}
              >
                로그아웃
              </div>
            </>
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
