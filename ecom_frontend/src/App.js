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
  //state
  const [cartItems, setCartItems] = useState([]);

  //api url
  const apiUrl = process.env.REACT_APP_API_URL;

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
      <Nav apiUrl={apiUrl} />
      <Routes>
        <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} apiUrl={apiUrl} />} />
        <Route path="/product/:id" element={<Product cartItems={cartItems} setCartItems={setCartItems} apiUrl={apiUrl} />} />
        <Route path="/product" element={<AddProduct apiUrl={apiUrl} />} />
        <Route path="/product/update/:id" element={<UpdateProduct apiUrl={apiUrl} />} />
        <Route path="/product/category/:cat" element={<SearchByCategory apiUrl={apiUrl} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} apiUrl={apiUrl} />} />
      </Routes>
    </Router>
  );
}

export default App;
