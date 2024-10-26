import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

function UpdateProd() {
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
            setImage(imgFile);
        } catch (error) {
            console.log(error);
            setImage('');
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

    // handelinng input change
    function handelOnChangeForm(e) {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
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
            }
        } catch (error) {
            alert("Error updating product: ");
            navigate("/");
        }
    }

    return (
        <div>

            <div className="container">
                <div className="my-5 text-center">
                    <h3>Add a Product</h3>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit}>
                    <div className='row mb-3'>
                        <div className="col">

                            {/* name */}
                            <label htmlFor="name" className="form-label">Product Name</label>
                            <input type="text" className="form-control" id="name" name='name' placeholder='Asus Vivobook 15 Pro' value={product.name} onChange={handelOnChangeForm} required />
                        </div>

                        {/* brand */}
                        <div className="col">
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
                        <div className="col">
                            {/* price */}
                            <label htmlFor="price" className="form-label">Product Price</label>
                            <input type="number" className="form-control" id="price" placeholder='70000 RS' name='price' value={product.price} onChange={handelOnChangeForm} required />
                        </div>

                        {/* category */}
                        <div className="col">
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
                        <div className="col">
                            {/* Quantity */}
                            <label htmlFor="quantity" className="form-label">Product Quantity</label>
                            <input type="number" className="form-control" id="quantity" placeholder='5' name='quantity' value={product.quantity} onChange={handelOnChangeForm} required />
                        </div>

                        {/* Date */}
                        <div className="col">
                            <label htmlFor="date" className="form-label">Product Release Date</label>
                            <input type="date" className="form-control" id="date" name="release_date" placeholder='date' value={product.release_date} onChange={handelOnChangeForm} required />
                        </div>

                        {/* File */}
                        <div className="col">
                            <label htmlFor="img" className="form-label">Upload New Photo here</label>
                            <img src={image ? URL.createObjectURL(image) : "image unavailable"} alt='img' style={{
                                width: '100%',
                                height: '180px',
                                objectFit: 'cover',
                                padding: '3px',
                                margin: '0'
                            }} />
                            <input type="file" className="form-control" id="img" placeholder='upload image' onChange={handleImageChange} />
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
                    <button type="submit" className="btn btn-outline-light">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProd