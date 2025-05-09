"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { WavyBackground } from './ui/wavy-background';

const Hero = () => {
  const phrases = [
    "Empower Your Future",
    "Master Professional Skills",
    "Connect with Industry Leaders",
    "Launch Your Career",
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  
  // Parallax effect
  const titleY = useTransform(scrollY, [0, 300], [0, -50]);
  const floatingElementsY = useTransform(scrollY, [0, 500], [0, -100]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <WavyBackground
      className="relative min-h-screen w-full overflow-hidden"
      colors={['#102734', '#37B4EC', '#F2C331', '#FFFFFF']}
      backgroundFill="white"
      waveWidth={90} // Increased from 60 to make waves appear taller
      waveOpacity={0.1} // Reduced from 0.2 for more subtlety
      blur={5}
      speed="slow"
      containerClassName="min-h-screen w-full"
    >
      <div id="home" className="relative z-10" ref={containerRef}>
        {/* Content container */}
        <div className="container mx-auto px-4 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-screen">
            {/* Left decorative column */}
            <motion.div
              className="hidden lg:flex lg:col-span-1 items-center justify-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* Empty column for spacing */}
            </motion.div>

            {/* Main content column */}
            <div className="lg:col-span-3 flex flex-col justify-center items-center text-center py-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ y: titleY }}
              >
                {/* Main Title with letter animation */}
                <div className="overflow-hidden mb-4">
                  <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
                    style={{ color: "#102734" }}
                  >
                    {Array.from("Rise Up").map((letter, index) => (
                      <motion.span
                        key={index}
                        initial={{ y: 80 }}
                        animate={{ y: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.1,
                          duration: 0.6,
                          ease: [0.215, 0.61, 0.355, 1]
                        }}
                        className="inline-block"
                      >
                        {letter === " " ? "\u00A0" : letter}
                      </motion.span>
                    ))}
                    <motion.span
                      className="relative inline-block ml-4 z-10"
                      style={{ color: "#F2C331" }}
                      initial={{ y: 80 }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: 0.8,
                        duration: 0.6,
                        ease: [0.215, 0.61, 0.355, 1]
                      }}
                    >
                      Mora
                    </motion.span>
                  </motion.h1>
                </div>

                {/* Animated Subheading */}
                <div className="h-16 mb-6 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={currentPhraseIndex}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl md:text-3xl font-medium bg-clip-text text-transparent"
                      style={{
                        backgroundImage: "linear-gradient(90deg, #102734 0%, #102734 100%)",
                      }}
                    >
                      {phrases[currentPhraseIndex]}
                    </motion.h2>
                  </AnimatePresence>
                </div>

                {/* Animated accent line */}
                <motion.div
                  className="mx-auto mb-6 h-1 rounded-full"
                  style={{ backgroundColor: "#37B4EC" }}
                  initial={{ width: 0 }}
                  animate={{ width: "140px" }}
                  transition={{ delay: 0.9, duration: 1.2, ease: "easeOut" }}
                />

                {/* Description */}
                <motion.p
                  className="max-w-2xl mx-auto text-lg leading-relaxed mb-10"
                  style={{ 
                    color: "#102734", 
                    textShadow: "0 0 8px rgba(255, 255, 255, 0.4), 0 0 16px rgba(255, 255, 255, 0.3), 0 0 24px rgba(255, 255, 255, 0.2)"
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  A transformative initiative by the IEEE Student Branch at the University of Moratuwa,
                  empowering undergraduates with industry insights, professional skills, and
                  interview preparation through expert-led webinars and workshops.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap justify-center gap-4 md:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                >
                  <motion.a
                    href="#about"
                    className="px-8 py-4 text-white font-medium rounded-full flex items-center justify-center shadow-lg group relative overflow-hidden"
                    style={{ backgroundColor: "#37B4EC" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r"
                      style={{ backgroundColor: "#102734", opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Discover More</span>
                    <ArrowRight className="ml-3 h-5 w-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="#timeline"
                    className="px-8 py-4 bg-transparent font-medium rounded-full flex items-center justify-center relative overflow-hidden group"
                    style={{
                      border: "2px solid #F2C331",
                      color: "#102734"
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="absolute inset-0 opacity-0"
                      style={{ backgroundColor: "rgba(242,195,49,0.1)" }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Explore Timeline</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>

            {/* Right decorative column */}
            <motion.div
              className="hidden lg:flex lg:col-span-1 items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* Empty column for spacing */}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.button
            onClick={scrollToNextSection}
            className="flex flex-col items-center cursor-pointer group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-sm font-medium mb-2"
              style={{ color: "#37B4EC" }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll to Explore
            </motion.span>
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full"
              style={{
                border: "2px solid rgba(242, 195, 49, 0.5)",
                backgroundColor: "rgba(242, 195, 49, 0.1)"
              }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown style={{ color: "#F2C331" }} size={24} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </WavyBackground>
  );
};

export default Hero;