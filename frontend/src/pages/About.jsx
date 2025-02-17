import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import { motion } from "framer-motion";
import { SlideRight } from "../utility/animation";
import { SlideLeft } from "../utility/animation";
import { SlideDownFade } from "../utility/animation";
import { ZoomLeft } from "../utility/animation";
import { RotateUp } from "../utility/animation";
import { FlipRight } from "../utility/animation";

const About = () => {
  return (
    <div>
      {/* About Us Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Start with low opacity and slightly higher position
        whileInView={{ opacity: 1, y: 0 }} // Fade in and move to normal position (down to up)
        transition={{ duration: 1, delay: 0.2 }} // Smooth transition
        viewport={{ once: true }} // Animate only the first time the element comes into view 
        className="text-2xl text-center pt-8">
        <Title text1={'ABOUT'} text2={'US'} />
      </motion.div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <motion.img
          variants={SlideRight(0.5)} // Apply the animation
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <motion.div
          variants={SlideLeft(0.5)} // Title should slide in from up to down
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ lineHeight: "1.8" }}
          className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            <b>IMPACTPURE</b> was founded to revolutionize water purification by making clean, mineral-rich water
            accessible anywhere, anytime. Our journey began with a vision to create innovative, eco-friendly solutions
            that prioritize sustainability without compromising quality.
          </p>
          <p>
            From homes and workplaces to outdoor adventures, our plug-and-play purifiers are designed to meet diverse
            needs. By eliminating water wastage, retaining essential minerals, and requiring no electricity,{' '}
            <b>IMPACTPURE</b> sets a new standard in water purification.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At <b>IMPACTPURE</b>, our mission is to empower people with access to clean water through innovative,
            sustainable, and affordable solutions. We are dedicated to preserving the environment for future
            generations while ensuring reliability and convenience.
          </p>
        </motion.div>
      </div>

      {/* Why Choose Us Section */}
      <motion.div
        variants={SlideDownFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-xl py-4"
      >
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </motion.div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <motion.div
          variants={ZoomLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-[#023047]"
        >
          <b>Eco-Friendly Solutions:</b>
          <p className="text-gray-600">
            Designed with sustainability in mind, our purifiers require no electricity and eliminate water wastage.
          </p>
        </motion.div>
        <motion.div
          variants={RotateUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-[#023047]"
        >
          <b>Convenience:</b>
          <p className="text-gray-600">
            Plug-and-play technology ensures ease of use, whether at home, work, or on the go.
          </p>
        </motion.div>
        <motion.div
          variants={FlipRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-[#023047]"
        >
          <b>Uncompromised Quality:</b>
          <p className="text-gray-600">
            Retains essential minerals while ensuring 99.99% sterilization with advanced technology.
          </p>
        </motion.div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
