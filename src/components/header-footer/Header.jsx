"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const profileUrl = localStorage.getItem("profilePictureUrl");
    setIsLoggedIn(loggedIn);
    setProfilePictureUrl(profileUrl);
  }, []);

  const categoryClickHandle = async (category) => {
    try {
      const response = await axios.get(`/api/product/header/${category}`);
      if (response.status === 200) {
        navigate(`/${category}`);
      } else {
        console.error(`Failed to fetch data for ${category}`);
      }
    } catch (error) {
      console.error(`Error fetching data for ${category}:`, error);
    }
  };

  const logoClickHandle = async () => {
    try {
      const response = await axios.get("/api/product/all");
      if (response.status === 200) {
        navigate("/");
      } else {
        console.error("Failed to fetch all products");
      }
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6 lg:px-5"
      >
        <div className="flex lg:flex-1">
          <button onClick={logoClickHandle} className="-m-1.5 p-1.5 w-20 ml-6">
            <span className="sr-only">Your Company</span>
            <img src="/assets/shoes.jpg" alt="shoes" />
          </button>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <button
            onClick={() => categoryClickHandle("sandals-slippers")}
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            샌들 & 슬리퍼
          </button>
          <button
            onClick={() => categoryClickHandle("running")}
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            러닝
          </button>
          <button
            onClick={() => categoryClickHandle("soccer")}
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            축구
          </button>
          <button
            onClick={() => categoryClickHandle("basketball")}
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            농구
          </button>
          <button
            onClick={() => categoryClickHandle("training-gym")}
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            트레이닝 & 짐
          </button>
          <button
            onClick={() => categoryClickHandle("golf")}
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            골프
          </button>
          <button
            onClick={() => categoryClickHandle("tennis")}
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            테니스
          </button>
          <button
            onClick={() => categoryClickHandle("others")}
            className="text-base font-semibold leading-6 text-gray-900"
          >
            기타
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
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

          <Link to="/sell">
            <button className="mr-4 rounded-xl bg-black text-sm font-semibold px-3 py-1.5 text-white leading-6">
              판매하기
            </button>
          </Link>
          {isLoggedIn ? (
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <Link
              to="/login"
              className="ml-2 mt-1 mr-3 text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button onClick={logoClickHandle} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img src="/assets/shoes.jpg" alt="shoes" className="h-8 w-auto" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <button
                  onClick={() => categoryClickHandle("sandals-slippers")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  샌들 & 슬리퍼
                </button>
                <button
                  onClick={() => categoryClickHandle("running")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  러닝
                </button>
                <button
                  onClick={() => categoryClickHandle("soccer")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  축구
                </button>
                <button
                  onClick={() => categoryClickHandle("basketball")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  농구
                </button>
                <button
                  onClick={() => categoryClickHandle("training-gym")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  트레이닝 & 짐
                </button>
                <button
                  onClick={() => categoryClickHandle("golf")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  골프
                </button>
                <button
                  onClick={() => categoryClickHandle("tennis")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  테니스
                </button>
                <button
                  onClick={() => categoryClickHandle("others")}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  기타
                </button>
              </div>
              <div className="py-6">
                <Link
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
