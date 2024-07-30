import React, { useState, useEffect } from "react";
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
import CartPage from "./components/CartPage";

function App() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      }

      return [...prevCart, product];
    });
  };

  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId, size, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
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
