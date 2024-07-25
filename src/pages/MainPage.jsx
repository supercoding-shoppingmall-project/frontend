import Category from "../components/Category";
import Pagination from "../components/Pagination";
import ProductGrid from "../components/ProductGrid";
import MockDatas from "../components/MockDatas";

import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <Category />
      <ProductGrid MockDatas={MockDatas} />
      <div className="flex justify-center items-center my-4">
        <Pagination />
      </div>
    </>
  );
}
