import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import notfoundimg from './notfound.png';

function UpdateProd(props) {
    // Initialize useNavigate
    const navigate = useNavigate();

    //get id from parameter which is comming as id
    const { id } = useParams();

    //to load product data
    useEffect(() => {
        loadData();
        fetchImage();
        // eslint-disable-next-line 
    }, []);

    //to load product data
    async function loadData() {
        const url = `http://localhost:8080/api/product/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (response.status === 200) {
            setProduct({
                name: data.name,
                disc: data.disc,
                release_date: data.release_date,
                price: data.price,
                brand: data.brand,
                category: data.category,
                available: data.available,
                quantity: data.quantity
            })
        }
    }

    // to load image
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
            const imgFile = await urlToFile(response.data, response.data.imgName);
            if (response.status === 200) {
                setImage(imgFile);
            }
            else {
                setImage(notfoundimg);
                setFetchError(true);
            }
        } catch (error) {
            setFetchError(true);
        }
    }

    // converting imag to file
    const urlToFile = async (blobData, fileName) => {
        const file = new File([blobData], fileName, { type: blobData.type });
        return file;
    }



    // prooduct
    const [product, setProduct] = useState({});

    // image
    const [image, setImage] = useState(null)

    // editing
    const [editing, setEditing] = useState(false)

    //error
    const [fetchError, setFetchError] = useState(false)

    // handelinng input change
    function handelOnChangeForm(e) {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        setEditing(true);
    }

    // handel image change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    // handel form submit
    async function handleSubmit(e) {
        // do not reload
        e.preventDefault();

        // creating form data
        const formData = new FormData(); //a set of key/value pairs 
        formData.append("file", image);
        console.log("id:", id)
        formData.append("product",
            new Blob( // JavaScript-native format
                [JSON.stringify(product)],
                { type: "application/json" }
            ));

        try {
            const response = await axios.put(`http://localhost:8080/api/product/update/${id}`, formData, {
                headers: {
                    // multipart/form-data
                    "Content-Type": "multipart/form-data",
                },
            });

            //if 200
            if (response.status === 200) {
                alert("Product updated successfully");
                navigate('/')
                props.setNeedToUpdate(true);
            }
            else {
                setFetchError(true);
            }
        } catch (error) {
            alert("Error updating product: ");
            setFetchError(true);
        }
    }

    return (
        <div>

            {fetchError ? <div style={{ margin: 'auto auto', height: '100vh' }}>
                <img src={notfoundimg} height='80%' width='80%' alt='not found...' style={{ objectFit: 'contain' }} />
                <h2 className='text-center'>Product not found</h2>
            </div> :
                <div className="container">
                    <div className="my-5 text-center">
                        <h3>Update a Product, {product.name}</h3>
                    </div>
                    {/* form */}
                    <form onSubmit={handleSubmit}>
                        <div className='row mb-3'>
                            <div className="col-md-12 col-lg-6 mb-3">

                                {/* name */}
                                <label htmlFor="name" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="name" name='name' placeholder='Asus Vivobook 15 Pro' value={product.name} onChange={handelOnChangeForm} required />
                            </div>

                            {/* brand */}
                            <div className="col-md-12 col-lg-6 mb-3">
                                <label htmlFor="brand" className="form-label">Product Brand</label>
                                <input type="text" className="form-control" id="brand" placeholder='Asus' name='brand' value={product.brand} onChange={handelOnChangeForm} required />
                            </div>
                        </div>

                        {/* descition */}
                        <div className="mb-3">
                            <label htmlFor="descrition" className="form-label">Product Desctiption</label>
                            <input type="text" className="form-control" id="descrition" placeholder='Good laptop for gaming and coding. love dev...' name='disc' value={product.disc} onChange={handelOnChangeForm} required />
                        </div>

                        <div className='row mb-3'>
                            <div className="col-md-12 col-lg-6 mb-3">
                                {/* price */}
                                <label htmlFor="price" className="form-label">Product Price</label>
                                <input type="number" className="form-control" id="price" placeholder='70000 RS' name='price' value={product.price} onChange={handelOnChangeForm} required />
                            </div>

                            {/* category */}
                            <div className="col-md-12 col-lg-6 mb-3">
                                <label htmlFor="category" className="form-label">Product Category</label>
                                <select name="category" className="form-select" value={product.category} onChange={handelOnChangeForm} required  >
                                    <option value=''>Select Category</option>
                                    <option value="Laptop">Laptop</option>
                                    <option value="Headphone">Headphone</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Toys">Toys</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="shoes">Shoes</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-12 col-lg-4 mb-3">
                                {/* Quantity */}
                                <label htmlFor="quantity" className="form-label">Product Quantity</label>
                                <input type="number" className="form-control" id="quantity" placeholder='5' name='quantity' value={product.quantity} onChange={handelOnChangeForm} required />
                            </div>

                            {/* Date */}
                            <div className="col-md-12 col-lg-4 mb-3">
                                <label htmlFor="date" className="form-label">Product Release Date</label>
                                <input type="date" className="form-control" id="date" name="release_date" placeholder='date' value={product.release_date} onChange={handelOnChangeForm} required />
                            </div>

                            {/* File */}
                            <div className="col-md-12 col-lg-4 mb-3">
                                <label htmlFor="img" className="form-label">Upload New Photo here</label>
                                <input type="file" className="form-control" id="img" placeholder='upload image' onChange={handleImageChange} />

                                {/* modal start */}
                                <div className="my-3 text-end me-2">
                                    <div type="btn-sm" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Exsiting Image
                                    </div>
                                </div>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: 'black', fontWeight: 'bolder', textDecoration: 'underline' }}>Product : {product.name}</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body text-center">
                                                <img src={image ? URL.createObjectURL(image) : "image unavailable"} alt='img' style={{
                                                    width: '90%',
                                                    height: '90%',
                                                    objectFit: 'cover',
                                                    padding: '3px',
                                                    margin: '0'
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* modal end */}

                            </div>
                        </div>

                        {/* available */}
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="pavailable"
                                //handel checked
                                checked={product.available}
                                //handle available 
                                onChange={(e) =>
                                    setProduct({ ...product, available: e.target.checked })
                                }
                            />
                            <label className="form-check-label" htmlFor="pavailable">Product Available</label>
                        </div>


                        {/* submit */}
                        <button disabled={!editing} type="submit" className="btn btn-outline-light">Submit</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default UpdateProd