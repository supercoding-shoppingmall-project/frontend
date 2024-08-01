"use client";

// import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PopoverGroup } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const categoryClickHandle = async (categoryId) => {
    try {
      const response = await axios.get(`/api/product/header/${categoryId}`);
      if (response.status === 200) {
        navigate(`/api/product/header/${categoryId}`);
      } else {
        console.error(`Failed to fetch data for category ${categoryId}`);
      }
    } catch (error) {
      console.error(`Error fetching data for category ${categoryId}:`, error);
    }
  };

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/product/category");
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategories();
  }, []);

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
          {category.map((category) => (
            <button
              key={category.id}
              onClick={() => categoryClickHandle(category.id)}
              className="text-base font-semibold leading-6 text-gray-900 mr-2"
            >
              {category.name}
            </button>
          ))}
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
            <Link to="/userprofile">
              <UserCircleIcon
                aria-hidden="true"
                className="h-10 w-10 text-gray-300"
              />
            </Link>
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
