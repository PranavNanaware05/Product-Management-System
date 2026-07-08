export default function Orders() {

    const orders =
        JSON.parse(sessionStorage.getItem("orders")) || [];

    return (

        <div className="orders-container">

            <div className="orders-header">
                <h1>My Orders</h1>
                <p>Track and manage all your orders in one place</p>
            </div>

            {
                orders.length === 0
                    ?
                    (
                        <div className="no-orders">
                            <div className="no-orders-icon">🛍️</div>
                            <h2>No Orders Found</h2>
                            <p>Looks like you haven't placed any orders yet</p>
                            <a href="/products" className="shop-now-btn">Start Shopping</a>
                        </div>
                    )
                    :
                    (
                        <div className="orders-grid">
                            {orders.map((order, index) => (

                                <div
                                    className="order-card"
                                    key={index}
                                >

                                    <div className="order-card-header">
                                        <div className="order-id">
                                            <span className="order-id-label">ORDER ID</span>
                                            <span className="order-id-value">#{order.orderId}</span>
                                        </div>
                                        <span className="status-badge delivered">Delivered</span>
                                    </div>

                                    <div className="order-info-row">
                                        <div className="info-block">
                                            <span className="info-label">CUSTOMER</span>
                                            <span className="info-value">{order.customerName}</span>
                                        </div>
                                        <div className="info-block">
                                            <span className="info-label">PAYMENT METHOD</span>
                                            <span className="info-value">{order.paymentMethod}</span>
                                        </div>
                                        <div className="info-block">
                                            <span className="info-label">ORDER DATE</span>
                                            <span className="info-value">{order.orderDate}</span>
                                        </div>
                                    </div>

                                    <div className="products-section">
                                        <div className="products-title">Order Items</div>
                                        <div className="products-grid">
                                            {order.products.map((item) => {
                                                console.log(item);
                                                return (
                                                    <div
                                                        className="product-item"
                                                        key={item.pid}
                                                    >
                                                        <div className="product-image">
                                                            <img
                                                                src={item.image || 'https://via.placeholder.com/300'}
                                                                alt={item.pname}
                                                                className="product-image"
                                                            />
                                                        </div>

                                                    <div className="product-details">
                                                        <h4 className="product-name">
                                                            {item.pname}
                                                        </h4>

                                                        <p className="product-price">
                                                            {item.productPrice}
                                                        </p>

                                                        <p className="product-quantity">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                    </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="order-card-footer">
                                        <div className="order-total">
                                            <span className="total-label">Total Amount</span>
                                            <span className="total-value">
                                                ₹ {order.products.reduce((total, item) => total + (item.productPrice * item.quantity), 0)}
                                            </span>
                                        </div>
                                        <div className="action-buttons">
                                            <button className="btn-track">Track Order</button>
                                            <button className="btn-buy-again">Buy Again</button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )
            }

        </div>
    );
}