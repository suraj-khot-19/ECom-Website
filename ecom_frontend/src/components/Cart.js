import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Cart(props) {
    // State for image URLs
    const [imgUrls, setImgUrls] = useState([]);
    const { cartItems, setCartItems } = props;

    useEffect(() => {
        fetchImages();
    }, [cartItems]);

    // Function to fetch images for cart items
    const fetchImages = async () => {
        const urls = await Promise.all(cartItems.map(async (item) => {
            const imgUrl = await fetchImage(item.id);
            return imgUrl;
        }));
        setImgUrls(urls);
    };

    // Function to fetch product image
    const fetchImage = async (id) => {
        let url = `http://localhost:8080/api/product/${id}/image`;
        try {
            const response = await axios.get(url, {
                responseType: 'blob'
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error("Error fetching image:", error);
            return '';
        }
    };

    return (
        <div className="container mt-2">
            {
                cartItems.length === 0 ? (
                    <div className="container text-center mt-2">
                        <h5>Cart is Empty....</h5>
                    </div>
                ) : (
                    <div className='row'>
                        <div className="text-center mb-2">
                            <h4 className='mt-3'>Cart Items</h4>
                        </div>
                        {
                            cartItems.map((e, idx) => (
                                <div className="col-xl-3 col-sm-6 col-md-4" key={e.id}>
                                    <div className="card mx-2 my-5" style={{ color: 'white', backgroundColor: 'rgb(60,60,60,60)' }}>
                                        <Link to={`/product/${e.id}`} style={{ color: 'white', backgroundColor: 'rgb(60,60,60,60)', textDecoration: 'none' }}>
                                            {/* Image */}
                                            <img className="card-img-top" alt={`${e.name}`} src={imgUrls[idx] || ''} height='300' style={{ objectFit: 'cover' }} />

                                            {/* Card body */}
                                            <div type="button" style={{ position: 'absolute', top: '10px', left: '5px', zIndex: '25' }}>
                                                <span className="translate-middle badge rounded-pill bg-warning">
                                                    <i style={{ color: 'black' }}>{e.brand}</i>
                                                </span>
                                            </div>

                                            <div className="card-body">
                                                {/* Name */}
                                                <h5 className="card-title">{e.name.length > 30 ? e.name.slice(0, 26) + "..." : e.name}</h5>

                                                {/* Price */}
                                                <p className="card-text">{e.price} Rs</p>
                                                <div style={{ minHeight: '47px' }}>
                                                    <p className="card-text">{e.disc.length > 60 ? e.disc.slice(0, 60) + "..." : e.disc}</p>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="text-center mt-2 mb-1">
                                            <button className="btn btn-outline-light"
                                                onClick={() => {
                                                    const updatedCartItems = cartItems.filter((x) => x.id !== e.id);
                                                    setCartItems(updatedCartItems);
                                                }}
                                            >
                                                Remove from cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            <div className="mb-5"></div> {/* Empty space */}
        </div>
    );
}

export default Cart;
