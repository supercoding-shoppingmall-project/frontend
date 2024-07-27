import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Selling from "./pages/Selling";
import AddProducts from "./components/addproduct/AddProducts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sell" element={<Selling />} />
        <Route path="/sell/add" element={<AddProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
