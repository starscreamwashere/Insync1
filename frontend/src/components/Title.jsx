import React from 'react'
import { motion } from "framer-motion";
import { SlideRight } from "../utility/animation";

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <motion.p
        className='text-[#023047]'> {/* Dark blue for the main title */}
        {text1}
        <span className='text-[#004B59] font-medium'> {/* Muted dark blue for the subtitle */}
          {text2}
        </span>
      </motion.p>
    </div>
  )
}

export default Title
