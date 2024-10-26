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

  function handelcart() {
    props.setCart(props.product);
  }
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
      <div className="card m-2" style={{ color: 'white', backgroundColor: 'rgb(60,60,60,60)' }}>
        <Link to={`product/${id}`} style={{ color: 'white', backgroundColor: 'rgb(60,60,60,60)', textDecoration: 'none' }}>
          <img className="card-img-top" alt="product img" src={image} height='300' style={{ objectFit: 'cover' }} />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text"><i style={{ color: 'cyan' }}>{brand}</i></p>
            <p className="card-text">{price} Rs</p>

          </div>
        </Link>
        <div className="text-center mt-2 mb-1">
          <button disabled={!available} className="btn btn-outline-light" onClick={handelcart}>
            {
              available ? 'Add To Cart' : 'Out Of Stock'
            }
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
