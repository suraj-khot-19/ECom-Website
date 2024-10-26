import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
function Cart(props) {
    const cart = localStorage.getItem('cartProduct');
    const { available, brand, id, category, disc, imgData, imgName, name, price, quantity, release_date } = cart;

    console.log(cart)
    // const [image, setImage] = useState(null)
    // useEffect(() => {
    //     setImage(urlToFile(imgData, imgName));
    //     console.log(props)
    // }, [])

    // // converting imag to file
    // const urlToFile = async (blobData, fileName) => {
    //     const file = new File([blobData], fileName, { type: blobData.type });
    //     return file;
    // }
    return (
        <div className='container'>
            <div className="card m-2" style={{ width: '95%', color: 'white', backgroundColor: 'rgb(60,60,60,60)' }}>
                <Link to={`product/${id}`} style={{ color: 'white', backgroundColor: 'rgb(60,60,60,60)', textDecoration: 'none' }}>
                    {/* <img className="card-img-top" alt="product img" src={image} /> */}
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text"><i style={{ color: 'cyan' }}>{brand}</i></p>
                        <p className="card-text">{disc} </p>
                        <p className="card-text">{release_date} </p>
                        <p className="card-text">{quantity} </p>
                        <p className="card-text">{category} </p>
                        <p className="card-text">{available} </p>
                        <p className="card-text">{price} Rs</p>

                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Cart