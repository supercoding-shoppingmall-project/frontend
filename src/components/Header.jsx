"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { PopoverGroup } from "@headlessui/react";

export default function Example() {
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6 lg:px-5"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 w-2/5 ml-6">
            <span className="sr-only">Your Company</span>
            <img src="/assets/shoes.jpg" alt="shoes" />
          </a>
        </div>
        <PopoverGroup className="lg:flex lg:gap-x-12">
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            샌들 & 슬리퍼
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            러닝
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            축구
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            농구
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            트레이닝 & 짐
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            골프
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900 mr-2"
          >
            테니스
          </a>
          <a
            href="#"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            기타
          </a>
        </PopoverGroup>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            className="mr-6 w-8 cursor-grabbing"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          <button className="mr-4 rounded-xl bg-black text-sm font-semibold px-3 py-1.5 text-white leading-6">
            판매하기
          </button>
          <a
            href="#"
            className="ml-2 mt-1 mr-3 text-sm font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
