import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        // Flexbox Setup
        display: 'flex',
        justifyContent: 'space-between', // Pushes Logo left, Links right
        alignItems: 'center',
        
        // Positioning
        position: 'relative', // Sticks to top
        top: 0,
        left: 0,
        width: '100%',
        padding: '1rem 3rem', // Top/Bottom 1rem, Left/Right 3rem
        zIndex: 100, // Keeps it on top of other content
        
        // Glassmorphism Style
        background: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white
        backdropFilter: 'blur(10px)', // The "Frost" effect
        borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
        boxSizing: 'border-box', // Ensures padding doesn't break width
      }}
    >
      {/* 1. LOGO SECTION */}
      <div style={{ 
        fontWeight: 'bold', 
        fontSize: '1.5rem', 
        color: '#4A3728',
        cursor: 'pointer'
      }}>
        POBA PETs
      </div>

      {/* 2. LINKS SECTION */}
      <div style={{ 
        display: 'flex', 
        gap: '2rem' // Space between links
      }}>
        {['Home', 'About', 'Work', 'Contact'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            whileHover={{ scale: 1.1, color: '#000' }} // Hover animation
            style={{
              textDecoration: 'none',
              color: '#4A3728', // Same brown as text
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer'
              
            }}
          >
            {item}
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;