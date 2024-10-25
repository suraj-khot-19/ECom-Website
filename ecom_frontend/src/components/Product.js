import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import notFoundImage from './notfound.png';
import axios from 'axios';

export default function Product() {
    const [singleProduct, setSingleProduct] = useState([]);
    const [notFound, setNotFound] = useState(false)

    // image
    const [image, setImage] = useState(null);

    //get id from parameter which is comming as id
    const { id } = useParams();

    const fetchingSingleProduct = async () => {
        try {
            const url = `http://localhost:8080/api/product/${id}`;
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

    //fetching an image
    async function fetchImageOfProduct() {
        try {
            const url = `http://localhost:8080/api/product/${id}/image`;
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

    useEffect(() => {
        if (id) {
            fetchingSingleProduct();
            fetchImageOfProduct();
        }
        // eslint-disable-next-line
    }, [id])

    const { name, disc, price, brand, release_date, category, available, quantity } = singleProduct;
    return (

        <>
            {
                //if no product
                notFound ? <div className='container m-auto text-center'>
                    <img src={notFoundImage} alt='Product not found....' style={{ height: '80vh' }} /></div> :

                    //if product
                    <div className="container m-auto h-100">
                        <div className='d-flex justify-content-center align-items-center h-100'>

                            {/* image */}
                            <div style={{ width: '50%' }}>
                                <img src={image} alt='not found ...' style={{
                                    width: '100%', height: 'auto', maxHeight: '100%', objectFit: 'contain', maxWidth: '80%'
                                }} />
                            </div>

                            {/* disc */}
                            <div className='card pt-4 d-flex justify-content-center align-items-center' style={{ color: 'white', backgroundColor: 'transparent', width: '50%' }}>
                                <div className="card-body">

                                    <p><i style={{ color: 'cyan', fontWeight: 'bolder' }}>{category?.toUpperCase()}</i></p>

                                    <h2 className="card-title">{name}</h2>

                                    <h6><i style={{ fontWeight: 'bolder' }}>{brand}</i></h6>

                                    <hr />

                                    <p className="card-text">{disc}</p>

                                    <p className="card-text" style={{ fontSize: '1.3rem' }}>{price} Rs</p>

                                    <button disabled={!available} className="btn btn-outline-light mb-2">
                                        {available ? 'Add To Cart' : 'Out Of Stock'}
                                    </button>

                                    <p className="card-text">Stock Available: {quantity}</p>

                                    Product listed on:
                                    <p className="card-text"><i>{release_date}</i></p>

                                    <div className="d-flex">
                                        <button to="/" className="btn btn-outline-light me-2">
                                            Update
                                        </button>
                                        <button to="/" className="btn btn-outline-light">
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
