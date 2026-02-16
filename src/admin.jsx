import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── 1. RAW DATA FROM YOUR WEBSITE (ALL_PETS) ───
const WEBSITE_PETS = [
  { id: 'd1', type: 'dog', name: "Bella", breed: "French Bulldog", age: "2 Yrs", vaccinated: true, neutered: false, checked: true },
  { id: 'd3', type: 'dog', name: "Jimmy", breed: "Labrador Retriever", age: "3 Yrs", vaccinated: false, neutered: false, checked: false },
  { id: 'd4', type: 'dog', name: "Rockey", breed: "Cavalier King Charles Spaniel", age: "1 Yrs", vaccinated: true, neutered: false, checked: true },
  { id: 'd5', type: 'dog', name: "Hummi", breed: "poodle", age: "6 Mos", vaccinated: true, neutered: true, checked: true },
  { id: 'd2', type: 'dog', name: "Charlie", breed: "Golden Retriever", age: "4 Mos", vaccinated: true, neutered: true, checked: true },
  { id: 'c2', type: 'cat', name: 'Milly', breed:'Ragdoll', age:'3 Yrs', vaccinated: true, neutered: false, checked: false },
  { id: 'c3', type: 'cat', name: 'Oscar', breed:"Maine Coon", age:'2 Yrs', vaccinated: false, neutered: false, checked: false },
  { id: 'c4', type: 'cat', name: 'Coco', breed:'scottish fold', age:'4 Yrs', vaccinated: true, neutered: true, checked: true },
  { id: 'c1', type: 'cat', name: 'Luna', breed: "Siamese", age: "1 Yr", vaccinated: true, neutered: true, checked: true },
  { id: 'b1', type: 'bird', name: "Rio", breed: "Macaw", age: "5 Yrs", vaccinated: true, neutered: false, checked: true },
  { id: 'b2', type: 'bird', name: 'Koiwi', breed:"Budgreigar", age:'2 Yrs', vaccinated: false, neutered: false, checked: false },
  { id: 'b3', type: 'bird', name: 'Sky', breed:'Cockatiel', age:'1 Yr', vaccinated: true, neutered: false, checked: true },
  { id: 'b4', type: 'bird', name: 'Sunny', breed:'African Grey Parrot', age:'3 Yrs', vaccinated: true, neutered: false, checked: false },
  { id: 'r1', type: 'rabbit', name: 'Thumper', breed:'Loinhead', age:'6 Mos', vaccinated: true, neutered: false, checked: true },
  { id: 'r2', type: 'rabbit', name: 'BunBun', breed:'Netherland Dwarf', age:'1 Yr', vaccinated: false, neutered: false, checked: false },
  { id: 'r3', type: 'rabbit', name: 'Coco', breed:'Mini rex', age:'2 Yrs', vaccinated: true, neutered: true, checked: true },
];

// ─── 2. CONVERT RAW DATA TO FILE FOLDER FORMAT ───
const INITIAL_DATA = WEBSITE_PETS.map(pet => {
  const stickers = [];
  if (pet.vaccinated) stickers.push('VACCINATED');
  if (pet.neutered) stickers.push('NEUTERED');
  if (pet.checked) stickers.push('CHECKED');

  return {
    id: pet.id,
    name: pet.name,
    breed: pet.breed,
    type: pet.type,
    status: 'available', // All start in Available Cabinet
    stickers: stickers,
    origin: 'inventory', // Default origin
    pendingActions: {},
    adopter: null
  };
});

const AdminPanel = ({ onLogout, receivedApplications = [] }) => {
  const [pets, setPets] = useState(INITIAL_DATA);
  const [isAdding, setIsAdding] = useState(false);
  const [newPet, setNewPet] = useState({ name: '', breed: '', type: 'Dog' });

  // --- COLUMN DEFINITIONS ---
  const columns = [
    { id: 'available', title: 'Available' },
    { id: 'pending', title: 'Pending' },
    { id: 'adopted', title: 'Adopted' }
  ];

  // --- ACTIONS ---

  // Move pet to next stage (Manual Buttons)
  const movePet = (petId, targetStatus) => {
    setPets(prev => prev.map(p => p.id === petId ? { ...p, status: targetStatus } : p));
  };

  // Toggle Text Sticker
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

  // DELETE PET
  const deletePet = (petId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setPets(prev => prev.filter(p => p.id !== petId));
    }
  };

  // Handle Adding New Pet File (Manual Create)
  const handleAddFile = () => {
    if(!newPet.name || !newPet.breed) return; 
    const newId = Math.random().toString(36).substr(2, 5).toUpperCase();
    
    setPets([...pets, { 
        id: newId, 
        name: newPet.name, 
        breed: newPet.breed, 
        type: newPet.type, 
        status: 'available', 
        stickers: [],
        origin: 'inventory'
    }]);
    setNewPet({ name: '', breed: '', type: 'Dog' }); 
    setIsAdding(false);
  };

  // ── 3. PROCESS INCOMING APPLICATIONS (ADOPTION & DONATION) ──
  useEffect(() => {
    if (!receivedApplications || receivedApplications.length === 0) return;

    receivedApplications.forEach(app => {
      setPets(prev => {
        // --- SCENARIO A: DONATION (Incoming) ---
        if (app.type === 'donation') {
            // Prevent duplicate entries
            if (prev.find(p => p.id === app.id)) return prev;

            const stickers = [];
            if (app.healthStatus?.isVaccinated) stickers.push('VACCINATED');
            if (app.healthStatus?.isNeutered) stickers.push('NEUTERED');
            if (app.healthStatus?.isChecked) stickers.push('CHECKED');

            return [...prev, {
                id: app.id,
                name: app.petName,
                breed: app.petBreed,
                type: app.petType,
                status: 'pending', // Donations start in Pending
                origin: 'donation', // MARKER FOR BLUE COLOR
                stickers: stickers,
                donor: app.donorName,
                submittedAt: app.submittedAt,
                pendingActions: {
                    needsChecking: !app.healthStatus?.isChecked 
                }
            }];
        }

        // --- SCENARIO B: ADOPTION (Outgoing) ---
        const exists = prev.find(p => p.id === app.pet.id);
        
        const getApplicationStickers = (currentStickers = []) => {
            const newStickers = [...currentStickers];
            if (app.healthStatus.isVaccinated && !newStickers.includes('VACCINATED')) newStickers.push('VACCINATED');
            if (app.healthStatus.isNeutered && !newStickers.includes('NEUTERED')) newStickers.push('NEUTERED');
            if (app.healthStatus.isChecked && !newStickers.includes('CHECKED')) newStickers.push('CHECKED'); 
            return newStickers;
        };

        if (exists) {
          return prev.map(p => {
            if (p.id === app.pet.id) {
              return {
                ...p,
                stickers: getApplicationStickers(p.stickers),
                status: 'pending', 
                adopter: app.applicant.name,
                adopterContact: app.applicant.contact,
                applicationId: app.id,
                pendingActions: {
                  needsNeutering: !app.healthStatus.isNeutered,
                  needsChecking: !app.healthStatus.isChecked
                }
              };
            }
            return p;
          });
        }
        return prev;
      });
    });
  }, [receivedApplications]);

  // ── 4. AUTO-MOVE LOGIC (Smart Sorting) ──
  useEffect(() => {
    const timer = setTimeout(() => {
      setPets(prevPets => prevPets.map(pet => {
        
        // RULE 1: DONATIONS (Blue Files)
        // If a donation is checked/safe, it moves to AVAILABLE (Inventory)
        if (pet.origin === 'donation' && pet.status === 'pending') {
            if (pet.stickers.includes('CHECKED')) {
                return { ...pet, status: 'available' };
            }
        }

        // RULE 2: ADOPTIONS (Manila Files)
        // If an adoption request is fully safe, it moves to ADOPTED (Archive)
        if (pet.origin !== 'donation' && pet.status === 'pending') {
             if (pet.stickers.includes('CHECKED')) { // Simplified check
                return { ...pet, status: 'adopted' };
             }
        }

        return pet;
      }));
    }, 500); 

    return () => clearTimeout(timer);
  }, [pets]); 

  return (
    <div style={{ 
      width: '100vw', height: '100vh', 
      backgroundColor: '#2C3E50', 
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

      {/* --- ADD FILE MODAL --- */}
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
            <label style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5D4037' }}>NAME:</label>
            <input autoFocus value={newPet.name} onChange={e => setNewPet({...newPet, name: e.target.value})} style={{ padding: '8px', border: '1px solid #D68910', backgroundColor: '#FFF8E7' }} />
            <label style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5D4037' }}>BREED:</label>
            <input value={newPet.breed} onChange={e => setNewPet({...newPet, breed: e.target.value})} placeholder="e.g. Beagle" style={{ padding: '8px', border: '1px solid #D68910', backgroundColor: '#FFF8E7' }} />
            <label style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5D4037' }}>TYPE:</label>
            <select value={newPet.type} onChange={e => setNewPet({...newPet, type: e.target.value})} style={{ padding: '8px', border: '1px solid #D68910', backgroundColor: '#FFF8E7' }}>
              {['Dog', 'Cat', 'Bird', 'Rabbit'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={handleAddFile} style={{ flex: 1, padding: '10px', background: '#27AE60', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>CREATE</button>
              <button onClick={() => setIsAdding(false)} style={{ flex: 1, padding: '10px', background: '#C0392B', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>CANCEL</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN CABINET AREA --- */}
      <div style={{ flex: 1, width: '100%', maxWidth: '1400px', display: 'flex', gap: '20px', padding: '2rem', overflowX: 'auto' }}>
        {columns.map(col => (
          <div key={col.id} style={{ flex: 1, minWidth: '350px', backgroundColor: '#D7DBDD', borderRadius: '10px 10px 0 0', border: '2px solid #95A5A6', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', backgroundColor: '#BDC3C7', borderBottom: '2px solid #95A5A6', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', boxShadow: 'inset 0 -2px 5px rgba(0,0,0,0.1)' }}>
              {col.title} ({pets.filter(p => p.status === col.id).length})
            </div>
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
              <AnimatePresence>
                {pets.filter(p => p.status === col.id).map(pet => (
                  <FileFolder 
                    key={pet.id} 
                    pet={pet} 
                    onMove={(newStatus) => movePet(pet.id, newStatus)}
                    onSticker={(sticker) => toggleSticker(pet.id, sticker)}
                    onDelete={() => deletePet(pet.id)}
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

// --- INDIVIDUAL FILE FOLDER COMPONENT (Dynamic Colors) ---
const FileFolder = ({ pet, onMove, onSticker, onDelete }) => {
  // Determine color based on origin
  const isDonation = pet.origin === 'donation';
  const folderBg = isDonation ? '#AED6F1' : '#F5CBA7'; // Blue if donation, Manila if other
  const folderBorder = isDonation ? '#3498DB' : '#D68910';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        backgroundColor: folderBg, 
        border: `1px solid ${folderBorder}`,
        borderRadius: '5px 15px 5px 5px',
        marginBottom: '1rem', padding: '15px', position: 'relative',
        boxShadow: '3px 3px 8px rgba(0,0,0,0.2)'
      }}
    >
      {/* Folder Tab */}
      <div style={{ position: 'absolute', top: '-15px', left: '0', width: '100px', height: '15px', backgroundColor: folderBg, border: `1px solid ${folderBorder}`, borderBottom: 'none', borderRadius: '5px 5px 0 0' }}></div>
      
      <button onClick={onDelete} style={{ position: 'absolute', top: '10px', right: '10px', background: '#C0392B', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} title="Delete this record">×</button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: `1px solid ${folderBorder}`, paddingBottom: '5px' }}>
        <div>
          <h3 style={{ margin: 0, color: '#2C3E50', fontSize: '1.2rem' }}>{pet.name}</h3>
          <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '4px' }}>
            <span style={{ fontWeight: 'bold' }}>{pet.type.toUpperCase()}</span> <span style={{ margin: '0 5px' }}>|</span> <span>{pet.breed ? pet.breed.toUpperCase() : 'UNKNOWN BREED'}</span>
          </div>
          
          {/* Adopter Label */}
          {pet.adopter && (
            <div style={{ marginTop: '8px', padding: '6px 8px', backgroundColor: 'rgba(39, 174, 96, 0.1)', borderLeft: '3px solid #27AE60', fontSize: '0.75rem', color: '#27AE60', fontWeight: 'bold' }}>
              ADOPTER: {pet.adopter}
            </div>
          )}
          
          {/* Donation Label */}
          {pet.donor && (
            <div style={{ marginTop: '8px', padding: '6px 8px', backgroundColor: 'rgba(52, 152, 219, 0.1)', borderLeft: '3px solid #3498DB', fontSize: '0.75rem', color: '#2980B9', fontWeight: 'bold' }}>
              DONOR: {pet.donor}
            </div>
          )}

        </div>
        <span style={{ fontSize: '0.8rem', color: '#777', alignSelf: 'flex-start' }}>#{pet.id}</span>
      </div>

      <div style={{ minHeight: '30px', display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '15px' }}>
        {pet.stickers.length === 0 && <span style={{ fontSize: '0.8rem', color: '#777', fontStyle: 'italic' }}>No tags applied...</span>}
        {pet.stickers.map(tag => (
          <span key={tag} style={{ fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 6px', backgroundColor: '#E74C3C', color: '#fff', border: '1px dashed #fff', boxShadow: '1px 1px 3px rgba(0,0,0,0.2)', transform: `rotate(${Math.random() * 4 - 2}deg)` }}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{ backgroundColor: 'rgba(255,255,255,0.3)', padding: '10px', borderRadius: '5px' }}>
        <div style={{ marginBottom: '10px', display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: '#2C3E50', width: '100%' }}>ADD STAMP:</span>
          {['VACCINATED', 'NEUTERED', 'CHECKED'].map(tag => (
            <button key={tag} onClick={() => onSticker(tag)} style={{ ...textBtnStyle, backgroundColor: pet.stickers.includes(tag) ? '#D5D8DC' : '#fff' }}>
              {pet.stickers.includes(tag) ? '- ' : '+ '}{tag}
            </button>
          ))}
        </div>

        {pet.status === 'pending' && (
          <div style={{ backgroundColor: '#FFF3CD', border: '1px solid #FFC107', borderRadius: '4px', padding: '8px', marginBottom: '10px', fontSize: '0.75rem', color: '#856404' }}>
            <strong>⚠ PENDING ACTIONS:</strong>
            <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
              {pet.pendingActions?.needsNeutering && !pet.stickers.includes('NEUTERED') && <li>Needs neutering/spaying</li>}
              {pet.pendingActions?.needsChecking && !pet.stickers.includes('CHECKED') && <li>Needs medical check-up</li>}
              {(!pet.pendingActions || (!pet.pendingActions.needsNeutering && !pet.pendingActions.needsChecking)) && !pet.stickers.includes('CHECKED') && <li>Verify safety & Add 'CHECKED' stamp</li>}
            </ul>
          </div>
        )}

        <div style={{ display: 'flex', gap: '5px' }}>
          {pet.status !== 'available' && <button onClick={() => onMove('available')} style={moveBtnStyle}>← TO AVAILABLE</button>}
          {pet.status !== 'pending' && <button onClick={() => onMove('pending')} style={moveBtnStyle}>TO PENDING</button>}
          {pet.status !== 'adopted' && <button onClick={() => onMove('adopted')} style={moveBtnStyle}>TO ADOPTED →</button>}
        </div>
      </div>
    </motion.div>
  );
};

const textBtnStyle = { border: '1px solid #7F8C8D', cursor: 'pointer', borderRadius: '3px', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 'bold', color: '#2C3E50' };
const moveBtnStyle = { flex: 1, border: '1px solid #2C3E50', background: '#2C3E50', color: '#ECF0F1', cursor: 'pointer', borderRadius: '3px', fontSize: '0.7rem', fontWeight: 'bold', padding: '5px' };

export default AdminPanel;