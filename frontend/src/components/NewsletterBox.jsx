import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.3, ease: "easeOut" }
};

const NewsletterBox = () => {
  // State to manage email input and response messages
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Form submission handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:4000/api/newsletter/subscribe', { email });

      // Handle successful response
      setMessage(response.data.message);
      setEmail(''); // Clear input after successful submission
    } catch (error) {
      // Handle error response
      setMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      className="text-center"
    >
      <p className="text-2xl font-medium text-[#023047]">Stay Updated with IMPACTPURE</p>
      <p className="text-gray-600 mt-3">
        Add your email to stay informed about the latest offers and updates from IMPACTPURE.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-md overflow-hidden"
      >
        <input
          className="w-full sm:flex-1 outline-none p-3 text-gray-700"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <motion.button
          type="submit"
          className="bg-[#023047] text-white text-xs px-10 py-4 transition-all disabled:opacity-50"
          disabled={loading}
          whileHover={!loading ? buttonHover : {}}
        >
          {loading ? 'SUBMITTING...' : 'SUBSCRIBE'}
        </motion.button>
      </form>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mt-3 text-sm ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default NewsletterBox;
