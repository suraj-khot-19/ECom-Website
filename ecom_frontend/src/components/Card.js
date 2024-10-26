import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react'
function Card(props) {
  const { id, name, brand, price, available } = props.product;

  const [image, setImage] = useState();

  // effect
  useEffect(() => {
    fetchImage();
    // eslint-disable-next-line 
  }, [id])


  // function to fetch product image
  async function fetchImage() {
    let url = ` http://localhost:8080/api/product/${id}/image`;
    try {
      // fire to get
      const response = await axios.get(
        url,
        {
          // response type is blob
          responseType: 'blob'
        }
      );
      const imgurl = URL.createObjectURL((await response).data);
      setImage(imgurl);
    } catch (error) {
      console.log(error);
      setImage('');
    }

  }
  return (
    <>
      <Link to={`product/${id}`} style={{ textDecoration: 'none' }}>
        <div className="card m-2" style={{ color: 'white', backgroundColor: 'rgb(60,60,60,60)' }}>
          <img className="card-img-top" alt="product img" src={image} />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text"><i style={{ color: 'cyan' }}>{brand}</i></p>
            <p className="card-text">{price} Rs</p>
            <div className="text-center">
              <button disabled={!available} className="btn btn-outline-light">
                {
                  available ? 'Add To Cart' : 'Out Of Stock'
                }
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default Card;
