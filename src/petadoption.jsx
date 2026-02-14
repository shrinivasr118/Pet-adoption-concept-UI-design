import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';

// --- ASSET IMPORTS ---
import bg from './assets/l.png'; // Your Main Background

// Import your separate seal images here
// Make sure these files exist in your src/assets folder!
import sealDog from './assets/paw1.png'; 
import sealCat from './assets/paw2.png';
import sealBird from './assets/paw3.png';
import sealRabbit from './assets/paw4.png';

// Map types to images for easy access
const sealMap = {
  dog: sealDog,
  cat: sealCat,
  bird: sealBird,
  rabbit: sealRabbit
};

// --- MOCK DATA ---
const ALL_PETS = [
  { id: 'd1', type: 'dog', name: "Bella", breed: "French Bulldog", age: "2 Yrs", img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&w=600&q=80" },
  { id: 'd3', type: 'dog', name: "Jimmy", breed: "Labrador Retriever", age: "3 Yrs", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbCH85-XTGMTpYRXNJ5ncQF7qjZ6sfK733_-uN0Gy8lO3HQ8F47X3xXBJGobW24Nsg_e1NYvoIFPRuCe1020oVA5kDERYZbzPpR7m9iPESQ&s=10"},
  { id: 'd4', type: 'dog', name: "Rockey", breed: "Cavalier King Charles Spaniel", age: "1 Yrs", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ4wWKsOLfahRpJeNNN3IBf_PPNSR4ERkFNqsH_RfKwlTCUEoPLSyVT4nq1fsnwGeg6O7aBV8z0hLAjpqshKiCq2u3XaGdkz7VARj8SvdqjA&s=10"},
  { id: 'd5', type: 'dog', name: "Hummi", breed: "poodle", age: "6 Mos", img: "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg"},
  { id: 'd2', type: 'dog', name: "Charlie", breed: "Golden Retriever", age: "4 Mos", img: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?ixlib=rb-4.0.3&w=600&q=80" },
  { id: 'c2', type: 'cat', name: 'Milly', breed:'Ragdoll', age:'3 Yrs', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXtYb7t9-Xhx9EjhvoAPH_7FxTvzQaO9Gz_dtxz0VQzMfCOG-GdTSjDzZZa_YFtr3EedDMos2HFyQnz-0mL5sCWlZ2XA9F8HmH_rkbyOH0&s=10'},
  { id: 'c3', type: 'cat', name: 'Oscar', breed:"Maine Coon", age:'2 Yrs', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdXbnqLdgNRYpqdPU7UiEVtHyi6LHqHY6_xhJOHwNfKZgIsWmRq82trPrtSxhrjzI0314g_bP1hoN3Nny7MQSZ9X1n-9Kxah9iFlCpJYA7LQ&s=10'},
  { id: 'c4', type: 'cat', name: 'Coco', breed:'scottish fold', age:'4 Yrs', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW_8POxdGgddCdsMB1KifsqPbcmpRDd1VOwKJO9T7MLTgQNNDJMw4QNh18_NATBaFGEeoeMFMuMA-fC0sRSj_mZLpB9Zv1vW9N7o517F1W&s=10'},
  { id: 'c1', type: 'cat', name: "Luna", breed: "Siamese", age: "1 Yr", img: "https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&w=600&q=80" },
  { id: 'b1', type: 'bird', name: "Rio", breed: "Macaw", age: "5 Yrs", img: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&w=600&q=80" },
  { id: 'b2', type: 'bird', name: 'Koiwi', breed:"Budgreigar", age:'2 Yrs', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTEozJKkTGSTOKJrUZuek4LMZnIVwwDK-AuNDTRMaVHQPAo9V8wfs1Q_1mmYhZr_drOr0_wFosei8eIsLI1D2THPfGdTpPG05qO5G1pOpicA&s=10'},
  { id: 'b3', type: 'bird', name: 'Sky', breed:'Cockatiel', age:'1 Yr', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYsD-6sHCmbAMajF_w9MFX4c0Jp6eBqL9zw4NM2EgDjCoVzgNXlmRrkO3SsSunKUS7LvoQiMAMMhE3cwddRCTIGKL6rsNz2InOBKtgLKwXDg&s=10'},
  { id: 'b4', type: 'bird', name: 'Sunny', breed:'African Grey Parrot', age:'3 Yrs', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI6NwEWUUdw2hBIfcKycAm2fhTd7gFgc4RTKIkolzsZffvft8_wPNDIWqH9cFOULbJRndb0GrDcOOk_HI8SrWHSjd97AWo4sPodFkIwJkk4w&s=10'},
  { id: 'r1', type: 'rabbit', name: 'Thumper', breed:'Loinhead', age:'6 Mos', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjiruIla2h3R6iU5rqIT5JoFIxUsrOzXjw_genR4-0e62dwaBtwcildC-LYdduJyw-h_g_6r9fgprdW7sHX1bhZxRMynbXbf0jq9XhIOMY&s=10'},
  { id: 'r2', type: 'rabbit', name: 'BunBun', breed:'Netherland Dwarf', age:'1 Yr', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw18rUkQhz9feB6HVPj7ngHoLlBj633aH6AkCIQ-aaI5ACuzqbactkLW9DxlYC3HDgHtYj3_AvtCcSlHBY2wE6YA3V1FA6zxx0hc5NmCmq&s=10'},
  { id: 'r3', type: 'rabbit', name: 'Coco', breed:'Mini rex', age:'2 Yrs', img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ8LXoPgpCtgxu3U55BC_KhzCCCfMX5BFXnJXu7qGybX9gLd-qVx5BXzLuodgT-IPm95Rqv7V3PWWSd5ufrmkp2hG7vbygE_wzP3i1NlhP1Q&s=10'},
];

const PetAdoption = ({ onBack, category, onTrash }) => {
  const [activePets, setActivePets] = useState([]);
  const [tossedPets, setTossedPets] = useState([]); 
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    const filtered = category ? ALL_PETS.filter(pet => pet.type === category) : ALL_PETS;
    setActivePets(filtered);
    setTossedPets([]); 
  }, [category]);

  const handleToss = (pet, dragOffset) => {
    setActivePets((current) => current.filter((p) => p.id !== pet.id));
    
    // 13-inch screen safe zones
    const xDir = dragOffset.x > 0 ? 1 : -1;
    const yDir = dragOffset.y > 0 ? 1 : -1;
    const minX = 250; const maxX = 450; 
    const minY = 50;  const maxY = 250;
    
    const finalX = xDir * (Math.floor(Math.random() * (maxX - minX + 1)) + minX);
    const finalY = yDir * (Math.floor(Math.random() * (maxY - minY + 1)) + minY);

    setTossedPets(curr => [...curr, { ...pet, x: finalX, y: finalY, rotation: Math.random() * 60 - 30 }]); 
  };

  return (
    <div style={{
      width: '100vw', height: '100vh',
      // USE THE IMPORTED BACKGROUND HERE
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover', backgroundPosition: 'center',
      overflow: 'hidden', position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(250, 235, 215, 0.85)', zIndex: 1 }}></div>

      <div style={{ position: 'absolute', top: '2rem', width: '100%', textAlign: 'center', zIndex: 10 }}>
        <h2 style={{ fontFamily: "'Long Cang', cursive", fontSize: '3rem', color: '#4A3728', margin: 0 }}>Spread the Table</h2>
        <p style={{ color: '#4A3728' }}>Viewing: {category || "All Pets"}</p>
      </div>
      
      <button onClick={onBack} style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 30, padding: '0.5rem 1rem', borderRadius: '50px', border: '2px solid #4A3728', background: 'transparent', cursor: 'pointer', fontWeight: 'bold', color: '#4A3728' }}>
        ← Categories
      </button>
      
      {/* --- FLOOR --- */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 5 }}>
        <AnimatePresence>
          {tossedPets.map((pet) => (
            <motion.div
              key={`tossed-${pet.id}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 0.5, x: pet.x, y: pet.y, rotate: pet.rotation }}
              whileHover={{ scale: 0.6, zIndex: 20, cursor: 'pointer', boxShadow: '0 20px 30px rgba(0,0,0,0.2)' }}
              onClick={() => setSelectedPet(pet)}
              style={{
                position: 'absolute',
                top: 'calc(50% - 250px)', left: 'calc(50% - 175px)', 
                width: '350px', height: '500px',
                backgroundColor: '#fff', borderRadius: '20px', padding: '15px',
                boxShadow: '0px 5px 15px rgba(0,0,0,0.1)'
              }}
            >
               <img src={pet.img} alt={pet.name} style={{ width: '100%', height: '75%', objectFit: 'cover', borderRadius: '15px' }} />
               <h3 style={{ textAlign: 'center', fontFamily: "'Long Cang', cursive", fontSize: '2rem', margin: '10px 0 0 0', color: '#4A3728' }}>{pet.name}</h3>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* --- ACTIVE STACK --- */}
      <div style={{ zIndex: 10, width: '350px', height: '500px', position: 'relative' }}>
          {activePets.map((pet, index) => (
             <DraggableCard 
               key={pet.id} pet={pet} index={index} total={activePets.length} 
               onToss={handleToss} 
               onClick={() => setSelectedPet(pet)} 
             />
          ))}
          {activePets.length === 0 && tossedPets.length === 0 && (
             <div style={{ textAlign: 'center', marginTop: '10rem', color: '#4A3728' }}>
               <h3>No pets found.</h3>
               <button onClick={onBack} style={{ marginTop: '1rem', padding: '10px 20px', background: '#4A3728', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Try another category</button>
             </div>
          )}
      </div>

      <AnimatePresence>
        {selectedPet && (
          <AdoptionForm 
            pet={selectedPet} 
            onClose={() => setSelectedPet(null)} 
            onTrash={onTrash} 
          />
        )}
      </AnimatePresence>

    </div>
  );
};

// --- DRAGGABLE CARD ---
const DraggableCard = ({ pet, index, total, onToss, onClick }) => {
    const x = useMotionValue(0);
    return (
        <motion.div 
            drag 
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1} 
            onDragEnd={(e, info) => {
                if(Math.hypot(info.offset.x, info.offset.y) > 150) {
                    onToss(pet, info.offset);
                }
            }}
            onClick={onClick}
            style={{ 
                x, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                zIndex: index, backgroundColor: '#fff', borderRadius: '20px', padding: '15px',
                boxShadow: '0px 10px 30px rgba(0,0,0,0.2)', cursor: 'grab',
                transform: `rotate(${index % 2 === 0 ? 2 : -2}deg)`
            }}
        >
            <img src={pet.img} alt={pet.name} style={{ width: '100%', height: '75%', objectFit: 'cover', borderRadius: '15px', pointerEvents: 'none' }} />
            <div>
               <h3 style={{ fontFamily: "'Long Cang', cursive", fontSize: '2.5rem', margin: '10px 0 0 0', color: '#4A3728' }}>{pet.name}</h3>
               <p style={{ margin: 0, color: '#666' }}>{pet.breed} • {pet.age}</p>
            </div>
        </motion.div>
    )
}

// --- UPDATED ADOPTION FORM ---
const AdoptionForm = ({ pet, onClose, onTrash }) => {
  const [status, setStatus] = useState('filling'); 

 // 1. STATE TO HOLD USER DATA
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: ''
  });

  // 2. HANDLER TO UPDATE DATA
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('stamped');
    setTimeout(() => { onClose(); }, 1500);
  };

  const handleTrash = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus('crumpling');
    setTimeout(() => {
       setStatus('tossing');
       setTimeout(() => {
           // 3. PASS THE DATA ALONG WITH THE PET TO TRASH
           onTrash({ pet, data: formData }); 
           onClose();
       }, 800);
    }, 800);
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {(status === 'filling' || status === 'stamped') && (
        <motion.div
           // ... keep your existing paper styles ...
           initial={{ y: 500, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
           style={{ 
             width: '500px', aspectRatio: '8.5 / 11', backgroundColor: '#Fdfcf0', padding: '3rem', 
             boxShadow: '1px 1px 15px rgba(0,0,0,0.3)', position: 'relative', display: 'flex', flexDirection: 'column',
             backgroundImage: `url("https://i.pinimg.com/736x/86/b0/98/86b0980ef543191114a946d7d4f1c90a.jpg")`
           }}
        >
          {/* --- DYNAMIC SEAL IMAGE --- */}
          <motion.div 
            initial={{ scale: 2, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ delay: 0.5, type: 'spring' }}
            style={{ 
              position: 'absolute', top: '20px', right: '20px', 
              width: '80px', height: '80px',
              border: '4px double #C0392B', borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', transform: 'rotate(-15deg)'
            }}
          >
             {/* Uses the map to pick the right seal for the animal type */}
             <img 
               src={sealMap[pet.type]} 
               alt="Seal"
               style={{ width: '80%', height: '80%', objectFit: 'cover' }} 
               onError={(e) => {e.target.style.display='none'}}
             />
          </motion.div>

          <h1 style={{ fontFamily: "'Cinzel', serif", textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: '1rem', marginTop: '1rem' }}>Adoption Form</h1>
          
         <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, fontFamily: "'Times New Roman', serif", fontSize: '1.2rem', color: '#333' }}>
            <p style={{ textAlign: 'right', fontSize: '0.9rem', color: '#666', margin: 0 }}>Application ID: {pet.id}-2026</p>
            <p style={{ marginBottom: '2rem' }}><strong>Candidate:</strong> {pet.name} ({pet.breed})</p>

            {/* UPDATE INPUTS TO USE STATE */}
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold' }}>Full Name:</label>
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required type="text" 
                  style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', background: 'transparent', outline: 'none', fontFamily: 'inherit', fontSize: '1.1rem' }} 
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold' }}>Address:</label>
                <input 
                  name="address" 
                  value={formData.address} 
                  onChange={handleInputChange} 
                  required type="text" 
                  style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', background: 'transparent', outline: 'none', fontFamily: 'inherit', fontSize: '1.1rem' }} 
                />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '1rem', fontWeight: 'bold' }}>Contact Info:</label>
                <input 
                  name="contact" 
                  value={formData.contact} 
                  onChange={handleInputChange} 
                  required type="text" 
                  style={{ width: '100%', border: 'none', borderBottom: '1px solid #000', background: 'transparent', outline: 'none', fontFamily: 'inherit', fontSize: '1.1rem' }} 
                />
            </div>

            {/* STAMP */}
            {status === 'stamped' && (
               <motion.div 
                 initial={{ scale: 3, opacity: 0 }} 
                 animate={{ scale: 1, opacity: 0.9 }} 
                 style={{ 
                   position: 'absolute', bottom: '100px', right: '60px', 
                   color: '#27AE60', border: '4px solid #27AE60', borderRadius: '8px', 
                   padding: '5px 15px', transform: 'rotate(-10deg)', 
                   fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'sans-serif',
                   textTransform: 'uppercase', letterSpacing: '2px', pointerEvents: 'none'
                 }}
               >
                 APPLICATION SENT
               </motion.div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
              <button onClick={handleTrash} type="button" style={{ border: 'none', background: 'transparent', color: '#C0392B', cursor: 'pointer', fontSize: '1rem', textDecoration: 'underline', fontFamily: 'serif' }}>
                Cancel & Toss
              </button>
              
              <button 
                  type="submit"
                  disabled={status === 'stamped'} 
                  style={{ backgroundColor: '#4A3728', color: '#fff', padding: '0.8rem 2rem', border: 'none', cursor: 'pointer', fontFamily: "'Cinzel', serif", fontWeight: 'bold' }}
              >
                {status === 'stamped' ? "SENT" : "STAMP & SUBMIT"}
              </button>
            </div>
          </form>

        </motion.div>
      )}

      {status === 'crumpling' && (
        <motion.div
           initial={{ scale: 1, borderRadius: '0%' }}
           animate={{ scale: 0.3, borderRadius: '50%', rotate: [0, 10, -10, 20, -20, 0] }}
           transition={{ duration: 0.8 }}
           style={{
             width: '500px', height: '650px', backgroundColor: '#Fdfcf0',
             backgroundImage: 'repeating-linear-gradient(45deg, #ddd 0px, #ddd 2px, transparent 2px, transparent 20px)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             boxShadow: 'inset 0 0 50px rgba(0,0,0,0.2)'
           }}
        />
      )}

      {status === 'tossing' && (
        <motion.div
           initial={{ scale: 0.3, x: 0, y: 0 }}
           animate={{ x: (window.innerWidth / 2) - 50, y: (window.innerHeight / 2) - 50, rotate: 720, scale: 0.1, opacity: 0 }}
           transition={{ duration: 0.8, ease: "easeIn" }}
           style={{
             width: '500px', height: '650px', backgroundColor: '#ddd', borderRadius: '50%',
             backgroundImage: 'repeating-linear-gradient(45deg, #bbb 0px, #bbb 2px, transparent 2px, transparent 10px)',
             boxShadow: '0 10px 20px rgba(0,0,0,0.3)', zIndex: 999
           }}
        />
      )}

    </div>
  );
};

export default PetAdoption;