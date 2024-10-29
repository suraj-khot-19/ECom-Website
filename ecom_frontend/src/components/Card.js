import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from 'react'
function Card(props) {
  //api url
  const apiUrl = process.env.REACT_APP_API_URL;

  //destructre product
  const { id, name, brand, price, available, disc } = props.product;

  //states
  const [image, setImage] = useState();

  //navigate
  const navigate = useNavigate();

  // effect
  useEffect(() => {
    fetchImage();
    isInCart();
    // eslint-disable-next-line 
  }, [id, props.cartItems])

  // function to fetch product image
  async function fetchImage() {
    let url = `${apiUrl}/product/${id}/image`;
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

  //is in cart
  const [isCart, setIsCart] = useState(false);
  const isInCart = () => {
    //some() to check for existence
    const exists = props.cartItems?.some(e => e.id === id);
    setIsCart(exists);
  }
  return (
    <>
      <div className="card mx-2 my-5" style={{ color: 'white', backgroundColor: 'rgb(60,60,60,60)' }}>
        <Link to={`/product/${id}`} style={{ color: 'white', backgroundColor: 'rgb(60,60,60,60)', textDecoration: 'none' }}>
          {/* image */}
          <img className="card-img-top" alt="product img" src={image} height='300' style={{ objectFit: 'cover' }} />
          {/* card body */}

          {/* badge */}
          <div type="button" style={{ position: 'absolute', top: '10px', left: '5px', zIndex: '25' }}>
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

          <button disabled={!available || isCart} className="btn btn-outline-light"
            onClick={() => {
              props.setCartItems((prev) => [...prev, props.product]);
              navigate('/cart');
            }}
          >
            {
              isCart ? 'Check out in cart' : available ? 'Add To Cart' : 'Out Of Stock'
            }
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
