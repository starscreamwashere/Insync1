import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 249;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const navigate = useNavigate();

    // ✅ Function to handle expired token
    const handleExpiredToken = () => {
        toast.error("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        setToken("");
        navigate("/login");
    };

    // ✅ Add item to cart
    const addToCart = async (itemId) => {
        if (!token) {
            toast.error("Log in to add items to the cart!");
            navigate("/login");
            return;
        }

        let cartData = structuredClone(cartItems);
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        setCartItems(cartData);

        toast.success("Item added to cart!");

        try {
            await axios.post(`${backendUrl}/api/cart/add`, { itemId }, { headers: { token } });
        } catch (error) {
            console.error("Add to cart error:", error);

            if (error.response?.data?.message === "Session expired. Please log in again.") {
                handleExpiredToken();
            } else {
                toast.error("Error adding item to cart. Please try again.");
            }
        }
    };

    // ✅ Get total number of items in the cart
    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            try {
                if (cartItems[itemId] > 0) {
                    totalCount += cartItems[itemId];
                }
            } catch (error) {
                console.log(error);
            }
        }
        return totalCount;
    };

    // ✅ Update cart quantity
    const updateQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
    
        // Show success toast
        toast.success(`Quantity updated to ${quantity}`);
    
        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, quantity }, { headers: { token } });
            } catch (error) {
                console.log("Update cart error:", error);
    
                if (error.response?.data?.message === "Session expired. Please log in again.") {
                    handleExpiredToken();
                } else {
                    toast.error("Error updating cart. Please try again.");
                }
            }
        }
    };
    

    // ✅ Get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            try {
                if (cartItems[itemId] > 0 && itemInfo) {
                    totalAmount += itemInfo.price * cartItems[itemId];
                }
            } catch (error) {
                console.log(error);
            }
        }
        return totalAmount;
    };

    // ✅ Fetch all products
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error fetching products:", error);
            toast.error("Error fetching products. Please refresh the page.");
        }
    };

    // ✅ Fetch user's cart
    const getUserCart = async () => {
        if (!token) return;

        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });

            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log("Error fetching cart:", error);

            if (error.response?.data?.message === "Session expired. Please log in again.") {
                handleExpiredToken();
            } else {
                toast.error("Error loading cart. Please try again.");
            }
        }
    };

    // ✅ Load products on mount
    useEffect(() => {
        getProductsData();
    }, []);

    // ✅ Ensure token is always set properly from localStorage
    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);

    // ✅ Load user cart when token is set
    useEffect(() => {
        if (token) {
            getUserCart();
        }
    }, [token]);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token,
    };

    return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
