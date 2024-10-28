import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProd";
import SearchByCategory from "./components/SearchByCategory";
import React, { useState, useEffect } from 'react'
import Cart from "./components/Cart";


function App() {

  const [cartItems, setCartItems] = useState([]);

  // Load cart items from local storage
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartProducts');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Store cart items in local storage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product" element={<AddProduct />} />
        <Route path="/product/update/:id" element={<UpdateProduct />} />
        <Route path="/product/category/:cat" element={<SearchByCategory />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;
