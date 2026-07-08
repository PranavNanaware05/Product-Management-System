import { useState } from 'react';
import API_BASE from '../config/api';

export default function UpdateProduct() {

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");

    const updateProduct = async () => {

        const response = await fetch(
            `${API_BASE}/Product?id=${id}&name=${title}`,
            {
                method: 'PUT',
            }
        );

        const data = await response.text();

        alert(data);

        console.log(data);
    }

    return (

        <div className='form-container'>

            <h1>Update Product</h1>

            <input
                type="text"
                placeholder="Enter Product ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />

            <input
                type="text"
                placeholder="Enter New Product Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={updateProduct}>
                Update Product
            </button>

        </div>

    );
}