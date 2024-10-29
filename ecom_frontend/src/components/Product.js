import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import notFoundImage from '../assets/notfound.png';
import axios from 'axios';

export default function Product(props) {
    // to navigate
    const navigate = useNavigate();

    //states
    const [singleProduct, setSingleProduct] = useState([]);
    const [notFound, setNotFound] = useState(false)

    // image
    const [image, setImage] = useState(null);

    //get id from parameter which is comming as id from router itself
    const { id } = useParams();

    //effect
    useEffect(() => {
        if (id) {
            fetchingSingleProduct();
            fetchImageOfProduct();
        }
        // eslint-disable-next-line
    }, [id]);


    //fetch single product
    const fetchingSingleProduct = async () => {
        try {
            const url = `${props.apiUrl}/product/${id}`;
            const jsonData = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await jsonData.json();
            setSingleProduct(data);
        } catch (error) {
            setNotFound(true);
        }
    }

    //fetching an image of single product
    async function fetchImageOfProduct() {
        try {
            const url = `${props.apiUrl}/product/${id}/image`;
            const response = await axios(url,
                {
                    //type of blob
                    responseType: 'blob',
                }
            );

            //format url
            const imgUrl = URL.createObjectURL(await (response.data));

            setImage(imgUrl);
        } catch (error) {
            console.log(error);
            setImage(notFoundImage);
        }
    }


    //function to delete a product
    async function handelDelete() {
        const url = `${props.apiUrl}/product/delete/${id}`
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.status === 200) {
                alert('Product deleted sucessfully!');
                navigate('/');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const { name, disc, price, brand, release_date, category, available, quantity } = singleProduct;

    //---------------------------------------------------- cart------------------------------------------------
    //some() to check for existence
    const isCart = props.cartItems?.some(e => e.id === singleProduct.id);

    return (

        <>
            {
                //if no product
                notFound ? <div className='container m-auto text-center'>
                    <img src={notFoundImage} alt='Product not found....' style={{ height: '80vh' }} /></div> :

                    //if product
                    <div className="container m-auto h-100 mt-5">
                        <div className='d-flex justify-content-center align-items-center h-100'>

                            {/* image */}
                            <div style={{ width: '50%' }}>
                                <img src={image} alt='not found ...' style={{
                                    width: '100%', height: 'auto', maxHeight: '100vh', objectFit: 'contain', maxWidth: '80%'
                                }} />
                            </div>

                            {/* card */}
                            <div className='card pt-4 d-flex justify-content-center align-items-center' style={{ color: 'white', backgroundColor: 'transparent', width: '50%' }}>
                                <div className="card-body">

                                    {/* category */}
                                    <p><i style={{ color: 'cyan', fontWeight: 'bolder' }}>{category?.toUpperCase()}</i></p>

                                    {/* name */}
                                    <h2 className="card-title">{name}</h2>

                                    {/* brand */}
                                    <h6><i style={{ fontWeight: 'bolder' }}>{brand}</i></h6>

                                    {/* line */}
                                    <hr style={{ width: '50vw', border: '2px solid rgba(200,200,220,0.5' }} />

                                    {/* disc */}
                                    <p className="card-text">{disc}</p>

                                    {/* price */}
                                    <p className="card-text" style={{ fontSize: '1.3rem' }}>{price} Rs</p>

                                    {/* button */}
                                    <button disabled={!available || isCart} className="btn btn-outline-light mb-2"
                                        onClick={() => {
                                            props.setCartItems((prev) => [...prev, singleProduct]);
                                            navigate('/cart');
                                        }}>
                                        {
                                            isCart ? 'Checkout in cart' : available ? 'Add To Cart' : 'Out Of Stock'
                                        }
                                    </button>

                                    <p className="card-text">Stock Available: {quantity}</p>

                                    Product listed on:
                                    <p className="card-text"><i>{release_date}</i></p>

                                    <div className="d-flex">
                                        <Link to={`/product/update/${id}`} className="btn btn-outline-light me-2">
                                            Update
                                        </Link>
                                        <button onClick={handelDelete} className="btn btn-outline-light">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>


                    </div>
            }
        </>
    )
}
