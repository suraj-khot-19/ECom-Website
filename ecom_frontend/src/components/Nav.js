import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Nav() {
  //state
  const [product, setProduct] = useState([])
  const [keyword, setKeyword] = useState('');

  //handel seacrch form change
  function handelChange(e) {
    e.target.name = e.target.value;
    //set keyword
    setKeyword(e.target.value);
    searching();
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
      setProduct(data);
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
                <Link className='nav-link' aria-current="page" to="/product">
                  Add Product
                </Link>
              </li>

              {/* ----------------------------------------------------  select category ----------------------------------------------------  */}
              <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category's
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

            {/* ---------------------------------------------------- search feature ---------------------------------------------------- */}
            <form className="d-flex" role="search" >
              <input className="form-control me-2" type="search" placeholder="Search Products" name="keyword" value={keyword} onChange={handelChange} />

              {
                ///if searching then only
                keyword.length >= 1 &&
                <div
                  className="w-100 mt-1 shadow position-absolute"
                  style={{ maxWidth: '200px', maxHeight: '250px', overflowY: 'unset', right: '22px', zIndex: '20', top: '100%' }}
                >
                  {/* Close button */}
                  <div className="shadow position-absolute" style={{ right: '5px', top: '5px', zIndex: '35' }}>
                    <button onClick={() => { setKeyword(''); }} type="button" className="btn-close btn-sm" aria-label="Close"></button>
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
                              }}
                              //if select perticular product
                              to={`/product/${e.id}`}
                              className="search-result-link"
                              style={{ textDecoration: 'none', color: 'rgb(200,200,200)' }}>
                              <span>{e.name}</span>
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
