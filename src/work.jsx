import React from 'react';
import { motion } from 'framer-motion';
import bird from "./assets/bird.png";
import husky from "./assets/husky.png";
import cat1 from "./assets/cat1.png";
import group from "./assets/group.png";


// IMPORT YOUR BANNER IMAGE HERE IF YOU HAVE IT LOCALLY
// import bannerImage from './assets/banner.jpg'; 
// For now, I will use the URL you had before for the banner

const workSections = [
  {
    id: 0,
    title: "Pet Adoption",
    subtitle: "Find a Friend",
    description: "Browse our database of lovable pets waiting for a home. From playful puppies to calm senior cats, find your perfect match.",
    image: bird,
    buttonText: "Adopt Now" // Connected to onAdoptClick
  },
  {
    id: 1,
    title: "Pet Care",
    subtitle: "Veterinary & Grooming",
    description: "Expert tips and services to keep your furry friend healthy. We connect you with top-rated vets and gentle groomers in your area.",
    image: husky,
    buttonText: "Book Appointment"
  },
  {
    id: 2,
    title: "Pet Shop",
    subtitle: "Food & Toys",
    description: "Only the best for your best friend. Shop organic treats, durable toys, and cozy beds curated by pet experts.",
    image: cat1,
    buttonText: "Shop Now" // Connected to onShopClick
  }
];

// ACCEPT BOTH PROPS
const Work = ({ onAdoptClick, onShopClick, onCareClick }) => {
  return (
    <div style={{ 
      backgroundColor: '#FAEBD7', 
      width: '100%',
      overflowX: 'hidden'
    }}>
      
      {/* SECTION HEADER */}
      <div id="work" style={{ textAlign: 'center', paddingTop: '5rem', paddingBottom: '3rem' }}>
        <h2 style={{ fontFamily: "'Long Cang', cursive", fontSize: '5rem', color: '#4A3728', margin: 0 }}>
          Our Work
        </h2>
      </div>

      {/* --- CONNECTED SECTIONS LOOP --- */}
      <div>
        {workSections.map((section) => (
          <section 
            key={section.id}
            style={{
              display: 'flex',
              alignItems: 'stretch', 
              justifyContent: 'space-between',
              minHeight: '70vh', 
              position: 'relative',
              margin: 0, 
            }}
          >
            
            {/* --- LEFT: CONTENT --- */}
            <div style={{ 
              flex: '1', 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: '8%', 
              paddingRight: '2rem',
              zIndex: 2,
              backgroundColor: '#FAEBD7' 
            }}>
              <div style={{ maxWidth: '550px' }}>
                <h4 style={{ 
                  color: '#E07A5F', 
                  textTransform: 'uppercase', 
                  letterSpacing: '2px', 
                  marginBottom: '1rem', 
                  fontFamily: "'Times New Roman', serif", 
                  fontWeight: 'bold' 
                }}>
                  {section.subtitle}
                </h4>
                
                <h3 style={{ 
                  fontSize: '3.5rem', 
                  color: '#4A3728', 
                  marginBottom: '1rem',
                  lineHeight: '1.1'
                }}>
                  {section.title}
                </h3>
                
                <p style={{ 
                  fontSize: '1.2rem', 
                  lineHeight: '1.6', 
                  color: '#4A3728', 
                  opacity: 0.9,
                  marginBottom: '2rem'
                }}>
                  {section.description}
                </p>

                {/* BUTTON LOGIC */}
                <motion.button
                  onClick={() => {
                    if (section.buttonText === "Adopt Now") onAdoptClick();
                    if (section.buttonText === "Shop Now") onShopClick();
                    if (section.buttonText === "Book Appointment") onCareClick();
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: '#4A3728', color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    backgroundColor: 'transparent',
                    color: '#4A3728',
                    border: '2px solid #4A3728',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {section.buttonText}
                </motion.button>
              </div>
            </div>

            {/* --- RIGHT: THE "UNDERNEATH" WINDOW --- */}
            <div style={{
              width: '55%', 
              position: 'relative',
              right: 0, 
              clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
              backgroundImage: `url(${section.image})`,
              backgroundAttachment: 'fixed', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}>
              <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.1)' }}></div>
            </div>

          </section>
        ))}
      </div>

      {/* --- BOTTOM NEWSLETTER CONTENT --- */}
      <div style={{ textAlign: 'center', padding: '6rem 2rem', backgroundColor: '#EADDCA' }}>
        <h3 style={{ fontFamily: "'Long Cang', cursive", fontSize: '3.5rem', color: '#4A3728', marginBottom: '1.5rem' }}>
          Ready to make a difference?
        </h3>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.2rem', lineHeight: '1.6', color: '#4A3728' }}>
          Whether you adopt, donate, or volunteer, your support changes lives. 
        </p>
        <button style={{ padding: '1rem 3rem', fontSize: '1.1rem', backgroundColor: '#4A3728', color: '#FAEBD7', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          Join Our Newsletter
        </button>
      </div>

      {/* --- STATIC IMAGE BANNER --- */}
      <div style={{
        width: '100%',
        height: '60vh',
        backgroundImage: `url(${group})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', margin: 0, padding: 0, marginBottom: '-1px'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}></div>
        <h1 style={{ position: 'relative', zIndex: 2, fontFamily: "'Long Cang', cursive", fontSize: '10rem', color: '#FAEBD7', margin: 0, textShadow: '2px 2px 10px rgba(0,0,0,0.5)', textAlign: 'center', lineHeight: '1' }}>
          POBA PETs
        </h1>
      </div>

    </div>
  );
};

export default Work;