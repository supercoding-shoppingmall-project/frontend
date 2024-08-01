import React from "react";
import axios from "axios"; // axios import 추가
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      await axios.post(
        "/api/user/logout",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      localStorage.removeItem("Authorization");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userProfileClickHandle = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      const userId = getUserIdToken(token);

      if (!userId || !token) {
        console.error("User ID or token is missing.");
        navigate("/login");
        return;
      }

      const response = await axios.get(`/api/mypage/${userId}`, {
        headers: {
          Authorization: token,
        },
      });

      navigate("/userprofile", { state: { userInfo: response.data } });
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      navigate("/login");
    }
  };

  const getUserIdToken = (token) => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.userId; // userId를 반환
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
        return null;
      }
    }
    return null;
  };

  return (
    <div className="sm:w-60 w-full py-3">
      <div className="bg-white text-center border border-gray-300 p-7 block">
        <div className="mt-2 flex items-center gap-x-3 ">
          <UserCircleIcon
            aria-hidden="true"
            className="h-30 w-20 text-gray-300"
          />
          <button
            type="button"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            변경
          </button>
        </div>
      </div>

      <div
        className="font-light text-gray-700 py-1.5 px-1 mt-3 border-b border-solid border-gray-200 cursor-pointer"
        onClick={userProfileClickHandle}
      >
        내 프로필
      </div>

      <Link to="/cartlist">
        <div className="font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200">
          장바구니 상품 조회
        </div>
      </Link>
      <Link to="/purchaselist">
        <div className="font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200">
          구매 목록 조회
        </div>
      </Link>
      <div
        className="font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200 cursor-pointer"
        onClick={logoutHandle}
      >
        로그 아웃
      </div>
    </div>
  );
};

export default User;
