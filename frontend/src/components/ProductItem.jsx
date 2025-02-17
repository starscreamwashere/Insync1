import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Link
        onClick={() => scrollTo(0, 0)}
        className="text-gray-700 cursor-pointer block transition-all duration-300"
        to={`/product/${id}`}
      >
        <motion.div
          whileHover={{ scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="overflow-hidden rounded-lg bg-white"
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full transition-all ease-in-out rounded-lg"
            src={image[0]}
            alt={name}
          />
        </motion.div>
        <p className="text-[#023047] pt-3 pb-1 text-sm font-semibold text-gray-800 tracking-wide">{name}</p>
        <p className="text-[#023047] text-sm font-semibold text-gray-900">{currency}{price}</p>
      </Link>
    </motion.div>
  );
};

export default ProductItem;
