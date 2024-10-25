import React, { useState } from 'react'

function AddProduct() {

    // prooduct
    const [product, setProduct] = useState({ name: '', disc: '', release_date: '', price: '', brand: '', category: '', available: false, quantity: 0 });

    // image
    const [image, setImage] = useState(null)

    function handelOnChangeForm(e) {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        console.log(image);
    };

    function handelSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <div className="container">
                <div className="my-4 text-center">
                    <h3>Add Product</h3>
                </div>
                <form onSubmit={handelSubmit}>
                    <div className='row mb-3'>
                        <div className="col">
                            {/* name */}
                            <label htmlFor="name" className="form-label">Product Name</label>
                            <input type="text" className="form-control" id="name" name='name' placeholder='Asus Vivobook 15 Pro' value={product.name} onChange={handelOnChangeForm} />
                        </div>

                        {/* brand */}
                        <div className="col">
                            <label htmlFor="brand" className="form-label">Product Brand</label>
                            <input type="text" className="form-control" id="brand" placeholder='Asus' name='brand' value={product.brand} onChange={handelOnChangeForm} />
                        </div>
                    </div>

                    {/* descition */}
                    <div className="mb-3">
                        <label htmlFor="descrition" className="form-label">Product Desctiption</label>
                        <input type="text" className="form-control" id="descrition" placeholder='Good laptop for gaming and coding. love dev...' name='disc' value={product.disc} onChange={handelOnChangeForm} />
                    </div>

                    <div className='row mb-3'>
                        <div className="col">
                            {/* price */}
                            <label htmlFor="price" className="form-label">Product Price</label>
                            <input type="text" className="form-control" id="price" placeholder='70000 RS' name='price' value={product.price} onChange={handelOnChangeForm} />
                        </div>

                        {/* category */}
                        <div className="col">
                            <label htmlFor="category" className="form-label">Product Category</label>
                            <select name="category" className="form-select" value={product.category} onChange={handelOnChangeForm}>
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
                            <input type="number" className="form-control" id="quantity" placeholder='5' name='quantity' value={product.quantity} onChange={handelOnChangeForm} />
                        </div>

                        {/* Date */}
                        <div className="col">
                            <label htmlFor="date" className="form-label">Product Release Date</label>
                            <input type="date" className="form-control" id="date" name="release_date" placeholder='date' value={product.release_date} onChange={handelOnChangeForm} />
                        </div>

                        {/* File */}
                        <div className="col">
                            <label htmlFor="img" className="form-label">Upload Photo</label>
                            <input type="file" className="form-control" id="img" name="img" accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>


                    {/* available */}
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="pavailable" checked={product.available} onChange={(e) =>
                            setProduct({ ...product, available: e.target.checked })
                        } />
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