import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './nav';
import Intro from './inro';
import Footer from './foot';
import Home from './home';
import About from './about';
import Work from './work';
import PetAdoption from './petadoption';
import PetCategories from './petcat';
import Dustbin from './dustbin.jsx';
import TrashRecovery from './trash.jsx';
import NotFound from './404.jsx';
import AdminPanel from './admin.jsx';
import PetShop from './petshop.jsx';
import PetCare from './petcare.jsx';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [view, setView] = useState('landing'); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // --- Trash Logic ---
  const [trash, setTrash] = useState([]); 
  const [isReceivingTrash, setIsReceivingTrash] = useState(false);
  const [isViewingTrash, setIsViewingTrash] = useState(false);

  // --- Applications Tracking ---
  const [applications, setApplications] = useState([]);

  // ─── CRITICAL FIX HERE ───
  const handleAddToTrash = (item) => {
    setIsReceivingTrash(true);

    // LOGIC: If this "trash" item is actually a Donation Form (type: 'donation'), 
    // we MUST also send it to the Admin Panel (applications state).
    if (item && (item.type === 'donation' || (item.id && item.id.startsWith('DON-')))) {
        console.log("Donation received via Trash:", item);
        setApplications(prev => [...prev, item]);
    }

    // Continue with the visual animation
    setTimeout(() => {
      setTrash(prev => [...prev, item]); 
      setIsReceivingTrash(false);
    }, 1200);
  };

  const handleRemoveFromTrash = (itemToRemove) => {
    setTrash(prev => prev.filter(item => item !== itemToRemove));
    if (trash.length <= 1) setIsViewingTrash(false);
  };

  const handleSubmitFromTrash = (itemToSubmit) => {
    alert(`Application for ${itemToSubmit.pet.name} restored and submitted!`);
    handleRemoveFromTrash(itemToSubmit); 
    // Optional: Add to applications if restored
    // setApplications(prev => [...prev, itemToSubmit]); 
  };

  // --- Handle Standard Adoption Submission ---
  const handleApplicationSubmit = (application) => {
    setApplications(prev => [...prev, application]);
    console.log('Adoption Application received:', application);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: 'relative', overflowX: 'hidden', backgroundColor: '#FAEBD7', minHeight: '100vh' }}>
      
      {/* DUSTBIN */}
      {['landing', 'categories', 'app'].includes(view) && ( 
        <Dustbin 
          trashCount={trash.length} 
          isReceivingTrash={isReceivingTrash} 
          onOpen={() => { if (trash.length > 0) setIsViewingTrash(true); }}
        />
      )}

      {/* TRASH RECOVERY MODAL */}
      <AnimatePresence>
        {isViewingTrash && trash.length > 0 && (
          <TrashRecovery 
            trashStack={trash} 
            onRemoveFromTrash={handleRemoveFromTrash}
            onSubmitFromTrash={handleSubmitFromTrash}
            onClose={() => setIsViewingTrash(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        {showIntro && <Intro key="intro" />}
      </AnimatePresence>

      {!showIntro && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          style={{ width: '100vw', backgroundColor: '#FAEBD7', color: '#4A3728' }}
        >
          <AnimatePresence mode='wait'>
            
            {/* VIEW 1: LANDING */}
            {view === 'landing' && (
              <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Navbar /> 
                <Home 
                    onAdoptClick={() => setView('categories')} 
                    onTrash={handleAddToTrash} // Now handles Donations too!
                />
                <About />
                <Work 
                   onAdoptClick={() => setView('categories')} 
                   onShopClick={() => setView('shop')} 
                   onCareClick={() => setView('care')} 
                />
                <Footer onContactClick={() => setView('404')} />
              </motion.div>
            )}

            {/* VIEW 2: CATEGORIES */}
            {view === 'categories' && (
              <motion.div key="categories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <PetCategories 
                  onBack={() => setView('landing')} 
                  onSelect={(categoryId) => { setSelectedCategory(categoryId); setView('app'); }}
                />
              </motion.div>
            )}

            {/* VIEW 3: ADOPTION APP */}
            {view === 'app' && (
              <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <PetAdoption 
                   category={selectedCategory} 
                   onBack={() => setView('categories')} 
                   onTrash={handleAddToTrash}
                   onApplication={handleApplicationSubmit}
                />
              </motion.div>
            )}

            {/* VIEW 5: ADMIN PANEL */}
            {view === 'admin' && (
                <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <AdminPanel 
                      onLogout={() => setView('landing')}
                      receivedApplications={applications} // Passing the state here
                    />
                </motion.div>
            )}
  
            {/* VIEW 4: 404 PAGE */}
            {view === '404' && (
                <motion.div key="404" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <NotFound 
                        onGoHome={() => setView('landing')} 
                        onAdminLogin={() => setView('admin')} 
                    />
                </motion.div>
            )}

            {/* VIEW 6: PET SHOP */}
            {view === 'shop' && (
              <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <PetShop onBack={() => setView('landing')} />
              </motion.div>
            )}

            {/* VIEW 7: PET CARE (SPA) */}
            {view === 'care' && (
              <motion.div key="care" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <PetCare onBack={() => setView('landing')} />
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default App;