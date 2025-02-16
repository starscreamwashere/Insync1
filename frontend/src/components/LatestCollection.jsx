import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const textFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, delay: 0.3, ease: "easeOut" } }
};

const LatestCollection = () => {

  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products])

  return (
    <div className='my-10'>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center py-8 text-3xl"
      >
        {/* Title Animation */}
        <motion.div variants={fadeInUp}>
          <Title text1={'OUR'} text2={'PRODUCT'} />
        </motion.div>

        {/* Subtitle Animation */}
        <motion.p
          variants={textFade}
          className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600"
        >
          Explore IMPACTPURE®: Pure water, anytime, anywhere.
        </motion.p>
      </motion.div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
