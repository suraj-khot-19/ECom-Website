import React from "react";
import { Link } from "react-router-dom";
function Card(props) {
  const { id, name, brand, price } = props.product;
  return (
    <>
      <div className="col-xl-3 col-sm-6 col-md-4">
        <div className="card m-2">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{brand}</p>
            <p className="card-text">{id}</p>
            <p className="card-text">{price}</p>
            <Link to="/" className="btn btn-outline-dark">
              Add To Cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
