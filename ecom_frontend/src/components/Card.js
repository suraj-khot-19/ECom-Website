import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react'
function Card(props) {
  const { id, name, brand, price, available, disc } = props.product;

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
          {/* image */}
          <img className="card-img-top" alt="product img" src={image} height='300' style={{ objectFit: 'cover' }} />
          {/* card body */}

          {/* badge */}
          <div type="button" style={{ position: 'absolute', top: '10px', left: '2px', zIndex: '25' }}>
            <span className="translate-middle badge rounded-pill bg-warning">
              <i style={{ color: 'black' }}>{brand}</i>
            </span>
          </div>

          <div className="card-body">
            {/* name */}
            <h5 className="card-title">{name.length > 30 ? name.slice(0, 26) + "..." : name}</h5>

            {/* price */}
            <p className="card-text">{price} Rs</p>
            <div style={{ minHeight: '47px' }}>
              <p className="card-text">{disc.length > 60 ? disc.slice(0, 60) + "..." : disc}</p>

            </div>
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
