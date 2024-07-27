import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartPop from "./components/CartPop";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import UserProfile from "./components/userprofile/UserProfile";
// import CartPage from "./pages/CartPage";
import Selling from "./pages/Selling";
import AddProducts from "./components/addproduct/AddProducts";

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* <CartPage /> */}
      <Routes>
        <Route path="/Cart" element={<CartPop />} />
        <Route path="/sell" element={<Selling />} />
        <Route path="/sell/add" element={<AddProducts />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
