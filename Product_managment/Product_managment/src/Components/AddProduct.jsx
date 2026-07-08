
import { useState } from 'react';
import API_BASE from '../config/api';

export default function AddProduct() {

    const [pname, setPname] =
        useState("");

    const [brand, setBrand] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [stock, setStock] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [image, setImage] =
        useState("");

    const [rating, setRating] =
        useState("");

    /*
     * ADD PRODUCT
     */

    const addProduct = async () => {

        const product = {

            pname: pname,

            prooductBrand: brand,

            productPrice: Number(price),

            stock: Number(stock),

            productDiscription: description,

            image: image,

            rating: Number(rating),

            productCategory: "General"
        };

        try {

            const response =
                await fetch(

                    `${API_BASE}/Product`,

                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(product)
                    }
                );

            console.log(
                "Response Status:",
                response.status
            );

            const data =
                await response.text();

            console.log(
                "Response Data:",
                data
            );

            alert(data);

            /*
             * CLEAR FIELDS
             */

            setPname("");
            setBrand("");
            setPrice("");
            setStock("");
            setDescription("");
            setImage("");
            setRating("");
        }

        catch(error) {

            console.error(
                "Add Product Error:",
                error
            );

            alert(
                "Something Went Wrong"
            );
        }
    };

    return (

        <div className="form-container">

            <h1>
                Add Product
            </h1>

            {/* PRODUCT NAME */}

            <input
                type="text"
                placeholder="Enter Product Name"
                value={pname}
                onChange={(e) =>
                    setPname(e.target.value)
                }
            />

            {/* BRAND */}

            <input
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) =>
                    setBrand(e.target.value)
                }
            />

            {/* PRICE */}

            <input
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) =>
                    setPrice(e.target.value)
                }
            />

            {/* STOCK */}

            <input
                type="number"
                placeholder="Enter Stock"
                value={stock}
                onChange={(e) =>
                    setStock(e.target.value)
                }
            />

            {/* DESCRIPTION */}

            <textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            {/* IMAGE */}

            <input
                type="text"
                placeholder="Enter Product Image URL"
                value={image}
                onChange={(e) =>
                    setImage(e.target.value)
                }
            />

            {/* RATING */}

            <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                placeholder="Enter Product Rating"
                value={rating}
                onChange={(e) =>
                    setRating(e.target.value)
                }
            />

            {/* BUTTON */}

            <button onClick={addProduct}>

                Add Product

            </button>

        </div>
    );
}

