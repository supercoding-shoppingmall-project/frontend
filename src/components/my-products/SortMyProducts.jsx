"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { SORT_OPTIONS } from "../../constants/MyProducts";
import ClassNames from "../../utils/ClassNames";
import { useState } from "react";

export default function SortMyProducts({ onSortChange }) {
  const [options, setOptions] = useState(SORT_OPTIONS);

  const optionClickHandle = (selected) => {
    setOptions(
      options.map((option) => ({
        ...option,
        current: option.name === selected.name,
      }))
    );
    onSortChange(selected.name);
  };

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <div className="flex items-baseline justify-end border-b border-gray-200 pb-6 pt-24">
          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  {options.find((option) => option.current).name}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  {options.map((option) => (
                    <MenuItem key={option.name}>
                      <button
                        className={ClassNames(
                          option.current
                            ? "font-medium text-gray-900"
                            : "text-gray-400",
                          "block px-4 py-2 text-sm data-[focus]:bg-gray-100 w-full text-left"
                        )}
                        onClick={() => optionClickHandle(option)}
                      >
                        {option.name}
                      </button>
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </main>
    </div>
  );
}
