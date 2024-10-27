import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Nav(props) {
  //take from app.js
  const { product, fetchError } = props;

  //load when changes
  useEffect(() => {
  }, [product, fetchError])

  //states
  const [keyword, setKeyword] = useState('');

  //handel seacrch form change
  function handelChange(e) {
    e.target.name = e.target.value;
    setKeyword(e.target.value);
    searching();
    console.log("products", product)
  }

  //api request for search
  async function searching() {
    const url = `http://localhost:8080/api/product/search?keyword=${keyword}`;
    //try catch
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      //set that product
      props.setProduct(data);
    } catch (error) {
      alert('error while fetching');
    }
  }

  //list of categories
  const cats = ['Laptop', 'Headphone', 'Mobile', 'Electronics', 'Toys', 'Fashion', 'Shoes'];

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">ECom-Web</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* home */}
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active fw-bold" : "nav-link"} aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              {/* add product */}
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? 'nav-link active fw-bold' : 'nav-link'} aria-current="page" to="/product">
                  Add Product
                </NavLink>
              </li>

              {/* select category */}
              <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </div>
                <ul className="dropdown-menu">
                  {
                    // category and its function
                    cats.map((cat) => {
                      return (
                        <li key={cat}>
                          {/* go to category page */}
                          <Link to={`product/category/${cat}`} className="dropdown-item">{cat}</Link>
                        </li>
                      );
                    })
                  }
                </ul>
              </li>
            </ul>

            {/* search feature */}
            <form className="d-flex" role="search" >
              <input disabled={fetchError} className="form-control me-2" type="search" placeholder="Search Products" name="keyword" value={keyword} onChange={handelChange} />

              {
                ///if searching then only
                keyword.length >= 1 &&
                <div
                  className="w-100 mt-1 shadow position-absolute"
                  style={{ maxWidth: '200px', maxHeight: '250px', overflowY: 'unset', right: '22px', zIndex: '20', top: '100%' }}
                >
                  {/* Close button */}
                  <div className="shadow position-absolute" style={{ right: '5px', top: '5px', zIndex: '35' }}>
                    <button onClick={() => {
                      props.setNeedToUpdate(true);
                      setKeyword('');
                    }} type="button" className="btn-close btn-sm" aria-label="Close"></button>
                  </div>

                  {/* list of products */}
                  <ul className="list-group" >
                    {
                      //if no product
                      product.length === 0 ?
                        <div>
                          <li
                            className="list-group-item">
                            <span className="search-result-link">No product found</span>
                          </li>
                        </div>
                        :
                        // if there map through product
                        product.map((e) => (
                          <li key={e.id} className="list-group-item">
                            <Link
                              //after clicking category close search window
                              onClick={() => {
                                setKeyword('');
                                props.setNeedToUpdate(true);
                              }}
                              //if select perticular product
                              to={`/product/${e.id}`}
                              className="search-result-link"
                              style={{ textDecoration: 'none', color: 'rgb(200,200,200)' }}>
                              <span>{e.name.length > 25 ? e.name.slice(0, 22) + "..." : e.name}</span>
                            </Link>
                          </li>
                        ))
                    }
                  </ul>

                </div>
              }
            </form>


          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
