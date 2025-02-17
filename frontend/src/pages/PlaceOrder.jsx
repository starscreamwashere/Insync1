import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod');
    const [isProcessing, setIsProcessing] = useState(false); // ✅ New state
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        phone: '',
        alt_phone: '',
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((data) => ({ ...data, [name]: value }));
    };

    const initPay = async (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            handler: async (response) => {
                try {
                    const verifyResponse = await axios.post(
                        backendUrl + '/api/order/verifyRazorpay',
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            items: Object.keys(cartItems).map((productId) => ({
                                _id: productId,  // ✅ Send only product ID
                                quantity: cartItems[productId],
                            })),
                            amount: getCartAmount() + delivery_fee,
                            address: formData,
                        },
                        { headers: { token } }
                    );

                    if (verifyResponse.data.success) {
                        toast.success("Payment Successful! Order Placed.");
                        setCartItems({});
                        navigate('/orders');
                    } else {
                        toast.error("Payment verification failed. Try again.");
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("Error verifying payment.");
                }
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };


    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (isProcessing) return; // ✅ Prevent multiple clicks

        setIsProcessing(true); // ✅ Disable button and show loader
        try {
            let orderItems = Object.keys(cartItems).map((itemId) => ({
                _id: itemId, // ✅ Store only product ID
                quantity: cartItems[itemId],
            }));

            let orderData = {
                address: formData,
                items: orderItems, // ✅ Send only product references
                amount: getCartAmount() + delivery_fee,
            };

            switch (method) {
                case 'cod':
                    const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { token } });
                    if (response.data.success) {
                        toast.success("Order placed successfully!");
                        setCartItems({});
                        navigate('/orders');
                    } else {
                        toast.error(response.data.message);
                        setIsProcessing(false); // ❌ Re-enable button if error occurs
                    }
                    break;

                case 'razorpay':
                    const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: { token } });
                    if (responseRazorpay.data.success) {
                        initPay(responseRazorpay.data.order);
                    } else {
                        toast.error("Failed to create Razorpay order.");
                        setIsProcessing(false); // ❌ Re-enable button if error occurs
                    }
                    break;
                default:
                    toast.error("Please select a valid payment method.");
                    setIsProcessing(false); // ❌ Re-enable button if no method selected
                    break;
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
            setIsProcessing(false); // ❌ Re-enable button if request fails
        }
    };


    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
            {/* ------------- Left Side ---------------- */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="firstName"
                        value={formData.firstName}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="First name"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="lastName"
                        value={formData.lastName}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Last name"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    required
                    onChange={onChangeHandler}
                    name="address_line1"
                    value={formData.address_line1}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    placeholder="Address Line 1"
                />
                <input
                    required
                    onChange={onChangeHandler}
                    name="address_line2"
                    value={formData.address_line2}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    placeholder="Address Line 2"
                />
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="city"
                        value={formData.city}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="City"
                    />
                    <input
                        onChange={onChangeHandler}
                        name="state"
                        value={formData.state}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="State"
                    />
                </div>
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="pincode"
                        value={formData.pincode}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="number"
                        placeholder="Pincode"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name="country"
                        value={formData.country}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Country"
                    />
                </div>
                <div className="flex gap-3">
                    <input
                        required
                        onChange={onChangeHandler}
                        name="phone"
                        value={formData.phone}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="tel" // ✅ Changed to "tel" for better phone number validation
                        placeholder="Phone"
                    />
                    <input
                        onChange={onChangeHandler}
                        name="alt_phone"
                        value={formData.alt_phone}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="tel" // ✅ Changed to "tel" for better phone number validation
                        placeholder="Alternate Phone (Optional)"
                    />
                </div>
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>

                <div className="mt-12">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                        <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <button
                            type="submit"
                            className="primary-btn px-16 py-3 text-sm"
                            disabled={!method || isProcessing} // ✅ Disabled when processing
                        >
                            {isProcessing ? "Processing..." : "PLACE ORDER"} {/* 🔥 Show loading text */}
                        </button>

                    </div>
                </div>
            </div>

        </form>
    );
};

export default PlaceOrder;
