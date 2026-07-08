import { useParams, useNavigate } from 'react-router-dom';

export default function ViewProduct({ Products }) {

    const { id } = useParams();
    const navigate = useNavigate();

    const product = Products.find(
        (item) => item.pid == id
    );

    if (!product) {

        return <h1>Product Not Found</h1>;
    }

    console.log(product);

    const stock = Number(product.stock ?? 0);
    const isOutOfStock = stock <= 0;
    const isLowStock = stock > 0 && stock <= 5;

    const addToCart = () => {

        let cart =
            JSON.parse(sessionStorage.getItem("cart")) || [];

        cart.push(product);

        sessionStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Product Added To Cart");
    }
    return (

        <div className="view-product-container">

            {/* LEFT SIDE IMAGE */}

            <div className="view-left">

                <img
                    src={product.image || 'https://via.placeholder.com/300'}
                    alt={product.pname}
                    className="product-image"
                />

            </div>

            {/* RIGHT SIDE DETAILS */}

            <div className="view-right">

                <h1>{product.pname}</h1>

                <p className="product-brand">
                    Brand : {product.prooductBrand}
                </p>

                <div className="product-rating">
                    ⭐ {product.rating}
                </div>

                <div className="product-price">
                    ₹ {product.productPrice}
                </div>

                <p className="product-description">
                    {product.productDiscription}
                </p>

                <p className={`product-stock ${isOutOfStock ? 'stock-out' : isLowStock ? 'stock-low' : 'stock-ok'}`}>
                    {isOutOfStock ? 'Out Of Stock' : `Stock: ${stock} Available`}
                </p>

                {/* TAGS */}

                <div className="tag-container">

                    {
                        product.productTag?.map((tag, index) => (

                            <span className="tag" key={index}>
                                {tag}
                            </span>
                        ))
                    }

                </div>

                {/* BUTTONS */}

                <div className="product-buttons">

                    <button
                        className="buy-btn"
                        onClick={() => {
                            sessionStorage.setItem(
                                "buyNowProduct",
                                JSON.stringify(product)
                            );
                            navigate('/checkout', { state: { product } });
                        }}
                        disabled={isOutOfStock}
                    >
                        Buy Now
                    </button>
                    <button
                        className="cart-btn"
                        disabled={isOutOfStock}
                        onClick={addToCart}
                    >
                        Add To Cart
                    </button>

                </div>

                {/* REVIEWS */}

                <div className="review-section">

                    <h2>Customer Reviews</h2>

                    {
                        product.productReview?.map((review, index) => (

                            <div className="review-card" key={index}>

                                <h4>
                                    {review.reviewerName}
                                </h4>

                                <p>
                                    ⭐ {review.rating}
                                </p>

                                <p>
                                    {review.comment}
                                </p>

                            </div>
                        ))
                    }

                </div>

            </div>

        </div>
    );
}