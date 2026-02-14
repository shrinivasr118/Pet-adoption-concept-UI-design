import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA: PETS & BREEDS ---
const PET_DATA = {
  Dog: ["Golden Retriever", "German Shepherd", "Bulldog", "Poodle", "Labrador", "Husky", "Beagle"],
  Cat: ["Persian", "Siamese", "Maine Coon", "Bengal", "Sphynx", "Ragdoll"],
  Rabbit: ["Holland Lop", "Netherland Dwarf", "Lionhead"]
};

// --- DATA: SERVICES ---
const SERVICES = [
  { 
    id: 'bath', 
    name: 'Luxury Bath', 
    image: 'src/assets/petgrom.png', 
    bg: 'radial-gradient(circle, #D6EAF8 0%, #EBF5FB 100%)',
    details: ["Organic Shampoo", "Warm Hydro-Massage", "Fluff Dry", "Ear Cleaning"]
  },
  { 
    id: 'groom', 
    name: 'Full Grooming', 
    image: 'src/assets/pet2.png', 
    bg: 'radial-gradient(circle, #EBDEF0 0%, #F5EEF8 100%)',
    details: ["Haircut & Styling", "Nail Trimming", "Paw Pad Moisturizer", "Scented Spritz"]
  },
  { 
    id: 'vet', 
    name: 'Vet Checkup', 
    image: 'src/assets/pet3.png', 
    bg: 'radial-gradient(circle, #D1F2EB 0%, #E8F8F5 100%)',
    details: ["Full Physical Exam", "Dental Check", "Weight Assessment", "Vaccine Update"]
  },
];

// FIXED: Defined ALL_TIME_SLOTS here to match the logic below
const ALL_TIME_SLOTS = ["09:00", "10:30", "11:00", "12:00", "13:30", "14:00", "15:00", "16:00", "16:30"];

const PetCare = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({ 
    petType: '', breed: '', service: null, date: null, time: null 
  });
  
  // Real Calendar State
  const today = new Date();
  const [displayDate, setDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [direction, setDirection] = useState(0); 

  // Background Logic
  const activeService = booking.service ? SERVICES.find(s => s.id === booking.service) : null;
  const currentBg = activeService ? activeService.bg : '#FDF2E9';

  // --- LOGIC: FILTER TIME SLOTS (FIXED) ---
  const getAvailableTimeSlots = () => {
    if (!booking.date) return [];

    // 1. Parse the selected date string (e.g. "7 February 2026")
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [dayStr, monthStr, yearStr] = booking.date.split(' ');
    const selectedDate = new Date(parseInt(yearStr), months.indexOf(monthStr), parseInt(dayStr));

    // 2. Check if selected date is Today
    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();

    return ALL_TIME_SLOTS.filter(slot => {
      const [h, m] = slot.split(':').map(Number);
      
      // RULE 1: Shop Closing (Strictly no bookings after 4:30 PM)
      // If hour is greater than 16 (4 PM) OR it is 16 and minutes > 30
      if (h > 16 || (h === 16 && m > 30)) return false; 

      // RULE 2: Real Time Check (If today, block past hours)
      if (isToday) {
        const currentHour = now.getHours();
        const currentMin = now.getMinutes();
        
        // If slot hour is in the past, OR same hour but past minutes
        if (h < currentHour || (h === currentHour && m < currentMin)) return false;
      }

      return true;
    });
  };

  const availableSlots = getAvailableTimeSlots();

  const handleNext = (key, value) => {
    setBooking(prev => ({ ...prev, [key]: value }));
    setTimeout(() => setStep(prev => prev + 1), 300); 
  };

  const goBackStep = () => {
    if (step > 1) setStep(prev => prev - 1);
    else onBack();
  };

  return (
    <div style={{
      width: '100vw', height: '100vh',
      background: currentBg,
      transition: 'background 1s ease',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden'
    }}>

      <FloatingParticles />

      {/* HEADER: PAW TRACKER */}
      <div style={{ position: 'absolute', top: '2rem', zIndex: 50, width: '100%', maxWidth: '600px' }}>
        <PawTracker currentStep={step} />
      </div>

      <button onClick={goBackStep} style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 60, padding: '0.5rem 1rem', borderRadius: '50px', border: '2px solid #4A3728', background: '#fff', cursor: 'pointer', fontWeight: 'bold', color: '#4A3728' }}>
        ← Back
      </button>

      {/* --- MAIN CONTENT AREA --- */}
      <div style={{ zIndex: 10, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode='wait'>
          
          {/* STEP 1: PET DETAILS */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
              style={{ 
                backgroundColor: '#fff', padding: '3rem', borderRadius: '20px', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: '500px', width: '90%', textAlign: 'center'
              }}
            >
               <h2 style={{ fontFamily: "'Long Cang', cursive", fontSize: '3.5rem', color: '#4A3728', margin: 0 }}>Check In</h2>
               <p style={{ marginBottom: '2rem', color: '#666' }}>Tell us about your friend</p>
               
               <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                 <label style={{ display: 'block', fontWeight: 'bold', color: '#4A3728' }}>Pet Type:</label>
                 <select 
                   value={booking.petType}
                   onChange={(e) => setBooking({...booking, petType: e.target.value, breed: ''})}
                   style={inputStyle}
                 >
                   <option value="">Select Type...</option>
                   {Object.keys(PET_DATA).map(type => <option key={type} value={type}>{type}</option>)}
                 </select>
               </div>
               
               <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
                 <label style={{ display: 'block', fontWeight: 'bold', color: '#4A3728' }}>Breed:</label>
                 <select 
                   value={booking.breed}
                   onChange={(e) => setBooking({...booking, breed: e.target.value})}
                   disabled={!booking.petType}
                   style={inputStyle}
                 >
                   <option value="">{booking.petType ? "Select Breed..." : "Select Type First"}</option>
                   {booking.petType && PET_DATA[booking.petType].map(breed => <option key={breed} value={breed}>{breed}</option>)}
                 </select>
               </div>

               <button 
                 disabled={!booking.petType || !booking.breed}
                 onClick={() => setStep(2)}
                 style={{ 
                   padding: '1rem 3rem', backgroundColor: booking.petType && booking.breed ? '#4A3728' : '#ccc', 
                   color: '#fff', border: 'none', borderRadius: '50px', cursor: booking.petType ? 'pointer' : 'not-allowed', 
                   fontSize: '1.2rem', fontWeight: 'bold' 
                 }}
               >
                 Start Booking
               </button>
            </motion.div>
          )}

          {/* STEP 2: SERVICE SELECTION */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', padding: '0 20px' }}
            >
              {SERVICES.map(service => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onSelect={() => handleNext('service', service.id)} 
                />
              ))}
            </motion.div>
          )}

          {/* STEP 3: REAL CALENDAR (Restricted Past Dates) */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
               <RealCalendar 
                 displayDate={displayDate}
                 direction={direction}
                 onMonthChange={(dir) => { 
                   setDirection(dir); 
                   const newDate = new Date(displayDate);
                   newDate.setMonth(newDate.getMonth() + dir);
                   setDisplayDate(newDate); 
                 }}
                 onDateSelect={(day) => {
                   const dateStr = `${day} ${displayDate.toLocaleString('default', { month: 'long' })} ${displayDate.getFullYear()}`;
                   handleNext('date', dateStr);
                 }}
               />
            </motion.div>
          )}

          {/* STEP 4: TIME BUBBLES (Real-Time & Closing Filtered) */}
          {step === 4 && (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              <motion.h2 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ 
                   fontFamily: "'Long Cang', cursive", fontSize: '4rem', color: '#4A3728', 
                   textAlign: 'center', marginTop: '10vh', pointerEvents: 'none' 
                }}
              >
                {availableSlots.length > 0 ? "Catch a Time Slot!" : "Shop Closed / Full"}
              </motion.h2>

              {availableSlots.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '5rem', color: '#4A3728', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.6)', padding: '2rem', borderRadius: '15px' }}>
                  Sorry, no slots available for today.<br/>
                  (Shop closes at 5:30 PM)
                </div>
              ) : (
                availableSlots.map((time, i) => (
                  <SafeGridBubble 
                    key={time} time={time} index={i} total={availableSlots.length}
                    onPop={() => handleNext('time', time)} 
                  />
                ))
              )}
            </div>
          )}

          {/* STEP 5: CONFIRMATION */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              style={{ 
                backgroundColor: '#fff', padding: '3rem', borderRadius: '30px', textAlign: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)', maxWidth: '500px', border: '4px solid #4A3728'
              }}
            >
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.5rem', border: '4px solid #4A3728' }}>
                 <img src={activeService.image} alt="Service" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h2 style={{ fontFamily: "'Cinzel', serif", color: '#4A3728', fontSize: '2.5rem', margin: 0 }}>Confirmed!</h2>
              <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: 1.6, marginTop: '1rem' }}>
                <strong>{booking.petType} ({booking.breed})</strong> is booked for a <br/><strong>{activeService.name}</strong> on:
              </p>
              <div style={{ fontSize: '1.5rem', color: '#E07A5F', fontWeight: 'bold', margin: '1rem 0' }}>
                {booking.date} @ {booking.time}
              </div>
              <button onClick={onBack} style={{ marginTop: '1rem', padding: '1rem 3rem', background: '#4A3728', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}>
                Done
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

// --- COMPONENT: REAL CALENDAR ---
const RealCalendar = ({ displayDate, direction, onMonthChange, onDateSelect }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset today's time to midnight for comparison

  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const monthName = displayDate.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        key={`${month}-${year}`} 
        initial={{ y: direction > 0 ? 50 : -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: direction > 0 ? -50 : 50, opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          width: '400px', backgroundColor: '#fff', borderRadius: '15px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)', overflow: 'hidden', position: 'relative',
          borderTop: '20px solid #C0392B',
        }}
      >
        <div style={{ position: 'absolute', top: '-10px', left: '20%', width: '15px', height: '30px', background: '#999', borderRadius: '10px', zIndex: 10 }}></div>
        <div style={{ position: 'absolute', top: '-10px', right: '20%', width: '15px', height: '30px', background: '#999', borderRadius: '10px', zIndex: 10 }}></div>

        <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
            {/* Disable going back if it is current month */}
            <button 
                onClick={() => !isCurrentMonth && onMonthChange(-1)} 
                style={{ 
                    border: 'none', background: 'transparent', fontSize: '1.5rem', 
                    cursor: isCurrentMonth ? 'default' : 'pointer', 
                    color: isCurrentMonth ? '#ccc' : '#555',
                    visibility: isCurrentMonth ? 'hidden' : 'visible'
                }}
            >
                ▲
            </button>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ margin: 0, fontFamily: "'Times New Roman', serif", fontSize: '1.8rem' }}>{monthName}</h2>
                <span style={{ fontSize: '1rem', color: '#888' }}>{year}</span>
            </div>
            <button onClick={() => onMonthChange(1)} style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer', color: '#555' }}>▼</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '20px', gap: '5px' }}>
            {['S','M','T','W','T','F','S'].map(d => <div key={d} style={{ fontWeight: 'bold', color: '#C0392B', fontSize: '0.8rem' }}>{d}</div>)}
            
            {days.map(day => {
                const dateToCheck = new Date(year, month, day);
                const isPast = dateToCheck < today; // Check if date is before today (midnight)

                return (
                    <motion.div 
                        key={day} 
                        whileHover={!isPast ? { scale: 1.2, backgroundColor: '#C0392B', color: '#fff', borderRadius: '50%' } : {}}
                        onClick={() => !isPast && onDateSelect(day)}
                        style={{ 
                            padding: '8px', borderRadius: '5px', fontSize: '0.9rem',
                            cursor: isPast ? 'not-allowed' : 'pointer',
                            opacity: isPast ? 0.3 : 1, // Grey out past dates
                            color: isPast ? '#999' : '#333',
                            backgroundColor: 'transparent'
                        }}
                    >
                        {day}
                    </motion.div>
                );
            })}
        </div>
      </motion.div>
    </div>
  );
};

// --- COMPONENT: SAFE GRID BUBBLE ---
const SafeGridBubble = ({ time, index, total, onPop }) => {
  const cols = 4;
  const row = Math.floor(index / cols);
  const col = index % cols;
  const baseTop = 20 + (row * 30); 
  const baseLeft = 10 + (col * 20); 
  const offsetTop = Math.random() * 10 - 5;
  const offsetLeft = Math.random() * 10 - 5;

  return (
    <motion.div
      onClick={onPop}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, y: [0, -15, 0], x: [0, 5, 0] }}
      exit={{ scale: 2, opacity: 0 }} 
      transition={{ y: { duration: 3 + Math.random(), repeat: Infinity, ease: "easeInOut" }, default: { duration: 0.5, delay: index * 0.1 } }}
      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.95)', cursor: 'pointer' }}
      style={{
        position: 'absolute', top: `${baseTop + offsetTop}%`, left: `${baseLeft + offsetLeft}%`,
        width: '110px', height: '110px', borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(173,216,230,0.6))',
        border: '3px solid rgba(255,255,255,1)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#4A3728', fontWeight: 'bold', fontSize: '1.4rem', zIndex: 100
      }}
    >
      {time}
    </motion.div>
  );
};

// --- COMPONENT: PAW TRACKER ---
const PawTracker = ({ currentStep }) => {
    const steps = [1, 2, 3, 4, 5];
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', padding: '0 20px' }}>
        <div style={{ position: 'absolute', top: '50%', left: '30px', right: '30px', height: '6px', background: 'rgba(255,255,255,0.6)', borderRadius: '10px', zIndex: 0 }}></div>
        <motion.div 
          animate={{ width: `${((currentStep - 1) / 4) * 100}%` }} 
          style={{ position: 'absolute', top: '50%', left: '30px', height: '6px', background: '#4A3728', borderRadius: '10px', zIndex: 1, maxWidth: 'calc(100% - 60px)' }} 
        />
        {steps.map(s => (
          <div key={s} style={{ position: 'relative', zIndex: 5, backgroundColor: 'transparent' }}>
             <PawIcon filled={s <= currentStep} active={s === currentStep} />
          </div>
        ))}
      </div>
    );
};

const PawIcon = ({ filled, active }) => (
    <motion.div 
        animate={{ scale: active ? 1.3 : 1 }}
        style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: active ? '3px solid #4A3728' : '2px solid transparent', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
    >
        <svg viewBox="0 0 100 100" width="70%" height="70%" fill={filled ? "#4A3728" : "#ccc"}>
            <path d="M50 35 C55 35 65 30 65 20 C65 10 55 5 50 5 C45 5 35 10 35 20 C35 30 45 35 50 35 Z" />
            <path d="M25 45 C30 45 35 40 35 30 C35 20 25 15 20 15 C15 15 5 20 5 30 C5 40 10 45 25 45 Z" />
            <path d="M75 45 C80 45 95 40 95 30 C95 20 85 15 80 15 C75 15 65 20 65 30 C65 40 70 45 75 45 Z" />
            <path d="M50 45 C70 45 85 60 85 75 C85 90 70 95 50 95 C30 95 15 90 15 75 C15 60 30 45 50 45 Z" />
        </svg>
    </motion.div>
);

// --- COMPONENT: SERVICE CARD ---
const ServiceCard = ({ service, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      style={{ width: '280px', backgroundColor: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ height: '160px', overflow: 'hidden' }}>
        <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontFamily: "'Cinzel', serif", color: '#4A3728', fontSize: '1.4rem', margin: '0 0 10px 0' }}>{service.name}</h3>
        <ul style={{ paddingLeft: '20px', margin: 0, color: '#666', fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'left', flex: 1 }}>
            {service.details.map((point, i) => <li key={i}>{point}</li>)}
        </ul>
        <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#4A3728', color: '#fff' }}
            whileTap={{ scale: 0.95 }}
            onClick={onSelect}
            style={{ marginTop: '1.5rem', padding: '0.8rem', width: '100%', border: '2px solid #4A3728', borderRadius: '10px', background: 'transparent', color: '#4A3728', fontWeight: 'bold', cursor: 'pointer' }}
        >
            SELECT SERVICE
        </motion.button>
      </div>
    </motion.div>
  );
};

// --- VISIBLE PARTICLES ---
const FloatingParticles = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        animate={{ y: -1000, opacity: [0, 0.8, 0] }}
        transition={{ duration: 15 + Math.random() * 15, repeat: Infinity, delay: Math.random() * 10 }}
        style={{
          position: 'absolute', bottom: '-50px', left: `${Math.random() * 100}%`,
          width: `${15 + Math.random() * 30}px`, height: `${15 + Math.random() * 30}px`,
          border: '3px solid rgba(255, 255, 255, 0.8)',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}
      />
    ))}
  </div>
);

const inputStyle = { width: '100%', padding: '12px', fontSize: '1.1rem', border: '1px solid #ccc', borderRadius: '8px', marginTop: '5px' };

export default PetCare;