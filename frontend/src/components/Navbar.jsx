import React, { useContext, useState, useEffect, useRef } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, backendUrl } = useContext(ShopContext);

  // Disable scrolling when sidebar is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [visible]);

  const logout = () => {
    setIsDropdownOpen(false);

    // Show logout success toast
    toast.success("Successfully logged out!");

    setTimeout(() => {
      localStorage.removeItem("token");
      setToken("");
      setCartItems({});
      navigate('/'); // Redirects to Home Page after logout
    }, 200); // Short delay for smoother transition
  };


  const fetchUserProfile = async () => {
    try {
      if (token) {
        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });
        if (response.data.success) {
          setProfileData(response.data.user);
          setShowProfile(true);
        } else {
          console.error('Failed to fetch profile data');
        }
      }
    } catch (error) {
      console.error('Error fetching profile data', error);
    }
  };

  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
  };

  // Handle dropdown opening on hover
  const handleMouseEnter = () => {
    if (token) setIsDropdownOpen(true);
  };

  const handleMouseLeave = (event) => {
    if (!dropdownRef.current.contains(event.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (showProfile && !profileData) {
      fetchUserProfile();
    }
  }, [showProfile, token]);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !profileIconRef?.current?.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between py-5 font-medium"
    >
      <Link to='/'><img src={assets.logo} className='w-36' alt='' /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => { setShowSearch(true); navigate('/collection'); }} src={assets.search_icon} className='w-5 cursor-pointer' alt='' />

        {/* Profile Icon & Dropdown (No Changes) */}
        <div
          className='relative'
          ref={profileIconRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            onClick={() => {
              if (token) {
                setIsDropdownOpen(!isDropdownOpen);
              } else {
                navigate('/login'); // Redirects to login if not logged in
              }
            }}
            className='w-5 cursor-pointer'
            src={assets.profile_icon}
            alt='Profile Icon'
          />

          {token && isDropdownOpen && (
            <div
            className='absolute right-0 pt-4 z-50 w-[90vw] max-w-[250px] bg-white shadow-lg rounded-md'
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className='flex flex-col gap-2 py-3 px-4 bg-slate-100 text-gray-700 rounded'>
              {showProfile ? (
                <>
                  <div className='flex items-center gap-2 mb-4'>
                    <IoArrowBack
                      className="cursor-pointer text-gray-800"
                      size={20}
                      onClick={handleProfileToggle}
                    />
                    <p className="font-semibold text-gray-800">Back</p>
                  </div>
                  <div className="text-lg text-gray-700 flex flex-col gap-2 pb-3">
                    <p><strong>Name:</strong> {profileData?.name}</p>
                    <p className="break-words whitespace-normal w-full">
                      <strong>Email:</strong> {profileData?.email}
                    </p>
                    <p><strong>Phone:</strong> {profileData?.phoneNumber}</p>
                  </div>
                </>
              ) : (
                <>
                  <p onClick={fetchUserProfile} className='cursor-pointer hover:text-black text-lg'>My Profile</p>
                  <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black text-lg'>Orders</p>
                  <p onClick={logout} className='cursor-pointer hover:text-black text-lg'>Logout</p>
                </>
              )}
            </div>
          </div>
          
          )}
        </div>

        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt='' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger Menu Icon with Animation */}
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt='' />
      </div>

      {/* Sidebar Menu (Mobile) with Animation */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex flex-col text-gray-600 h-screen w-screen overflow-hidden"
            initial={{ x: '100%' }}    // Starts off-screen to the right
            animate={{ x: 0 }}         // Slides in to the left
            exit={{ x: '100%' }}       // Exits back off-screen to the right
            transition={{ duration: 0.3 }} // Smooth transition for 0.3s
          >
            <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
              <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='' />
              <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
