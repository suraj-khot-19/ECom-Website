import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Nav(props) {
  //take from app.js
  const { product, fetchError } = props;

  //load when changes
  useEffect(() => {
  }, [product, fetchError])

  const [keyword, setKeyword] = useState('');
  const [searchByCat, setSearchByCat] = useState({ bool: false, key: '' })

  function handelChange(e) {
    e.target.name = e.target.value;
    setKeyword(e.target.value);
    searching();
  }

  async function searching() {
    const url = `http://localhost:8080/api/product/search?keyword=${keyword}`;

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

  const cats = [
    'Laptop',
    'Headphone',
    'Mobile',
    'Electronics',
    'Toys',
    'Fashion',
    'Shoes'];

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
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li> <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/product">
                  Add Product
                </Link>
              </li>
              <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </div>
                <ul className="dropdown-menu">
                  {
                    cats.map((e) => {
                      return (
                        <li key={e}>
                          <span
                            onClick={() => {
                              // Separate products into matching and non-matching categories
                              const selectedProds = product.filter((x) => x.category === e);
                              const otherProds = product.filter((x) => x.category !== e);

                              // Combine
                              const sortedProds = [...selectedProds, ...otherProds];

                              // Update 
                              props.setProduct(sortedProds);

                              //setSearchByCat
                              setSearchByCat({ bool: true, key: e });
                            }}
                            className="dropdown-item"
                          >
                            {e}
                          </span>
                        </li>
                      );
                    })

                  }

                </ul>
              </li>
              {
                searchByCat.bool && <div className="nav-item m-1 px-2 py-1 border">
                  <div className="d-flex justify-content-center align-items-center">
                    <span>{searchByCat.key}</span>
                    <div className="shadow ms-2">
                      <button onClick={() => {
                        props.setNeedToUpdate(true);
                        props.setNeedToUpdate(true);
                        setSearchByCat({ bool: false, key: '' });
                      }} type="button" className="btn-close btn-sm" aria-label="Close"></button>
                    </div>
                  </div>
                </div>
              }
            </ul>
            <div className="me-3">
              <Link to="/cart">
                <i
                  className="fa-solid fa-cart-shopping fa-xl"
                  style={{ color: "white", cursor: "pointer" }}
                ></i>
              </Link>
            </div>
            <form className="d-flex" role="search" >
              <input
                disabled={fetchError}
                className="form-control me-2"
                type="search"
                placeholder="Search Products"
                aria-label="Search"
                name="keyword"
                value={keyword}
                onChange={handelChange}
              />

              {keyword.length >= 1 &&
                <div
                  className="w-100 mt-1 shadow position-absolute"
                  style={{
                    maxWidth: '200px',
                    maxHeight: '250px',
                    overflowY: 'unset',
                    right: '22px',
                    zIndex: '20',
                    top: '100%'
                  }}
                >
                  {/* Close button */}
                  <div className="shadow position-absolute" style={{ right: '5px', top: '5px', zIndex: '35' }}>
                    <button onClick={() => setKeyword('')} type="button" className="btn-close btn-sm" aria-label="Close"></button>
                  </div>
                  <ul className="list-group" >
                    {product.map((e) => (
                      <li key={e.id} className="list-group-item">
                        <Link onClick={() => setKeyword('')} to={`/product/${e.id}`} className="search-result-link" style={{ textDecoration: 'none', color: 'rgb(200,200,200)' }}>
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
