
import { useState, useEffect } from 'react';
import '../assets/AdminOrders.css';

export default function AdminOrders() {

    const [orders, setOrders] = useState(
        JSON.parse(sessionStorage.getItem("orders")) || []
    );

    useEffect(() => {

        sessionStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );

    }, [orders]);

    const updateStatus = (index, status) => {

        const updatedOrders = [...orders];

        updatedOrders[index].status = status;

        setOrders(updatedOrders);
    };

    const deleteOrder = (index) => {

        const updatedOrders =
            orders.filter((_, i) => i !== index);

        setOrders(updatedOrders);
    };

    return (

        <div className="admin-orders-container">

            <h1>Manage Orders</h1>

            {
                orders.length === 0
                    ?

                    <h2>No Orders Found</h2>

                    :

                    orders.map((order, index) => (

                        <div
                            className="admin-order-card"
                            key={index}
                        >

                            <h2>
                                Order ID:
                                {order.orderId}
                            </h2>

                            <p>
                                Customer:
                                {order.customerName}
                            </p>

                            <p>
                                Mobile:
                                {order.mobile}
                            </p>

                            <p>
                                Address:
                                {order.address}
                            </p>

                            <p>
                                Payment:
                                {order.paymentMethod}
                            </p>

                            <p>
                                Status:
                                {order.status}
                            </p>

                            <div className="products-list">

                                {
                                    order.products &&
                                    order.products.map((item) => (

                                        <div
                                            className="product-item"
                                            key={item.pid}
                                        >

                                            <img
                                                src={
                                                    item.image ||
                                                    "https://via.placeholder.com/300"
                                                }

                                                alt={item.pname}

                                                width="120"
                                            />

                                            <h3>
                                                {item.pname}
                                            </h3>

                                            <p>
                                                Qty:
                                                {item.quantity}
                                            </p>

                                            <p>
                                                ₹
                                                {item.productPrice}
                                            </p>

                                        </div>
                                    ))
                                }

                            </div>

                            <select
                                value={order.status}

                                onChange={(e) =>
                                    updateStatus(
                                        index,
                                        e.target.value
                                    )
                                }
                            >

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Approved">
                                    Approved
                                </option>

                                <option value="Shipped">
                                    Shipped
                                </option>

                                <option value="Delivered">
                                    Delivered
                                </option>

                            </select>

                            <button
                                onClick={() =>
                                    deleteOrder(index)
                                }
                            >

                                Delete Order

                            </button>

                        </div>
                    ))
            }

        </div>
    );
}

