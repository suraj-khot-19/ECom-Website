import React, { useState, useEffect } from "react";
import Card from "./Card";

export default function Home() {
  // state
  const [product, setProduct] = useState([]);

  //   fetch products
  const getProducts = async () => {
    const url = "http://localhost:8080/products";

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
      console.log(error);
    }
  };

  //useeffect
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {product.map((e) => {
            return <Card key={e.productId} product={e} />;
          })}
        </div>
      </div>
    </>
  );
}
