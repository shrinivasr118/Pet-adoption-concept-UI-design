import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ onContactClick, onInstagramClick, onTwitterClick, onLinkedInClick }) => {
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
          <p style={{ marginBottom: '0.5rem' }}>+91 98765 43210</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <motion.span
              onClick={onInstagramClick}
              whileHover={{ scale: 1.1, color: '#E1306C' }}
              style={{ cursor: 'pointer', opacity: 0.85, fontWeight: '600', padding: '4px 12px', border: '1px solid rgba(74,55,40,0.3)', borderRadius: '20px', fontSize: '0.9rem' }}
            >
              Instagram
            </motion.span>
            <motion.span
              onClick={onTwitterClick}
              whileHover={{ scale: 1.1, color: '#1d9bf0' }}
              style={{ cursor: 'pointer', opacity: 0.85, fontWeight: '600', padding: '4px 12px', border: '1px solid rgba(74,55,40,0.3)', borderRadius: '20px', fontSize: '0.9rem' }}
            >
              Twitter
            </motion.span>
            <motion.span
              onClick={onLinkedInClick}
              whileHover={{ scale: 1.1, color: '#0a66c2' }}
              style={{ cursor: 'pointer', opacity: 0.85, fontWeight: '600', padding: '4px 12px', border: '1px solid rgba(74,55,40,0.3)', borderRadius: '20px', fontSize: '0.9rem' }}
            >
              LinkedIn
            </motion.span>
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