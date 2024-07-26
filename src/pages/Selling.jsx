import React from "react";
import MyProducts from "../components/MyProducts";
import { Link } from "react-router-dom";
import SortMyProducts from "../components/SortMyProducts";

const Selling = () => {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <Link to="/sell/add">
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          상품 등록하기
        </button>
      </Link>
      <SortMyProducts />
      <MyProducts />
    </div>
  );
};

export default Selling;
