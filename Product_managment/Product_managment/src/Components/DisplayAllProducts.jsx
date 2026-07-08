import { Link, useNavigate } from 'react-router-dom';
export default function DisplayAllProducts({ ProductDetails }) {

    const navigate = useNavigate();

    const brand = ProductDetails?.prooductBrand || ProductDetails?.brand || 'Unknown';
    const stock = Number(ProductDetails?.stock ?? 0);
    const isOutOfStock = stock <= 0;
    const isLowStock = stock > 0 && stock <= 5;

    const handleBuyNow = () => {
        sessionStorage.setItem(
            "buyNowProduct",
            JSON.stringify(ProductDetails)
        );
        navigate('/checkout', { state: { product: ProductDetails } });
    };

    return (

        <div className="card product-card">

            <img
                src={ProductDetails?.image || 'https://via.placeholder.com/300'}
                alt={ProductDetails?.pname}
                className="product-image"
            />

            <h2>
                {ProductDetails?.pname}
            </h2>

            <p className="product-category">
                {brand}
            </p>

            <div className="card-meta-row">
                <span className="product-rating">⭐ {ProductDetails?.rating || '0.0'}</span>
                <span className={`product-stock ${isOutOfStock ? 'stock-out' : isLowStock ? 'stock-low' : 'stock-ok'}`}>
                    {isOutOfStock ? 'Out Of Stock' : `Stock: ${stock} Available`}
                </span>
            </div>

            <p>
                {ProductDetails?.productDiscription}
            </p>

            <h3>
                ₹ {ProductDetails?.productPrice}
            </h3>

            <div className="card-actions">
                <button
                    className="buy-now-btn"
                    onClick={handleBuyNow}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? 'Out Of Stock' : 'Buy Now'}
                </button>

                <Link to={`/product/${ProductDetails.pid}`} className="details-link">
                    View Details
                </Link>
            </div>

        </div>

    );
}