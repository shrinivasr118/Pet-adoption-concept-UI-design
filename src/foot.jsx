import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ onContactClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" 
    style={{
      backgroundColor: '#EADDCA', // "Almond" beige
      color: '#4A3728', // Dark Brown
      padding: '4rem 2rem 1rem',
      width: '100%',
      position: 'relative',
      zIndex: 10
    }}>
      
      {/* MAIN CONTAINER */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: '2rem',
        borderBottom: '1px solid rgba(74, 55, 40, 0.2)', // Thin brown line
        paddingBottom: '2rem',
        marginBottom: '1rem'
      }}>
        
        {/* LEFT: BRAND & DESC */}
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ 
            fontFamily: "'Long Cang', cursive", 
            fontSize: '2.5rem', 
            margin: '0 0 1rem 0' 
          }}>
            POBA PETs
          </h2>
          <p style={{ maxWidth: '300px', lineHeight: '1.6' }}>
            Bringing organic design and comfort to your digital space. 
            Designed with care and warmth.
          </p>
        </div>

        {/* MIDDLE: LINKS (With Easter Egg) */}
        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Explore</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            
            {/* Standard Links */}
            {['Home', 'About', 'Work'].map((item) => (
              <li key={item} style={{ marginBottom: '0.5rem' }}>
                <a href={`#${item.toLowerCase()}`} style={{ textDecoration: 'none', color: '#4A3728', opacity: 0.8, transition: 'opacity 0.2s' }}>
                  {item}
                </a>
              </li>
            ))}

            {/* THE EASTER EGG LINK */}
            <li style={{ marginBottom: '0.5rem' }}>
              <motion.span 
                onClick={onContactClick} // <--- Triggers the 404
                whileHover={{ x: 5, color: '#C0392B' }} // Slight nudge and red color
                style={{ 
                  textDecoration: 'none', 
                  color: '#4A3728', 
                  opacity: 0.8, 
                  cursor: 'help', // Question mark cursor
                  display: 'inline-block' 
                }}
              >
                Contact
              </motion.span>
            </li>

          </ul>
        </div>

        {/* RIGHT: CONTACT INFO */}
        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h3>
          <p style={{ marginBottom: '0.5rem' }}>hello@pobapet.com</p>
          <p style={{ marginBottom: '0.5rem' }}>+1 (555) 123-4567</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            {/* Simple Text Socials */}
            <span style={{ cursor: 'pointer', opacity: 0.8 }}>Insta</span>
            <span style={{ cursor: 'pointer', opacity: 0.8 }}>Twitter</span>
            <span style={{ cursor: 'pointer', opacity: 0.8 }}>LinkedIn</span>
          </div>
        </div>
      </div>

      {/* COPYRIGHT BOTTOM BAR */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.9rem',
        opacity: 0.7,
        paddingTop: '1rem'
      }}>
        <p>
          &copy; {currentYear} POBA PETs. All rights reserved. 
        </p>
      </div>
    </footer>
  );
};

export default Footer;