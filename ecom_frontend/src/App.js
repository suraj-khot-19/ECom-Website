import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
