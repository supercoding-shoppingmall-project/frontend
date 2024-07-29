import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PayPage from "./pages/PayPage";
import CartPop from "./components/CartPop";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/CartPop" element={<CartPop />} />
        <Route path="/PayPage" element={<PayPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
