import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Product() {
    const [singleProduct, setSingleProduct] = useState([]);
    const [notFound, setNotFound] = useState(false)

    //get id from parameter which is comming as id
    const { id } = useParams();

    const fetchingSingleProduct = async () => {
        try {
            console.log("fetching")
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

    useEffect(() => {
        fetchingSingleProduct();
    }, [])


    return (

        <>
            {
                notFound ? <h1>Product not found</h1> :
                    <h1>{singleProduct.name}</h1>
            }
        </>
    )
}
