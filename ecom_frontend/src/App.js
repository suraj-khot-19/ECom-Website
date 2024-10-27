import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProd";
import Cart from "./components/Cart";

function App() {
  //states
  const [product, setProduct] = useState([])
  const [fetchError, setFetchError] = useState(false)
  const [cart, setCart] = useState([]);
  const [needToUpdate, setNeedToUpdate] = useState(false)

  //effect
  useEffect(() => {
    getProducts();
  }, [])

  useEffect(() => {
    if (needToUpdate) {
      getProducts();
      setNeedToUpdate(false);
    }
  }, [needToUpdate])


  //   fetch all products
  const getProducts = async () => {
    const url = "http://localhost:8080/api/products";

    // try catch
    try {
      const jsonData = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await jsonData.json();

      //setting data
      setProduct(data);
    } catch (error) {
      //if error is came while fetching
      setFetchError(true);
    }
  };

  return (
    <Router>
      <Nav product={product} fetchError={fetchError} setProduct={setProduct} setNeedToUpdate={setNeedToUpdate} />
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} product={product} fetchError={fetchError} />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product" element={<AddProduct setNeedToUpdate={setNeedToUpdate} />} />
        <Route path="/product/update/:id" element={<UpdateProduct setNeedToUpdate={setNeedToUpdate} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;
