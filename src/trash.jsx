import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import seals again (or pass them down, but importing is easier)
import sealDog from './assets/paw1.png'; 
import sealCat from './assets/paw2.png';
import sealBird from './assets/paw3.png';
import sealRabbit from './assets/paw4.png';
import bg from './assets/trash.png';

const sealMap = { dog: sealDog, cat: sealCat, bird: sealBird, rabbit: sealRabbit };

const TrashRecovery = ({ trashStack, onRemoveFromTrash, onSubmitFromTrash, onClose }) => {
  // GET THE LAST ITEM (LIFO)
  const currentItem = trashStack[trashStack.length - 1];
  const { pet, data } = currentItem;

  const [isUncrumpling, setIsUncrumpling] = useState(true);

  useEffect(() => {
    // Play uncrumple animation on mount
    const timer = setTimeout(() => setIsUncrumpling(false), 800);
    return () => clearTimeout(timer);
  }, [currentItem]); // Re-run if item changes (e.g. after deleting one)

  if (!currentItem) return null;

  return (
    <div style={{ 
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
      backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 10000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      
      {/* 1. UNCRUMPLE ANIMATION (Reverse of toss) */}
      {isUncrumpling ? (
        <motion.div
           initial={{ scale: 0.1, x: window.innerWidth/2, y: window.innerHeight/2, rotate: 720 }}
           animate={{ scale: 1, x: 0, y: 0, rotate: 0, borderRadius: '0%' }}
           transition={{ duration: 0.8, ease: "circOut" }}
           style={{
             width: '500px', height: '650px', 
             backgroundColor: '#Fdfcf0',
             backgroundImage: 'repeating-linear-gradient(45deg, #ddd 0px, #ddd 2px, transparent 2px, transparent 20px)',
             boxShadow: '0 0 50px rgba(255,255,255,0.5)',
             display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888'
           }}
        >
          Recovering...
        </motion.div>
      ) : (
        /* 2. THE RECOVERED FORM (Read Only / Submit Mode) */
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ 
            width: '500px', aspectRatio: '8.5 / 11', backgroundColor: '#Fdfcf0', padding: '3rem', 
            boxShadow: '0 0 50px rgba(255, 255, 255, 0.2)', position: 'relative', display: 'flex', flexDirection: 'column',
            backgroundImage: `url("${bg}")`,
            border: '2px dashed #C0392B' // Dashed border to show it's "Recovered"
          }}
        >
           {/* SEAL */}
           <div style={{ position: 'absolute', top: '20px', right: '20px', width: '80px', height: '80px', border: '4px double #C0392B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transform: 'rotate(-15deg)' }}>
             <img src={sealMap[pet.type]} alt="Seal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => {e.target.style.display='none'}} />
           </div>

           <h2 style={{ fontFamily: "'Cinzel', serif", textAlign: 'center', color: '#555', marginTop: '1rem' }}>Recovered Application</h2>
           <p style={{ textAlign: 'center', color: '#C0392B', fontSize: '0.8rem' }}>RESTORED FROM TRASH</p>
           
           <div style={{ display: 'flex', flexDirection: 'column', flex: 1, fontFamily: "'Times New Roman', serif", fontSize: '1.2rem', color: '#333', marginTop: '1rem' }}>
             <p><strong>Candidate:</strong> {pet.name}</p>
             <div style={{ margin: '1rem 0', opacity: 0.7 }}>
                 <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>Full Name:</label>
                 <div style={{ borderBottom: '1px solid #000', padding: '5px' }}>{data.name || "N/A"}</div>
             </div>
             <div style={{ margin: '1rem 0', opacity: 0.7 }}>
                 <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>Address:</label>
                 <div style={{ borderBottom: '1px solid #000', padding: '5px' }}>{data.address || "N/A"}</div>
             </div>
             <div style={{ margin: '1rem 0', opacity: 0.7 }}>
                 <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>Contact Info:</label>
                 <div style={{ borderBottom: '1px solid #000', padding: '5px' }}>{data.contact || "N/A"}</div>
             </div>
           </div>

           <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #ccc' }}>
             {/* REMOVE PERMANENTLY */}
             <button 
                onClick={() => onRemoveFromTrash(currentItem)}
                style={{ backgroundColor: '#C0392B', color: '#fff', padding: '0.8rem 1.5rem', border: 'none', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontWeight: 'bold' }}
             >
               REMOVE PERMANENTLY
             </button>
             
             {/* SUBMIT (RESTORE) */}
             <button 
                onClick={() => onSubmitFromTrash(currentItem)}
                style={{ backgroundColor: '#27AE60', color: '#fff', padding: '0.8rem 1.5rem', border: 'none', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontWeight: 'bold' }}
             >
               RESTORE & SUBMIT
             </button>
           </div>
           
           <button onClick={onClose} style={{ position: 'absolute', top: '10px', left: '10px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </motion.div>
      )}
    </div>
  );
};

export default TrashRecovery;