import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { motion } from "framer-motion";
import { SlideRight } from "../utility/animation";
import { SlideLeft } from "../utility/animation";
import { SlideDownFade } from "../utility/animation";
import { ZoomLeft } from "../utility/animation";
import { RotateUp } from "../utility/animation";
import { FlipRight } from "../utility/animation";

const Contact = () => {
  return (
    <div>

      <motion.div
        initial={{ opacity: 0, y: -50 }} // Start with low opacity and slightly higher position
        whileInView={{ opacity: 1, y: 0 }} // Fade in and move to normal position (down to up)
        transition={{ duration: 1, delay: 0.2 }} // Smooth transition
        viewport={{ once: true }} // Animate only the first time the element comes into view 
        className="text-2xl text-center pt-8">
        <Title text1={'CONTACT'} text2={'US'} />
      </motion.div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <motion.img
          variants={SlideRight(0.5)} // Apply the animation
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <motion.div
          variants={SlideLeft(0.5)} // Title should slide in from up to down
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ lineHeight: "1.8" }}
          className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Office</p>
          <p className='text-gray-500'>
            Floor 3, R/O G/13, Maharashtra CHS,<br />
            Eknath Ghadi Marg, Ambekar Nagar,<br />
            Parel, Mumbai, Mumbai,<br />
            Maharashtra, 400012
          </p>


          <p className=' text-gray-500'>Tel: +91 77384 90103 / +91 97020 02899 <br /> Email: contact@impactpure.com</p>
        </motion.div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
