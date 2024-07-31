// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import "./App.css";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SellingPage from "./pages/SellingPage";
import ProductAddPage from "./pages/ProductAddPage";
import PayPage from "./pages/PayPage";
import MockDatas from "./components/mock-data/MockDatas";
import Header from "./components/header-footer/Header";
import Footer from "./components/header-footer/Footer";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import UserProfile from "./components/user-profile/UserProfile";
import CartList from "./components/user-profile/CartList";
import PurchaseList from "./components/user-profile/PurchaseList";
import CartPage from "./components/cart/CartPage";

import CategoryPage from "./pages/CategoryPage";

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
          <Route path="/category/:number" element={<CategoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/cartpage" element={<CartPage />} />
          <Route path="/sell" element={<SellingPage />} />
          <Route path="/sell/add" element={<ProductAddPage />} />
          <Route path="/pay" element={<PayPage />} />
          <Route path="/cartlist" element={<CartList />} />
          <Route path="/purchaselist" element={<PurchaseList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
