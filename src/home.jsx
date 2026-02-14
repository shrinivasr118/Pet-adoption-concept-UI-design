import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASSETS FOR DONATION FORM ---
import sealDog from './assets/paw1.png'; 
import sealCat from './assets/paw2.png';
import sealBird from './assets/paw3.png';
import sealRabbit from './assets/paw4.png';

// Fallback if specific seal not found
import sealGeneric from './assets/paw1.png'; 

const sealMap = {
  dog: sealDog,
  cat: sealCat,
  bird: sealBird,
  rabbit: sealRabbit,
  other: sealGeneric
};

const Home = ({ onAdoptClick, onTrash }) => {
  const [isDonating, setIsDonating] = useState(false);

  return (
    // CHANGE 1: Restored your layout settings
    <div id="home" style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', padding: '0 2rem', position: 'relative' }}>
      
      {/* --- HERO SECTION --- */}
      <section style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '100vh', 
        paddingTop: '0px' 
      }}>
        
        {/* Left: Text Content */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ flex: '1 1 600px', paddingRight: '2rem' }} 
        >
          <h1 style={{ 
            fontSize: '7rem', 
            lineHeight: '1.1', 
            marginBottom: '2rem',
            color: '#4A3728'
          }}>
            Make a new <br />
            <span style={{ fontFamily: "'Long Cang', cursive", color: '#E07A5F' }}>Best Friend</span>
          </h1>
          
          <p style={{ fontSize: '1.5rem', lineHeight: '1.6', marginBottom: '3rem', opacity: 0.9, maxWidth: '600px' }}>
            Every pet deserves a soft bed and a warm lap. 
            Browse our shelter to find the purr-fect addition to your family today.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {/* ADOPT BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(74, 55, 40, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onAdoptClick}
              style={{...buttonStylePrimary, padding: '1.2rem 2.5rem', fontSize: '1.2rem'}}
            >
              Adopt Now
            </motion.button>

            {/* DONATE BUTTON - Now triggers the Form */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(74, 55, 40, 0.1)", boxShadow: "0px 8px 15px rgba(74, 55, 40, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDonating(true)} // <--- CONNECTED DONATION FORM
              style={{...buttonStyleSecondary, padding: '1.2rem 2.5rem', fontSize: '1.2rem'}}
            >
              Donate
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Image Area */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
            flex: '1 1 500px', 
            display: 'flex', 
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {/* Big Blob */}
          <div style={{
            position: 'absolute',
            width: '600px', 
            height: '600px', 
            backgroundColor: '#EADDCA', 
            borderRadius: '50% 40% 30% 70% / 60% 30% 70% 40%', 
            zIndex: -1,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}></div>

          {/* Your Image */}
          <img 
            src="src/assets/pic1.png" 
            alt="Happy Dog"
            style={{ 
              width: '100%', 
              maxWidth: '650px', 
              borderRadius: '20px',
              boxShadow: '25px 25px 0px rgba(74, 55, 40, 0.1)'
            }} 
          />
        </motion.div>
      </section>

      {/* --- DONATION FORM MODAL (Hidden until clicked) --- */}
      <AnimatePresence>
        {isDonating && (
          <DonationForm 
            onClose={() => setIsDonating(false)} 
            onTrash={onTrash} 
          />
        )}
      </AnimatePresence>

    </div>
  );
};

// --- DONATION FORM COMPONENT (Functionality Preserved) ---
const DonationForm = ({ onClose, onTrash }) => {
  const [status, setStatus] = useState('filling'); 
  
  const [formData, setFormData] = useState({
    name: '', address: '', contact: '',
    petType: 'dog', breed: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('stamped');
    setTimeout(() => onClose(), 1500);
  };

  const handleTrash = (e) => {
    e.preventDefault();
    setStatus('crumpling');
    setTimeout(() => {
       setStatus('tossing');
       setTimeout(() => {
           const trashItem = {
             pet: { 
               id: 'DON-' + Math.floor(Math.random() * 1000), 
               type: formData.petType, 
               name: formData.breed || "Unknown Pet", 
               breed: "Donation Request",
               img: "https://i.pinimg.com/736x/86/b0/98/86b0980ef543191114a946d7d4f1c90a.jpg" 
             },
             data: formData
           };
           onTrash(trashItem);
           onClose();
       }, 800);
    }, 800);
  };

  return (
    <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
        backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, 
        display: 'flex', alignItems: 'center', justifyContent: 'center' 
    }}>
      
      {(status === 'filling' || status === 'stamped') && (
        <motion.div
          initial={{ y: 500, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
          style={{ 
            width: '500px', aspectRatio: '8.5 / 11', backgroundColor: '#Fdfcf0', padding: '3rem', 
            boxShadow: '1px 1px 15px rgba(0,0,0,0.3)', position: 'relative', display: 'flex', flexDirection: 'column',
            backgroundImage: `url("https://i.pinimg.com/736x/86/b0/98/86b0980ef543191114a946d7d4f1c90a.jpg")`
          }}
        >
          {/* Dynamic Seal */}
          <motion.div 
            initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, type: 'spring' }}
            style={{ 
              position: 'absolute', top: '20px', right: '20px', width: '80px', height: '80px',
              border: '4px double #C0392B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', transform: 'rotate(-15deg)'
            }}
          >
             <img src={sealMap[formData.petType] || sealGeneric} alt="Seal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => {e.target.style.display='none'}} />
          </motion.div>

          <h1 style={{ fontFamily: "'Cinzel', serif", textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: '1rem', marginTop: '1rem' }}>Donation Form</h1>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, fontFamily: "'Times New Roman', serif", fontSize: '1.2rem', color: '#333' }}>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>Pet Type:</label>
                    <select name="petType" value={formData.petType} onChange={handleChange} style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', background: 'transparent', fontSize: '1.1rem', padding: '5px 0' }}>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="bird">Bird</option>
                        <option value="rabbit">Rabbit</option>
                    </select>
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>Breed:</label>
                    <input name="breed" value={formData.breed} onChange={handleChange} required type="text" style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', background: 'transparent', outline: 'none', fontSize: '1.1rem' }} />
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>Donor Name:</label>
                <input name="name" value={formData.name} onChange={handleChange} required type="text" style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', background: 'transparent', outline: 'none', fontSize: '1.1rem' }} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>Address:</label>
                <input name="address" value={formData.address} onChange={handleChange} required type="text" style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', background: 'transparent', outline: 'none', fontSize: '1.1rem' }} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 'bold' }}>Contact Info:</label>
                <input name="contact" value={formData.contact} onChange={handleChange} required type="text" style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', background: 'transparent', outline: 'none', fontSize: '1.1rem' }} />
            </div>

            {status === 'stamped' && (
               <motion.div initial={{ scale: 3, opacity: 0 }} animate={{ scale: 1, opacity: 0.9 }} style={{ position: 'absolute', bottom: '100px', right: '60px', color: '#27AE60', border: '4px solid #27AE60', borderRadius: '8px', padding: '5px 15px', transform: 'rotate(-10deg)', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '2px', pointerEvents: 'none' }}>
                 DONATION SENT
               </motion.div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
              <button onClick={handleTrash} type="button" style={{ border: 'none', background: 'transparent', color: '#C0392B', cursor: 'pointer', fontSize: '1rem', textDecoration: 'underline', fontFamily: 'serif' }}>Cancel & Toss</button>
              <button type="submit" disabled={status === 'stamped'} style={{ backgroundColor: '#4A3728', color: '#fff', padding: '0.8rem 2rem', border: 'none', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontWeight: 'bold' }}>
                {status === 'stamped' ? "SENT" : "STAMP & DONATE"}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {status === 'crumpling' && (
        <motion.div initial={{ scale: 1, borderRadius: '0%' }} animate={{ scale: 0.3, borderRadius: '50%', rotate: [0, 10, -10, 20, -20, 0] }} transition={{ duration: 0.8 }} style={{ width: '500px', height: '650px', backgroundColor: '#Fdfcf0', backgroundImage: 'repeating-linear-gradient(45deg, #ddd 0px, #ddd 2px, transparent 2px, transparent 20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.2)' }} />
      )}

      {status === 'tossing' && (
        <motion.div initial={{ scale: 0.3, x: 0, y: 0 }} animate={{ x: (window.innerWidth / 2) - 50, y: (window.innerHeight / 2) - 50, rotate: 720, scale: 0.1, opacity: 0 }} transition={{ duration: 0.8, ease: "easeIn" }} style={{ width: '500px', height: '650px', backgroundColor: '#ddd', borderRadius: '50%', backgroundImage: 'repeating-linear-gradient(45deg, #bbb 0px, #bbb 2px, transparent 2px, transparent 10px)', boxShadow: '0 10px 20px rgba(0,0,0,0.3)', zIndex: 999 }} />
      )}
    </div>
  );
};

// --- STYLES ---
const buttonStylePrimary = {
  backgroundColor: '#4A3728',
  color: '#FAEBD7',
  border: 'none',
  borderRadius: '50px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const buttonStyleSecondary = {
  backgroundColor: 'transparent',
  color: '#4A3728',
  border: '2px solid #4A3728',
  borderRadius: '50px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default Home;