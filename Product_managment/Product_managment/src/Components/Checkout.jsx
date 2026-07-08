import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Checkout({ onOrderPlaced }) {

    const location = useLocation();
    const navigate = useNavigate();

    const username =
        sessionStorage.getItem("username");

    const [name, setName] =
        useState(username || "");

    const [address, setAddress] =
        useState("");

    const [city, setCity] =
        useState("");

    const [pincode, setPincode] =
        useState("");

    const [mobile, setMobile] =
        useState("");

    const [paymentMethod, setPaymentMethod] =
        useState("");

    const [upiId, setUpiId] =
        useState("");

    const [cardNumber, setCardNumber] =
        useState("");

    const [cvv, setCvv] =
        useState("");

    const [selectedProduct, setSelectedProduct] =
        useState(null);

    useEffect(() => {
        if (location.state?.product) {
            const product = location.state.product;
            sessionStorage.setItem(
                "buyNowProduct",
                JSON.stringify(product)
            );
            setSelectedProduct(product);
            return;
        }

        const storedProduct =
            JSON.parse(
                sessionStorage.getItem("buyNowProduct") || "null"
            );

        setSelectedProduct(storedProduct);
    }, [location.state]);

    const cartProducts =
        JSON.parse(sessionStorage.getItem("cart")) || [];

    const checkoutItems = selectedProduct
        ? [{ ...selectedProduct, quantity: 1 }]
        : cartProducts.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));

    const totalAmount = checkoutItems.reduce(
        (total, item) =>
            total + item.productPrice * (item.quantity || 1),
        0
    );

    const placeOrder = () => {
        if (
            name === "" ||
            address === "" ||
            city === "" ||
            pincode === "" ||
            mobile === "" ||
            paymentMethod === ""
        ) {
            alert("Please fill all details");
            return;
        }

        if (mobile.length !== 10) {
            alert("Enter valid mobile number");
            return;
        }

        if (pincode.length !== 6) {
            alert("Enter valid pincode");
            return;
        }

        if (paymentMethod === "UPI" && upiId === "") {
            alert("Enter UPI ID");
            return;
        }

        if (paymentMethod === "CARD") {
            if (cardNumber === "" || cvv === "") {
                alert("Enter card details");
                return;
            }

            if (cardNumber.length < 12) {
                alert("Enter valid card number");
                return;
            }

            if (cvv.length !== 3) {
                alert("Enter valid CVV");
                return;
            }
        }

        const checkoutProducts = selectedProduct
            ? checkoutItems
            : cartProducts;

        if (!checkoutProducts.length) {
            alert("No products selected for checkout");
            return;
        }

        const orders =
            JSON.parse(sessionStorage.getItem("orders")) || [];

        const newOrder = {
            orderId: "ORD" + Math.floor(Math.random() * 100000),
            customerName: name,
            address,
            city,
            pincode,
            mobile,
            paymentMethod,
            products: checkoutProducts,
            totalAmount,
            orderDate: new Date().toLocaleString(),
            status: "Pending"
        };

        orders.push(newOrder);
        sessionStorage.setItem("orders", JSON.stringify(orders));

        const storedProductsJson = sessionStorage.getItem("products");
        if (storedProductsJson) {
          const storedProducts = JSON.parse(storedProductsJson);
          const updatedProducts = storedProducts.map((product) => {
            const matched = checkoutProducts.find((item) => item.pid === product.pid);
            if (!matched) return product;
            const qty = Number(matched.quantity || 1);
            const currentStock = Number(product.stock ?? 0);
            return {
              ...product,
              stock: Math.max(0, currentStock - qty)
            };
          });
          sessionStorage.setItem("products", JSON.stringify(updatedProducts));
        }

        if (!selectedProduct) {
            sessionStorage.removeItem("cart");
        }

        sessionStorage.removeItem("buyNowProduct");

        alert("Order placed successfully");
        navigate('/orders');
    };

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            <div className="checkout-grid">
                <div className="checkout-details">
                    <div className="section-header">
                        <h2>Delivery Address</h2>
                        <p>Enter shipping details for your order.</p>
                    </div>

                    <div className="checkout-form">
                        <div className="field-row">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />
                        </div>

                        <div className="field-row">
                            <input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) =>
                                    setAddress(e.target.value)
                                }
                            />
                        </div>

                        <div className="field-grid">
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(e) =>
                                    setCity(e.target.value)
                                }
                            />
                            <input
                                type="number"
                                placeholder="Pincode"
                                value={pincode}
                                onChange={(e) =>
                                    setPincode(e.target.value)
                                }
                            />
                        </div>

                        <input
                            type="number"
                            placeholder="Mobile Number"
                            value={mobile}
                            onChange={(e) =>
                                setMobile(e.target.value)
                            }
                        />

                        <div className="section-header">
                            <h2>Payment Method</h2>
                            <p>Choose how you'd like to pay.</p>
                        </div>

                        <div className="payment-section">
                            <label>
                                <input
                                    type="radio"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                                Cash On Delivery
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="UPI"
                                    checked={paymentMethod === "UPI"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                                UPI Payment
                            </label>

                            {paymentMethod === "UPI" && (
                                <input
                                    type="text"
                                    placeholder="Enter UPI ID"
                                    value={upiId}
                                    onChange={(e) =>
                                        setUpiId(e.target.value)
                                    }
                                />
                            )}

                            <label>
                                <input
                                    type="radio"
                                    value="CARD"
                                    checked={paymentMethod === "CARD"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />
                                Debit / Credit Card
                            </label>

                            {paymentMethod === "CARD" && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        value={cardNumber}
                                        onChange={(e) =>
                                            setCardNumber(e.target.value)
                                        }
                                    />
                                    <input
                                        type="password"
                                        placeholder="CVV"
                                        value={cvv}
                                        onChange={(e) =>
                                            setCvv(e.target.value)
                                        }
                                    />
                                </>
                            )}
                        </div>

                        <button onClick={placeOrder}>
                            Place Order
                        </button>
                    </div>
                </div>

                <aside className="checkout-summary">
                    <div className="summary-card">
                        <h2>Order Summary</h2>
                        {checkoutItems.length > 0 ? (
                            checkoutItems.map((item) => (
                                <div
                                    className="summary-product"
                                    key={item.pid}
                                >
                                    <img
                                        src={item.image || 'https://via.placeholder.com/300'}
                                        alt={item.pname}
                                    />
                                    <div className="summary-product-info">
                                        <h3>{item.pname}</h3>
                                        <p>Qty: {item.quantity}</p>
                                        <span>₹ {item.productPrice}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="empty-summary">
                                No items selected. Add a product to cart
                                or use Buy Now to continue.
                            </p>
                        )}

                        <div className="summary-total">
                            <span>Total</span>
                            <strong>₹ {totalAmount}</strong>
                        </div>

                        <div className="summary-note">
                            {selectedProduct
                                ? 'You are checking out a single product from Buy Now.'
                                : 'Proceed with all items currently in your cart.'}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
