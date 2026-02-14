import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // Animation settings: Re-triggers every time you scroll (once: false)
  const scrollAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: false, amount: 0.3 } // <--- This ensures it happens on every scroll
  };

  return (
    <section id="about" style={{ width: '100%' }}>
      
      {/* 1. PRESENTATION TITLE */}
      <div style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center', 
        backgroundColor: '#FAEBD7' 
      }}>
        <motion.h2 
          {...scrollAnimation}
          style={{ 
            // Restored the "Long Cang" font
            fontFamily: "'Long Cang', cursive", 
            fontSize: '4rem', 
            color: '#4A3728',
            marginBottom: '1rem',
            fontWeight: 'normal' // Brush fonts don't need bold
          }}
        >
          About Us
        </motion.h2>
        <p style={{ color: '#4A3728', opacity: 0.7 }}> our story.</p>
      </div>

      {/* 2. THE PARALLAX WINDOW */}
      <div style={{
        // Updated to the image link you requested
        backgroundImage: 'url("src/assets/about.png")',
        
        // Parallax Settings
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        
        minHeight: '80vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        
        {/* Dark Overlay (Restored the warm 50% opacity) */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}></div>

        {/* 3. THE CONTENT (Restored Lighthouse Story & Times New Roman) */}
        <motion.div 
          {...scrollAnimation}
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '800px',
            padding: '3rem',
            textAlign: 'center',
            
            // Restored Fonts
            fontFamily: "'Times New Roman', Times, serif",
            color: '#FFE4C4', // Bisque (Warm Light)
            lineHeight: '1.8',
            fontSize: '1.3rem',
            textShadow: '0px 2px 4px rgba(0,0,0,0.8)'
          }}
        >
          <h3 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1.5rem', 
            color: '#FFD700', // Gold
            fontFamily: "'Times New Roman', Times, serif" // Ensure consistency
          }}>
            Guiding You Home
          </h3>
          
          <p style={{ marginBottom: '2rem' }}>
            Like a lighthouse in the storm, we believe every pet deserves a beacon of hope. 
            POBA PET started around a small campfire of ideas—a simple wish to connect 
            lonely hearts with loving paws.
          </p>

          <p>
            We are not just a platform; we are a community of animal lovers, 
            caretakers, and friends. We work tirelessly to ensure that every 
            adoption is safe, transparent, and filled with the warmth of a new beginning.
          </p>
          
          <div style={{ marginTop: '3rem', fontStyle: 'italic', opacity: 0.8 }}>
            "In the light of friendship, no one is ever truly lost."
          </div>

        </motion.div>
      </div>

      {/* 4. Return to Beige */}
      <div style={{ height: '100px', backgroundColor: '#FAEBD7' }}></div>

    </section>
  );
};

export default About;