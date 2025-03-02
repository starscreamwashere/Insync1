import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, token, navigate, removeFromCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login
    }
  }, [token, navigate]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          tempData.push({
            _id: itemId,
            quantity: cartItems[itemId],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  if (!token) {
    return null; // Avoid rendering the cart page while redirecting
  }

  return (
    <div className="pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData.image[0]} alt="" />
                <div>
                  <p className="text-xs sm:text-lg font-medium text-[#023047]">{productData.name}</p>
                  <div className="text-[#023047] flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, Number(e.target.value))
                }
                className="text-[#023047] border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
    onClick={() => removeFromCart(item._id)}
    className="w-4 mr-4 sm:w-5 cursor-pointer"
    src={assets.bin_icon}
    alt="Remove"
/>


            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <div className="w-full text-end">
            <button
              onClick={() => cartData.length > 0 && navigate('/place-order')}
              className={`text-sm my-8 px-8 py-3 ${cartData.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "primary-btn text-white"
                }`}
              disabled={cartData.length === 0} // Prevents button click if cart is empty
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
