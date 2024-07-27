import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartPop from "./components/CartPop";
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
