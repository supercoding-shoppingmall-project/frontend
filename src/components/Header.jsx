"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [ ];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex items-center justify-between p-6 lg:px-5"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </a>
        </div>
        <PopoverGroup className="lg:flex lg:gap-x-12">

          <a href="#" className="text-base font-semibold leading-6 text-gray-900 mr-2">
            샌들 & 슬리퍼
          </a>
          <a href="#" className="text-base font-semibold leading-6 text-gray-900 mr-2">
            러닝
          </a>
          <a href="#" className="text-base font-semibold leading-6 text-gray-900 mr-2">
            축구
          </a>
          <a href="#" className="text-base font-semibold leading-6 text-gray-900 mr-2">
            농구
          </a>
          <a href="#" className="text-base font-semibold leading-6 text-gray-900 mr-2">
            트레이닝 & 짐
          </a>
          <a href="#" className="text-base font-semibold leading-6 text-gray-900 mr-2">
            골프
          </a>
          <a href="#" className="text-base font-semibold leading-6 text-gray-900 mr-2">
            테니스
          </a>
          <a href="#" className="text-base font-semibold leading-6 text-gray-900">
            기타
          </a>
        </PopoverGroup>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <button className="mr-6 rounded bg-black text-sm font-semibold px-1.5 py-1.5 text-white leading-6">판매하기</button>
          <a href="#" className="ml-2 mt-1 mr-3 text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
