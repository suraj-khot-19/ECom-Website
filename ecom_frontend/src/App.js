import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProd";
import SearchByCategory from "./components/SearchByCategory";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product" element={<AddProduct />} />
        <Route path="/product/update/:id" element={<UpdateProduct />} />
        <Route path="/product/category/:cat" element={<SearchByCategory />} />
      </Routes>
    </Router>
  );
}

export default App;
