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
        <motion.div
          variants={SlideRight(0.5)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='w-full md:max-w-[480px]'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7544.557481827532!2d72.83782969120841!3d19.007435128732162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cee321ddc6f3%3A0x9e159859bd8de331!2sMaharashtra%20Co-operative%20Housing%20Society!5e0!3m2!1sen!2sin!4v1739721807338!5m2!1sen!2sin"
            width="100%" height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>


        </motion.div>
        <motion.div
          variants={SlideLeft(0.5)} // Title should slide in from up to down
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ lineHeight: "1.8" }}
          className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-[#023047]'>Our Office</p>
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
