import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { SlideLeft, SlideRight } from "../utility/animation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Plane, Environment } from "@react-three/drei";
import { motion as motion3D } from "framer-motion-3d";
import { useNavigate } from "react-router-dom";  // Import useNavigate


const Model = () => {
  const assembledModel = useGLTF("/Impactpure.glb");
  const dismantledModel = useGLTF("/all seprate.glb");

  const [isDismantled, setIsDismantled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const applyTransparency = (model) => {
      model.scene.traverse((node) => {
        if (node.isMesh) {
          node.material.transparent = true;
          node.material.opacity = hovered ? 0.4 : 1;
          node.material.depthWrite = !hovered;
          node.material.color.set(node.material.color.getHex());
        }
      });
    };

    applyTransparency(assembledModel);
    applyTransparency(dismantledModel);
  }, [hovered, isDismantled]);

  return (
    <motion3D.group
      initial={{ scale: 1, opacity: 1 }}
      animate={{
        scale: hovered ? 1.05 : 1,
        opacity: hovered ? 0.9 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <primitive
        object={isDismantled ? dismantledModel.scene : assembledModel.scene}
        scale={[0.07, 0.07, 0.07]}
        position={[0, -3.0, 0]}
        rotation={[0, 0, 0]}
        onPointerOver={() => !isMobile && setHovered(true)}
        onPointerOut={() => !isMobile && setHovered(false)}
        onClick={() => isMobile && setIsDismantled(!isDismantled)}
        onDoubleClick={() => !isMobile && setIsDismantled(!isDismantled)}
      />

      {/* ✅ Subtle Shadow Plane */}
      <Plane args={[5, 5]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
        <meshStandardMaterial attach="material" color="black" opacity={0.2} transparent />
      </Plane>
    </motion3D.group>
  );
};

const Hero = () => {
  const [textVisible, setTextVisible] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate


  useEffect(() => {
    setTimeout(() => setTextVisible(true), 100); // Ensures text appears first
  }, []);

  const handleOrderNowClick = () => {
    // Navigate to the product page with the specified productId
    const productId = "67b3757b49af33739f957cf0";  // Use a dynamic product ID if required
    navigate(`/product/${productId}`);  // Navigating to /product/:productId
  };

  const handleLearnMoreClick = () => {
    window.open("https://youtu.be/u-fZGPfa5BQ?feature=shared", "_blank");  // Open in a new tab
  };


  return (
    <>
      <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Text Section */}
        <div className="flex flex-col justify-center px-8 sm:px-16 space-y-6 font-playfair">
          {textVisible && (
            <>
              <motion.h1
                initial={{ opacity: 0.5, x: -100 }} // Starts further left
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth transition
                className="text-5xl lg:text-6xl font-bold leading-relaxed xl:leading-normal"
              >
                <span className="text-[#023047]">World's First</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f292c] via-[#00a9e0] to-[#004b59] text-shadow-lg">
                  Plug & Play
                </span>
                <br />
                <span className="text-[#023047]">Water Purifier</span>
              </motion.h1>


              <motion.p variants={SlideRight(0.3)} initial="hidden" animate="visible" className="text-gray-600 xl:max-w-[500px]">
                IMPACTPURE® offers portable, sustainable water purification with zero electricity and no water wastage, while retaining essential minerals.
                <span className="block mt-2 text-sm font-normal text-gray-500">
                  {"["}
                  <span className="hidden sm:inline">Hover, Toggle and Double Click the model to see the magic.</span>
                  <span className="inline sm:hidden">Click and Toggle the model to see the magic.</span>
                  {"]"}
                </span>


              </motion.p>

              <motion.div variants={SlideRight(0.3)} initial="hidden" animate="visible" class="flex gap-5 mt-8">
                <button
                  onClick={handleOrderNowClick}
                  class="primary-btn flex items-center gap-2">

                  Order Now
                </button>
                <button
                  onClick={handleLearnMoreClick}
                  class="learn-more-btn flex items-center gap-2">

                  <FaPlay /> Learn More
                </button>
              </motion.div>


            </>
          )}
        </div>

        {/* 3D Model Section */}
        <div className="relative z-1">
          <Canvas camera={{ position: [0, 5, 10], fov: 50 }} shadows>
            <color attach="background" args={["#ffffff"]} />

            {/* ✅ Enhanced Lighting */}
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
            <spotLight position={[10, 15, 10]} intensity={1.2} angle={0.4} penumbra={0.8} castShadow />

            {/* ✅ Studio Environment */}
            <Environment preset="studio" />

            {/* ✅ Model With Proper Transparency */}
            <motion3D.group>
              <Model />
            </motion3D.group>

            {/* ✅ Allow Full 360° Rotation */}
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} rotateSpeed={1} zoomSpeed={0.8} dampingFactor={0.1} autoRotate={true} autoRotateSpeed={1.5} />
          </Canvas>
        </div>
      </section>
    </>
  );
};

export default Hero;