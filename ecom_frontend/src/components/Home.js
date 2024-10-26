import React, { useEffect } from "react";
import Card from "./Card";

export default function Home(props) {
  //take from app.js
  const { product, fetchError } = props;

  //load when changes
  useEffect(() => {
  }, [product, fetchError])

  return (
    <>
      <div className="container mt-5">
        {fetchError ? (
          <div className="container d-flex justify-content-center align-items-center min-vh-100 text-center">
            <h3>
              Something went wrong <br /> while fetching data from server ...
            </h3>
          </div>
        ) : (
          <div className="row">
            {product.length === 0 ?
              <div className="container text-center" style={{ marginTop: '30vh' }}>
                <h5>No Product Found....</h5>
              </div>
              :
              product?.map((e) => {
                return <div className="col-xl-3 col-sm-6 col-md-4" key={e.id}>
                  <Card product={e} cart={props.cart} setCart={props.setCart} />
                </div>
              })}
          </div>
        )}


        <div className="mb-5">
          {/* empty space */}
        </div>
      </div>
    </>
  );
}
