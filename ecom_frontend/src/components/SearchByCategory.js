import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card';


function SearchByCategory() {
    //parameter cat
    const { cat } = useParams();

    //states
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [fetchError, setFetchError] = useState(false)

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
            else {
                setFetchError(true)
            }
        } catch (error) {
            setFetchError(true)
        }

    }
    return (
        <>
            <div className="container mt-3 mx-3">
                <div className="text-center my-2">
                    <span className='fs-5'>Products with category <span className='fw-bold fs-4'>: {cat}</span> </span>
                </div>
                {fetchError ? (
                    <div className="container d-flex justify-content-center align-items-center min-vh-100 text-center">
                        <h3>
                            Something went wrong <br /> while fetching data from server ...
                        </h3>
                    </div>
                ) : (
                    <div className="row">
                        {categoryProducts.length === 0 ?
                            <div className="container text-center" style={{ marginTop: '30vh' }}>
                                <h5>No Product Found....</h5>
                            </div>
                            :
                            categoryProducts?.map((e) => {
                                return <div className="col-xl-3 col-sm-6 col-md-4" key={e.id}>
                                    <Card product={e} />
                                </div>
                            })}
                    </div>
                )}


                <div className="mb-5">
                    {/* empty space */}
                </div>
            </div>
        </>
    )
}

export default SearchByCategory