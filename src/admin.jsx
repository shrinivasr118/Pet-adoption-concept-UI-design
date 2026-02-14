import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK INITIAL DATA ---
// Added 'breed' to initial data for consistency
const INITIAL_DATA = [
  { id: 'd1', name: "Bella", type: "Dog", breed: "Golden Retriever", status: "available", stickers: [] },
  { id: 'c1', name: "Luna", type: "Cat", breed: "Siamese", status: "available", stickers: [] },
  { id: 'b1', name: "Rio", type: "Bird", breed: "Parrot", status: "pending", stickers: ['VACCINATED'] },
  { id: 'r1', name: "Thumper", type: "Rabbit", breed: "Holland Lop", status: "adopted", stickers: ['ADOPTED'] },
];

const AdminPanel = ({ onLogout }) => {
  const [pets, setPets] = useState(INITIAL_DATA);
  const [isAdding, setIsAdding] = useState(false);
  
  // FORM STATE: Includes Name, Breed, and Type
  const [newPet, setNewPet] = useState({ name: '', breed: '', type: 'Dog' });

  // --- COLUMN DEFINITIONS (INFO IN COMMENTS) ---
  /* COLUMN 1: 'available'
     - Description: Files here represent pets ready for adoption.
     - Functionality: These records are PUBLICLY VISIBLE on the main Adoption Page.
     
     COLUMN 2: 'pending'
     - Description: Pets currently in the application process or under medical hold.
     - Functionality: Hidden from the public grid but editable by admins.
     
     COLUMN 3: 'adopted'
     - Description: Archived records for pets who have found homes.
     - Functionality: Read-only history (mostly), keeps the database organized.
  */
  const columns = [
    { id: 'available', title: 'Available' },
    { id: 'pending', title: 'Pending' },
    { id: 'adopted', title: 'Adopted' }
  ];

  // --- ACTIONS ---

  // Move pet to next stage (Drag & Drop Logic Replacement)
  const movePet = (petId, targetStatus) => {
    setPets(prev => prev.map(p => p.id === petId ? { ...p, status: targetStatus } : p));
  };

  // Toggle Text Sticker (e.g. VACCINATED, NEUTERED)
  const toggleSticker = (petId, stickerLabel) => {
    setPets(prev => prev.map(p => {
      if (p.id === petId) {
        const hasSticker = p.stickers.includes(stickerLabel);
        return {
          ...p,
          stickers: hasSticker 
            ? p.stickers.filter(s => s !== stickerLabel) 
            : [...p.stickers, stickerLabel]
        };
      }
      return p;
    }));
  };

  // Handle Adding New Pet File
  const handleAddFile = () => {
    if(!newPet.name || !newPet.breed) return; // Basic validation
    
    // Generate a random ID like 'A7X2'
    const newId = Math.random().toString(36).substr(2, 5).toUpperCase();
    
    setPets([...pets, { 
        id: newId, 
        name: newPet.name, 
        breed: newPet.breed, 
        type: newPet.type, 
        status: 'available', // Default to available
        stickers: [] 
    }]);
    
    // Reset Form & Close Modal
    setNewPet({ name: '', breed: '', type: 'Dog' }); 
    setIsAdding(false);
  };

  return (
    <div style={{ 
      width: '100vw', height: '100vh', 
      backgroundColor: '#2C3E50', // Dark Blue-Grey Background
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      fontFamily: "'Courier New', monospace"
    }}>
      
      {/* --- HEADER --- */}
      <div style={{ 
        width: '100%', padding: '1rem 2rem', 
        backgroundColor: '#34495E', color: '#ecf0f1', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '4px solid #1A252F', boxShadow: '0 5px 10px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem' }}>🗄️</span> RECORDS_SYSTEM_V1
        </h1>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => setIsAdding(true)}
            style={{ background: '#27AE60', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            + NEW FILE
          </button>
          <button onClick={onLogout} style={{ background: '#C0392B', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            LOGOUT
          </button>
        </div>
      </div>

      {/* --- ADD FILE MODAL (Popup) --- */}
      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ 
              position: 'absolute', top: '100px', zIndex: 50,
              backgroundColor: '#F5CBA7', padding: '2rem', borderRadius: '10px',
              border: '2px solid #D68910', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px'
            }}
          >
            <h3 style={{ margin: 0, color: '#5D4037', borderBottom: '1px dashed #5D4037', paddingBottom: '10px' }}>NEW RECORD ENTRY</h3>
            
            {/* NAME INPUT */}
            <label style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5D4037' }}>NAME:</label>
            <input 
              autoFocus
              value={newPet.name} onChange={e => setNewPet({...newPet, name: e.target.value})}
              style={{ padding: '8px', border: '1px solid #D68910', backgroundColor: '#FFF8E7' }} 
            />

            {/* BREED INPUT */}
            <label style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5D4037' }}>BREED:</label>
            <input 
              value={newPet.breed} onChange={e => setNewPet({...newPet, breed: e.target.value})}
              placeholder="e.g. Beagle"
              style={{ padding: '8px', border: '1px solid #D68910', backgroundColor: '#FFF8E7' }} 
            />
            
            {/* TYPE SELECT */}
            <label style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5D4037' }}>TYPE:</label>
            <select 
              value={newPet.type} onChange={e => setNewPet({...newPet, type: e.target.value})}
              style={{ padding: '8px', border: '1px solid #D68910', backgroundColor: '#FFF8E7' }}
            >
              {['Dog', 'Cat', 'Bird', 'Rabbit'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={handleAddFile} style={{ flex: 1, padding: '10px', background: '#27AE60', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>CREATE</button>
              <button onClick={() => setIsAdding(false)} style={{ flex: 1, padding: '10px', background: '#C0392B', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>CANCEL</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CABINET AREA (Drawers) --- */}
      <div style={{ 
        flex: 1, width: '100%', maxWidth: '1400px', 
        display: 'flex', gap: '20px', padding: '2rem', 
        overflowX: 'auto' 
      }}>
        
        {columns.map(col => (
          <div key={col.id} style={{ 
            flex: 1, minWidth: '350px',
            backgroundColor: '#D7DBDD', // Metal interior color
            borderRadius: '10px 10px 0 0',
            border: '2px solid #95A5A6',
            display: 'flex', flexDirection: 'column'
          }}>
            {/* COLUMN HEADER */}
            <div style={{ 
              padding: '1rem', backgroundColor: '#BDC3C7', 
              borderBottom: '2px solid #95A5A6', textAlign: 'center',
              fontWeight: 'bold', textTransform: 'uppercase',
              boxShadow: 'inset 0 -2px 5px rgba(0,0,0,0.1)'
            }}>
              {col.title} ({pets.filter(p => p.status === col.id).length})
            </div>

            {/* FILES CONTAINER */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              <AnimatePresence>
                {pets.filter(p => p.status === col.id).map(pet => (
                  <FileFolder 
                    key={pet.id} 
                    pet={pet} 
                    onMove={(newStatus) => movePet(pet.id, newStatus)}
                    onSticker={(sticker) => toggleSticker(pet.id, sticker)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

// --- INDIVIDUAL FILE FOLDER COMPONENT ---
const FileFolder = ({ pet, onMove, onSticker }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        backgroundColor: '#F5CBA7', // Manila Folder Color
        border: '1px solid #D68910',
        borderRadius: '5px 15px 5px 5px',
        marginBottom: '1rem',
        padding: '15px',
        position: 'relative',
        boxShadow: '3px 3px 8px rgba(0,0,0,0.2)'
      }}
    >
      {/* FOLDER TAB VISUAL */}
      <div style={{ position: 'absolute', top: '-15px', left: '0', width: '100px', height: '15px', backgroundColor: '#F5CBA7', border: '1px solid #D68910', borderBottom: 'none', borderRadius: '5px 5px 0 0' }}></div>

      {/* HEADER INFO (Name, Type, Breed) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #D68910', paddingBottom: '5px' }}>
        <div>
          <h3 style={{ margin: 0, color: '#5D4037', fontSize: '1.2rem' }}>{pet.name}</h3>
          <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>
            <span style={{ fontWeight: 'bold' }}>{pet.type.toUpperCase()}</span> 
            <span style={{ margin: '0 5px' }}>|</span> 
            <span>{pet.breed ? pet.breed.toUpperCase() : 'UNKNOWN BREED'}</span>
          </div>
        </div>
        <span style={{ fontSize: '0.8rem', color: '#888', alignSelf: 'flex-start' }}>#{pet.id}</span>
      </div>

      {/* TEXT TAGS (Stickers) */}
      <div style={{ minHeight: '30px', display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '15px' }}>
        {pet.stickers.length === 0 && <span style={{ fontSize: '0.8rem', color: '#999', fontStyle: 'italic' }}>No tags applied...</span>}
        
        {pet.stickers.map(tag => (
          <span key={tag} style={{
            fontSize: '0.7rem', fontWeight: 'bold',
            padding: '2px 6px',
            backgroundColor: '#E74C3C', // Red "Stamp" look
            color: '#fff',
            border: '1px dashed #fff',
            boxShadow: '1px 1px 3px rgba(0,0,0,0.2)',
            transform: `rotate(${Math.random() * 4 - 2}deg)` // Random natural tilt
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* ACTION PANEL (Bottom Controls) */}
      <div style={{ backgroundColor: 'rgba(255,255,255,0.3)', padding: '10px', borderRadius: '5px' }}>
        
        {/* ADD STAMPS */}
        <div style={{ marginBottom: '10px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#5D4037', width: '100%' }}>ADD STAMP:</span>
          {['VACCINATED', 'NEUTERED', 'CHECKED'].map(tag => (
            <button 
              key={tag} 
              onClick={() => onSticker(tag)} 
              style={{ ...textBtnStyle, backgroundColor: pet.stickers.includes(tag) ? '#D5D8DC' : '#fff' }}
            >
              {pet.stickers.includes(tag) ? '- ' : '+ '}{tag}
            </button>
          ))}
        </div>

        {/* MOVE FILE */}
        <div style={{ display: 'flex', gap: '5px' }}>
          {pet.status !== 'available' && <button onClick={() => onMove('available')} style={moveBtnStyle}>← TO AVAILABLE</button>}
          {pet.status !== 'pending' && <button onClick={() => onMove('pending')} style={moveBtnStyle}>TO PENDING</button>}
          {pet.status !== 'adopted' && <button onClick={() => onMove('adopted')} style={moveBtnStyle}>TO ADOPTED →</button>}
        </div>
      </div>

    </motion.div>
  );
};

// --- STYLES ---
const textBtnStyle = { 
  border: '1px solid #D68910', cursor: 'pointer', borderRadius: '3px', 
  padding: '4px 8px', fontSize: '0.7rem', fontWeight: 'bold', color: '#5D4037' 
};

const moveBtnStyle = { 
  flex: 1, border: '1px solid #5D4037', background: '#5D4037', 
  color: '#F5CBA7', cursor: 'pointer', borderRadius: '3px', 
  fontSize: '0.7rem', fontWeight: 'bold', padding: '5px' 
};

export default AdminPanel;