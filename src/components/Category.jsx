import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const sortOptions = [
  // { name: "인기순", value: "popular", current: true },
  // { name: "평점순", value: "rating", current: false },
  { name: "낮은 가격 순", value: "priceLowToHigh", current: false },
  { name: "높은 가격 순", value: "priceHighToLow", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Category({ MockDatas }) {
  const [sortOption, setSortOption] = useState(sortOptions[0].value);

  const sortedProducts = [...MockDatas].sort((a, b) => {
    if (sortOption === "priceLowToHigh") {
      return a.price - b.price;
    } else if (sortOption === "priceHighToLow") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
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
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        {({ active }) => (
                          <button
                            onClick={() => setSortOption(option.value)}
                            className={classNames(
                              option.value === sortOption
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm",
                              active ? "bg-gray-100" : ""
                            )}
                          >
                            {option.name}
                          </button>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {sortedProducts.map((MockDatas) => (
              <a key={MockDatas.id} href={MockDatas.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    alt={MockDatas.imageAlt}
                    src={MockDatas.imageSrc}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{MockDatas.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {MockDatas.price}
                </p>
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
