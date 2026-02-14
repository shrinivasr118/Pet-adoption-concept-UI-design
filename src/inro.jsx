import React from 'react';
import { motion } from 'framer-motion';

const Intro = () => {
  return (
    <motion.div
      // Initial state: Cover the whole screen
      initial={{ y: 0 }}
      // Animate: Slide up to -100% (completely off screen)
      exit={{ y: '-100vh' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Custom "cubic-bezier" for that premium feel
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#1a1a1a', // Dark contrast color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50, // Must be higher than Navbar
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }} // Text fades out slightly before curtain lifts
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ color: '#FAEBD7', fontSize: '4rem', fontFamily: "'Long Cang', cursive" }}
      >
        <h1>POBA PETs</h1>
      </motion.h1>
    </motion.div>
  );
};

export default Intro;