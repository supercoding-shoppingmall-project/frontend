import React, { useState } from "react";
import User from "./User";
import Madal from "./Modal";

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center bg-white text-base py-40 px-80 border border-gray-300">
        <User />
        <div className="w-2/3 ml-10 h-full flex flex-col border border-solid border-gray-200 p-6">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            개인 정보
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-4">
            <div className="sm:col-span-4">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                이름
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                전화번호
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                성별
              </label>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="male"
                    name="gender"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="male"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    남성
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="female"
                    name="gender"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="female"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    여성
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-4">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                주소
              </label>
              <div className="mt-4">
                <input
                  id="street-address"
                  name="street-address"
                  type="text"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="text-right mt-10">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <Madal open={isModalOpen} setOpen={setIsModalOpen} />}
    </>
  );
};

export default UserProfile;
