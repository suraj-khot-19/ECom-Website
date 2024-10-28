import React, { useEffect, useState } from "react";
import Card from "./Card";

export default function Home(props) {

  //states
  const [product, setProduct] = useState([])
  const [fetchError, setFetchError] = useState(false)

  //effect
  useEffect(() => {
    getProducts();
  }, [])


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
    <>
      <div className="container mt-3 px-1">
        <div className="my-2">
          <h4 className="text-center">Welcome to Ecom-Website</h4>
        </div>
        {fetchError ? (
          <div className="container d-flex justify-content-center align-items-center min-vh-100 text-center">
            <h3>
              Something went wrong <br /> while fetching data from server ...
            </h3>
          </div>
        ) : (
          <div className="mx-auto">
            <div className="row justify-content-center">
              {product.length === 0 ?
                <div className="container text-center" style={{ marginTop: '30vh' }}>
                  <h5>No Product Found....</h5>
                </div>
                :
                product?.map((e) => {
                  return <div className="col-xl-3 col-sm-6 col-md-4" key={e.id}>
                    <Card product={e} setCartItems={props.setCartItems} cartItems={props.cartItems} />
                  </div>
                })}
            </div>
          </div>
        )}


        <div className="mb-5">
          {/* empty space */}
        </div>
      </div>
    </>
  );
}
