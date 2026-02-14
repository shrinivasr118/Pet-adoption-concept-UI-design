import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Dustbin = ({ trashCount, isReceivingTrash, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const isVisible = isHovered || isReceivingTrash || trashCount > 0;

  return (
    <motion.div
      onClick={onOpen} // <--- ADD CLICK HANDLER
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ x: 120, opacity: 0 }} 
      animate={{ 
        x: isHovered ? 0 : (trashCount > 0 ? 80 : 120), 
        opacity: 1 
      }}
      transition={{ type: 'spring', stiffness: 120 }}
      style={{
        position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, cursor: 'pointer'
      }}
    >
      <div style={{ position: 'relative', width: '80px', height: '100px' }}>
        
        {/* BIN BODY */}
        <div style={{
          width: '100%', height: '100%', backgroundColor: '#5D6D7E', borderRadius: '0 0 10px 10px',
          border: '4px solid #34495E', display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          boxShadow: '-5px 5px 15px rgba(0,0,0,0.3)'
        }}>
          {trashCount > 0 && (
            <div style={{
              width: '50px', height: '50px', backgroundColor: '#eee', borderRadius: '50%',
              marginBottom: '10px', border: '1px solid #ccc',
              backgroundImage: 'repeating-linear-gradient(45deg, #ccc 0px, #ccc 1px, transparent 1px, transparent 5px)'
            }} />
          )}
        </div>

        {/* BIN LID */}
        <motion.div
          animate={{ rotate: isHovered || isReceivingTrash ? -45 : 0 }}
          style={{
            position: 'absolute', top: '-10px', left: '-5px', width: '90px', height: '15px',
            backgroundColor: '#34495E', borderRadius: '5px', transformOrigin: 'left center'
          }}
        />
        
        {/* COUNT BADGE */}
        {trashCount > 0 && (
          <div style={{ 
            position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', 
            borderRadius: '50%', width: '20px', height: '20px', textAlign: 'center', fontSize: '12px', lineHeight: '20px' 
          }}>
            {trashCount}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dustbin;