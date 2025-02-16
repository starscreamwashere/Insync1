import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        if (!token) {
            console.error("❌ No token provided. Cannot fetch orders.");
            return;
        }

        try {
            // ✅ Corrected API route
            const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });

            console.log("Admin Orders Response:", response.data);

            if (response.data.success) {
                setOrders(response.data.orders.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const statusHandler = async (event, orderId) => {
        try {
            // ✅ Corrected API route
            const response = await axios.post(
                `${backendUrl}/api/order/status`,
                { orderId, status: event.target.value },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success("Order status updated successfully!");
                await fetchAllOrders();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [token]);

    return (
        <div>
            <p className="mb-2">Order Page</p>
            <div>
                {orders.length === 0 ? (
                    <p className="text-center text-gray-500 py-5">No orders found.</p>
                ) : (
                    orders.map((order, index) => (
                        <div
                            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
                            key={order._id}
                        >
                            <img className="w-12" src={assets.parcel_icon} alt="Parcel Icon" />

                            <div>
                                <div>
                                    {order.items.map((item, index) => (
                                        <p className="py-0.5" key={item.product?._id || index}>
                                            {item.product?.name || "Unknown Item"} x {item.quantity}
                                        </p>
                                    ))}
                                </div>
                                <p className="mt-3 mb-2 font-medium">
                                    {order.address.firstName + ' ' + order.address.lastName}
                                </p>
                                <div>
                                    <p>{order.address.address_line1 + ','}</p>
                                    {order.address.address_line2 && order.address.address_line2 !== '' && (
                                        <p>{order.address.address_line2 + ','}</p>
                                    )}
                                    <p>
                                        {order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.pincode}
                                    </p>

                                </div>
                                <p>{order.address.phone}</p>
                            </div>

                            <div>
                                <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
                                <p className="mt-3">Method: {order.paymentMethod}</p>
                                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                            </div>

                            <p className="text-sm sm:text-[15px]">
                                {currency}
                                {order.amount}
                            </p>

                            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 font-semibold">
                                <option value="Order Placed">Order Placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
