import React from "react";
import { Link } from "react-router-dom";
function Card(props) {
  const { productId, productName, productPrice } = props.product;
  return (
    <>
      <div className="col-sm-6 col-md-4  my-2">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">{productName}</h5>
            <p className="card-text">{productPrice}</p>
            <p className="card-text">{productId}</p>
            <Link to="/" className="btn btn-primary">
              visit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
