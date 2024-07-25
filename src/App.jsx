import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/CartPop";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <CartPage />
      {/* <Routes>
        <Route path="/Cart" element={<CartPop />} />
      </Routes> */}
    </div>
  );
}

export default App;
