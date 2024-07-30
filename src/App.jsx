import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import "./App.css";

import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import MockDatas from "./components/mockData/MockDatas";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import UserProfile from "./components/userprofile/UserProfile";
import Selling from "./pages/Selling";
import AddProducts from "./components/addproduct/AddProducts";
import CartPop from "./components/CartPop";
import CartPage from "./components/CartPage";

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
          <Route path="/sell" element={<Selling />} />
          <Route path="/sell/add" element={<AddProducts />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
