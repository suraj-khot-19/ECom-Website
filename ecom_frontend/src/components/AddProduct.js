import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function AddProduct(props) {

    // Initialize useNavigate
    const navigate = useNavigate();


    // prooduct
    const [product, setProduct] = useState({
        name: '',
        disc: '',
        release_date: '',
        price: 1000,
        brand: '',
        category: '',
        available: false,
        quantity: 1
    });

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
        formData.append("product", new Blob( // JavaScript-native format
            [JSON.stringify(product)],
            { type: "application/json" }
        ));

        try {
            const response = await axios.post("http://localhost:8080/api/product", formData, {
                headers: {
                    // multipart/form-data
                    "Content-Type": "multipart/form-data",
                },
            });

            //if 201
            alert("Product added successfully");
            if (response.status === 201) {
                navigate('/')
                props.setNeedToUpdate(true);
            }
        } catch (error) {
            alert("Error adding product:", error);
        }
    }

    return (
        <>
            <div className="container">
                <div className="my-5 text-center">
                    <h3>Add a Product</h3>
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
                        <div className="col-md-12 col-lg-4  mb-3">
                            <label htmlFor="date" className="form-label">Product Release Date</label>
                            <input type="date" className="form-control" id="date" name="release_date" placeholder='date' value={product.release_date} onChange={handelOnChangeForm} required />
                        </div>

                        {/* File */}
                        <div className="col-md-12 col-lg-4  mb-3">
                            <label htmlFor="img" className="form-label">Upload Photo{' (<1MB)'}</label>
                            <input type="file" className="form-control" id="img" onChange={handleImageChange} required />
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
        </>
    )
}

export default AddProduct