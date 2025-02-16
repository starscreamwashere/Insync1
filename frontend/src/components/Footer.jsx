import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Scrolls to the top of the page
  };

  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="" />
          <p className='w-full md:w-2/3 text-gray-600'>
            IMPACTPURE® combines advanced technology and eco-friendly design to deliver pure, mineral-rich water for every need. Join us in creating a sustainable future with zero electricity, no water wastage, and reliable hydration for homes, workplaces, and outdoor adventures.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>
              <button
                onClick={() => handleNavigation('/')}
                className="text-gray-600 hover:underline"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/about')}
                className="text-gray-600 hover:underline"
              >
                About us
              </button>
            </li>
            <li>
              <button
                onClick={() => window.open('https://www.shiprocket.in/shipment-tracking/', '_blank')}
                className="text-gray-600 hover:underline"
              >
                Delivery
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/tandc')}
                className="text-gray-600 hover:underline"
              >
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 77384 90103</li>
            <li>+91 97020 02899</li>
            <li><a href="mailto:contact@impactpure.com" className="hover:underline">{'contact@impactpure.com'}</a></li>
            <li>
              <a href="https://www.instagram.com/impactpure.purifier/" target="_blank" className="hover:underline">
                Follow us on Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          &copy; 2025 PRO-WIN HEALTHCARE PRIVATE LIMITED. All rights reserved. <br />
          IMPACTPURE is a registered trademark of Kalki Ecosphere LLP.
        </p>
      </div>
    </div>
  )
}

export default Footer
