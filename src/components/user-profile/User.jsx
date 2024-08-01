import React from "react";
import axios from "axios"; // axios import 추가
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const User = () => {
  const token = localStorage.getItem("Authorization");

  const logoutHandle = async () => {
    try {
      await axios.post("/api/user/logout", {
        headers: {
          Authorization: token,
        },
      });
      localStorage.removeItem("Authorization");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
      <div>
        <label
          htmlFor="cover-photo"
          className="block font-medium leading-6 text-gray-900 px-1"
        >
          파일 찾기
        </label>
        <div className=" mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 py-5">
          <div className="text-center">
            <PhotoIcon
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-300"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>
      <Link to="/userprofile">
        <div className=" font-light text-gray-700 py-1.5 px-1 mt-3 border-b border-solid border-gray-200 ">
          내 프로필
        </div>
      </Link>
      <Link to="/cartlist">
        <div className=" font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200">
          장바구니 상품 조회
        </div>
      </Link>
      <Link to="/purchaselist">
        <div className=" font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200">
          구매 목록 조회
        </div>
      </Link>
      <button
        className=" font-light text-gray-700 py-1.5 px-1 border-b border-solid border-gray-200 cursor-pointer"
        onClick={logoutHandle}
      >
        로그 아웃
      </button>
    </div>
  );
};

export default User;
