import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import "./App.css";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SellingPage from "./pages/SellingPage";
import MockDatas from "./components/mock-data/MockDatas";
import Header from "./components/header-footer/Header";
import Footer from "./components/header-footer/Footer";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import UserProfile from "./components/user-profile/UserProfile";
import AddProducts from "./components/add-product/AddProducts";
import CartPop from "./components/cart/CartPop";
import CartPage from "./components/cart/CartPage";
import PayPage from "./pages/PayPage";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/detail/:id"
            element={<DetailPage MockDatas={MockDatas} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/cart" element={<CartPop />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/sell" element={<SellingPage />} />
          <Route path="/sell/add" element={<AddProducts />} />
          <Route path="/pay" element={<PayPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
