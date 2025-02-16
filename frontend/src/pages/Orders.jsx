import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.error("❌ No token found. Cannot fetch orders.");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      console.log("✅ API Response:", JSON.stringify(response.data, null, 2));

      if (response.data.success && Array.isArray(response.data.orders)) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          if (Array.isArray(order.items)) {
            order.items.forEach((item) => {
              console.log("🔹 Order Item:", item);

              if (!item.product) {
                console.warn("⚠️ Missing product details in order item:", item);
                return; // Skip items without product details
              }

              allOrdersItem.push({
                _id: item.product?._id || "Unknown ID",
                name: item.product?.name || "Unknown Item",
                price: item.product?.price || "N/A",
                image: Array.isArray(item.product?.image) ? item.product.image : [],
                quantity: item.quantity || 1,
                status: order.status || 'Unknown',
                payment: order.payment || false,
                paymentMethod: order.paymentMethod || 'Not specified',
                date: order.date ? new Date(order.date).toDateString() : 'N/A',
              });
            });
          }
        });

        setOrderData(allOrdersItem.reverse());
      } else {
        console.warn("⚠️ Orders array is missing or empty:", response.data);
        setOrderData([]);
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (loading) {
    return <p className="text-center text-gray-600 py-5">Loading orders...</p>;
  }

  if (orderData.length === 0) {
    return <p className="text-center text-gray-500 py-5">No orders found.</p>;
  }

  return (
    <div className="pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={item._id + index} // ✅ Use a unique key
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20"
                src={item.image.length > 0 ? item.image[0] : '/placeholder.jpg'}
                alt={item.name} />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p> {/* ✅ Should now show correct name */}
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <p className="mt-1">
                  Date: <span className="text-gray-400">{item.date}</span>
                </p>
                <p className="mt-1">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className={`min-w-2 h-2 rounded-full ${item.payment ? 'bg-green-500' : 'bg-red-500'}`}></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button
                onClick={() => window.open('https://www.shiprocket.in/shipment-tracking/', '_blank')}
                className="border px-4 py-2 text-sm font-medium rounded-sm"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
