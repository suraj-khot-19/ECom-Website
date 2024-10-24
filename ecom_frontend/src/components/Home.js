import React, { useState, useEffect } from "react";
import Card from "./Card";

export default function Home() {
  // state
  const [product, setProduct] = useState([]);
  const [fetchError, setFetchError] = useState(false);

  //   fetch products
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

  //useeffect
  useEffect(() => {
    getProducts();
    console.log(product)
    // eslint-disable-next-line 
  }, []);

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
            {product.map((e) => {
              return <div className="col-xl-3 col-sm-6 col-md-4" key={e.id}>
                <Card product={e} />
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
