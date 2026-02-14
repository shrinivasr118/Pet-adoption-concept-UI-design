import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'dog', label: 'Dogs', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 'cat', label: 'Cats', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 'bird', label: 'Birds', img: 'https://as2.ftcdn.net/v2/jpg/01/30/44/81/1000_F_130448122_1uSolsve2S53RsicOpm6yRUxOatw8RTz.jpg' },
  { id: 'rabbit', label: 'Rabbits', img: 'https://thumbs.dreamstime.com/b/white-rabbit-grass-1747633.jpg' }
];

const PetCategories = ({ onSelect, onBack }) => {
  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#FAEBD7', // Keep the Beige Brand Color
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', zIndex: 2 }}>
        <h2 style={{ fontFamily: "'Long Cang', cursive", fontSize: '4rem', color: '#4A3728', margin: 0 }}>
          Who are you looking for?
        </h2>
        <p style={{ color: '#4A3728', opacity: 0.7, fontSize: '1.2rem' }}>
          Select a category to see more.
        </p>
      </div>

      {/* BACK BUTTON */}
      <motion.button 
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        style={{
          position: 'absolute', top: '2rem', left: '2rem',
          padding: '0.5rem 1rem', background: 'transparent',
          border: '2px solid #4A3728', borderRadius: '50px',
          color: '#4A3728', cursor: 'pointer', fontWeight: 'bold'
        }}
      >
        ← Back Home
      </motion.button>

      {/* CATEGORY GRID */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center',
        maxWidth: '1200px',
        padding: '0 2rem'
      }}>
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            onClick={() => onSelect(cat.id)} // Triggers the next page
            whileHover={{ y: -10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '250px',
              height: '350px',
              backgroundColor: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0px 10px 20px rgba(74, 55, 40, 0.1)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Image */}
            <div style={{ height: '80%', width: '100%' }}>
              <img 
                src={cat.img} 
                alt={cat.label} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            
            {/* Label */}
            <div style={{ 
              height: '20%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#fff'
            }}>
              <span style={{ 
                fontFamily: "'Cinzel', serif", 
                fontSize: '1.5rem', 
                color: '#4A3728', 
                fontWeight: 'bold' 
              }}>
                {cat.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default PetCategories;