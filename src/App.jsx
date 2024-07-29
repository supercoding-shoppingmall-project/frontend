// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PayPage from "./pages/PayPage";
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
import CartList from "./components/userprofile/CartList";
import PurchaseList from "./components/userprofile/PurchaseList";
import CartPop from "./components/CartPop";
import CartPage from "./components/CartPage";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/detail/:id"
          element={<DetailPage MockDatas={MockDatas} addToCart={addToCart} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/cartlist" element={<CartList />} />
        <Route path="/purchaselist" element={<PurchaseList />} />
        <Route path="/paypage" element={<PayPage />} />

        <Route
          path="/cartpage"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />

        <Route path="/sell" element={<Selling />} />
        <Route path="/sell/add" element={<AddProducts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
