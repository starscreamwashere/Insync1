import React from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../utility/animation"; // Import SlideUp animation
import { SlideLeft } from "../../utility/animation"; // Import SlideUp animation
import Title from "../Title"; // Assuming Title component is properly imported

const Banner = ({ image, title, subtitle, link }) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      {/* Banner Text Section */}
      <div className="text-center py-8 text-3xl">
        {/* Title Animation (Down to Up) */}
        <motion.div
          initial={{ opacity: 0, y: -50 }} // Start with low opacity and slightly higher position
          whileInView={{ opacity: 1, y: 0 }} // Fade in and move to normal position (down to up)
          transition={{ duration: 1, delay: 0.2 }} // Smooth transition
          viewport={{ once: true }} // Animate only the first time the element comes into view
        >
          <Title text1={"PRODUCT"} text2={"DESCRIPTION"} />
        </motion.div>

        {/* Paragraph Animation (Down to Up) */}
        <motion.p
          initial={{ opacity: 0, y: -50 }} // Start with low opacity and slightly higher position
          whileInView={{ opacity: 1, y: 0 }} // Fade in and move to normal position (down to up)
          transition={{ duration: 1, delay: 0.4 }} // Smooth transition with a slight delay
          className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600"
          viewport={{ once: true }} // Animate only the first time the element comes into view
        >
          Learn more about the innovative design and features that make IMPACTPURE® the ultimate water purifier.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center py-14 gap-6">
        {/* Banner Image - Animates Every Time it Comes into View */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }} // Start with low opacity and smaller scale
            whileInView={{ opacity: 1, scale: 1 }} // Fade in and scale to normal size
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }} // Smooth spring transition
            src={image}
            alt="Banner"
            className="w-[300px] md:max-w-[400px] xl:min-w-[600px] h-full object-cover"
          />
        </div>

        {/* Banner Text */}
        <div className="flex flex-col justify-center text-center md:text-left space-y-4 lg:max-w-[500px] pl-2">
          <motion.p
            variants={SlideLeft(0.5)} // Title should slide in from up to down
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl lg:text-4xl font-bold"
            style={{ lineHeight: "1.8" }}
          >
            {title}
          </motion.p>
          <motion.p
            variants={SlideLeft(0.7)} // Subtitle should slide in from up to down
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-gray-600"
            style={{ lineHeight: "1.8" }}
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
          <motion.div
            variants={SlideLeft(0.9)} // Button should slide in from up to down
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center md:justify-start"
          >
            <button className="primary-btn">Explore More</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
