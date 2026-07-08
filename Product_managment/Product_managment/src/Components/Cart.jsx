import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Cart() {

    const [cartItems, setCartItems] = useState(
        JSON.parse(sessionStorage.getItem("cart")) || []
    );

    /*
     * REMOVE PRODUCT
     */

    const removeFromCart = (pid) => {

        const updatedCart =
            cartItems.filter(
                (item) => item.pid !== pid
            );

        setCartItems(updatedCart);

        sessionStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    }

    /*
     * TOTAL PRICE
     */

    const totalPrice =
        cartItems.reduce(
            (total, item) =>
                total + item.productPrice,
            0
        );

    return (

        <div className="cart-container">

            <h1>
                Shopping Cart
            </h1>

            {
                cartItems.length === 0
                    ?
                    (
                        <div className="empty-cart">

                            Your cart is empty

                        </div>
                    )
                    :
                    (
                        <>
                            {
                                cartItems.map((item) => {
                                    console.log(item);
                                    return (
                                        <div
                                            className="cart-item"
                                            key={item.pid}
                                        >

                                            {/* IMAGE */}

                                            <div className="cart-item-image">

                                                <img
                                                    src={item.image || 'https://via.placeholder.com/300'}
                                                    alt={item.pname}
                                                    className="product-image"
                                                />

                                            </div>

                                        {/* DETAILS */}

                                        <div className="cart-item-details">

                                            <h2 className="cart-item-title">
                                                {item.pname}
                                            </h2>

                                            <p>
                                                {item.productDiscription}
                                            </p>

                                            <h3 className="cart-item-price">
                                                ₹ {item.productPrice}
                                            </h3>

                                            <button
                                                className="remove-btn"
                                                onClick={() =>
                                                    removeFromCart(item.pid)
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                        {/* SUBTOTAL */}

                                        <div className="cart-item-subtotal">

                                            <p className="cart-item-subtotal-label">
                                                Subtotal
                                            </p>

                                            <p className="cart-item-subtotal-value">
                                                ₹ {item.productPrice}
                                            </p>

                                        </div>

                                        </div>
                                        );
                                    })
                            }

                            {/* CART SUMMARY */}

                            <div className="cart-summary">

                                <div className="cart-summary-details">

                                    <div className="cart-summary-item">

                                        <span className="cart-summary-label">
                                            Total Items
                                        </span>

                                        <span className="cart-summary-value">
                                            {cartItems.length}
                                        </span>

                                    </div>

                                    <div className="cart-summary-item">

                                        <span className="cart-summary-label">
                                            Total Price
                                        </span>

                                        <span className="cart-summary-value">
                                            ₹ {totalPrice}
                                        </span>

                                    </div>

                                </div>

                                <Link
                                to="/checkout"
                                onClick={() => {
                                    sessionStorage.removeItem('buyNowProduct');
                                }}
                            >

                                    <button className="checkout-btn">
                                        Proceed To Checkout
                                    </button>

                                </Link>

                            </div>
                        </>
                    )
            }

        </div>
    );
}

