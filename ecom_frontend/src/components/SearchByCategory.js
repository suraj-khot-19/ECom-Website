import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Home from './Home';
function SearchByCategory() {
    const { cat } = useParams();

    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        searchByCategory();
        // eslint-disable-next-line 
    }, [cat])

    //search by category
    const searchByCategory = async () => {
        const url = `http://localhost:8080/api/product/category/${cat}`;
        try {
            const response = await fetch(url,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            if (response.status === 200) {
                const data = await response.json();
                setCategoryProducts(data);
            }
        } catch (error) {
            alert(error);
        }

    }
    return (
        <Home product={categoryProducts} />
    )
}

export default SearchByCategory