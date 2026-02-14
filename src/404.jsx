import React from 'react';
import { motion } from 'framer-motion';
import mechanicImg from './assets/not.png'; 

const NotFound = ({ onGoHome, onAdminLogin }) => {
  
  // THE EASTER EGG LOGIC
  const handleSecretClick = () => {
    const user = prompt("Identity Verification:");
    const pass = prompt("Access Code:");
    
    if (user === 'admin' && pass === 'admin') {
      onAdminLogin(); // Switches view to 'admin'
    } else {
      alert("Access Denied. Authorities have been notified.");
    }
  };

  return (
    <div style={{
      width: '100vw', height: '100vh', backgroundColor: '#FAEBD7', 
      backgroundImage: 'radial-gradient(#d4c5b0 1px, transparent 1px)', backgroundSize: '20px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden'
    }}>

      <motion.div
        initial={{ y: -500, rotate: -10 }} animate={{ y: 0, rotate: 0 }} transition={{ type: "spring", stiffness: 60 }}
        style={{
          width: '500px', backgroundColor: '#fff', padding: '2rem',
          boxShadow: '0px 20px 40px rgba(0,0,0,0.2)', position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', borderTop: '10px solid #555'
        }}
      >
        <div style={{ position: 'absolute', top: '-25px', width: '150px', height: '40px', backgroundColor: '#777', borderRadius: '10px', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)', zIndex: 10 }}></div>

        <div style={{ width: '100%', borderBottom: '2px solid #333', marginBottom: '1rem', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: '2rem', margin: 0, color: '#333' }}>WORK ORDER</h1>
          <span style={{ fontFamily: "'Courier New', monospace", color: '#C0392B', fontWeight: 'bold', fontSize: '1.2rem' }}>ERR-404</span>
        </div>

        {/* THE SECRET CLICK IMAGE */}
        <div 
          onClick={handleSecretClick} // <--- EASTER EGG TRIGGER
          style={{ width: '100%', border: '4px solid #333', padding: '5px', backgroundColor: '#eee', marginBottom: '1.5rem', cursor: 'help' }}
        >
          <img src={mechanicImg} alt="Mechanic" style={{ width: '100%', height: 'auto', display: 'block', filter: 'sepia(20%) contrast(110%)' }} />
        </div>

        <div style={{ width: '100%', fontFamily: "'Courier New', monospace", color: '#555', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          <p><strong>STATUS:</strong> <span style={{ color: '#C0392B', fontWeight: 'bold' }}>MISSING / BROKEN</span></p>
          <p><strong>DESCRIPTION:</strong> The requested page has come loose. Our top technicians are investigating.</p>
        </div>

        <motion.button onClick={onGoHome} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '1rem 2rem', fontSize: '1.5rem', fontFamily: "'Black Ops One', cursive", color: '#27AE60', border: '4px solid #27AE60', borderRadius: '10px', backgroundColor: 'transparent', cursor: 'pointer', transform: 'rotate(-5deg)', opacity: 0.9 }}>
          RETURN HOME
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;