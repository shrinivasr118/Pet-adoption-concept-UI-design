import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Newsletter = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const topics = ['Adoption Stories', 'Pet Care Tips', 'New Arrivals', 'Events & Drives', 'Volunteer Updates'];

  const toggleTopic = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) return;
    setSubmitted(true);
  };

  const pastIssues = [
    { title: 'Meet Bruno — A Second Chance Story', date: 'Jan 2026', tag: 'Adoption', reads: '1.2k' },
    { title: 'Top 5 Foods to Never Feed Your Cat', date: 'Dec 2025', tag: 'Pet Care', reads: '3.4k' },
    { title: 'Our Biggest Adoption Drive Yet!', date: 'Nov 2025', tag: 'Events', reads: '890' },
    { title: 'New Rabbits Have Arrived at POBA', date: 'Oct 2025', tag: 'New Arrivals', reads: '2.1k' },
  ];

  return (
    <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: '#FAEBD7', fontFamily: "'Times New Roman', serif", color: '#4A3728' }}>

      {/* HEADER */}
      <div style={{ width: '100%', padding: '1.5rem 3rem', backgroundColor: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(74,55,40,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxSizing: 'border-box' }}>
        <span style={{ fontFamily: "'Long Cang', cursive", fontSize: '1.8rem', color: '#4A3728' }}>POBA PETs</span>
        <button onClick={onBack} style={{ padding: '0.5rem 1.2rem', border: '2px solid #4A3728', borderRadius: '50px', background: 'transparent', color: '#4A3728', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'inherit' }}>← Back</button>
      </div>

      {/* HERO SECTION */}
      <div style={{ textAlign: 'center', padding: '5rem 2rem 3rem', backgroundColor: '#EADDCA' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.9rem', opacity: 0.6, marginBottom: '1rem' }}>Monthly Newsletter</p>
          <h1 style={{ fontFamily: "'Long Cang', cursive", fontSize: '5rem', color: '#4A3728', margin: '0 0 1.5rem 0', lineHeight: 1.1 }}>
            The POBA<br />
            <span style={{ color: '#E07A5F' }}>Gazette</span>
          </h1>
          <p style={{ maxWidth: '550px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.8', opacity: 0.85 }}>
            Stories of paws, love, and second chances — delivered straight to your inbox every month.
          </p>
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>

        {/* LEFT — SUBSCRIBE FORM */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ flex: '1 1 380px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 10px 40px rgba(74,55,40,0.1)', border: '1px solid rgba(74,55,40,0.1)' }}>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.6rem', marginBottom: '0.5rem' }}>Subscribe</h2>
                  <p style={{ opacity: 0.6, fontSize: '0.95rem', marginBottom: '2rem' }}>Join 4,200+ pet lovers getting our monthly digest.</p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Name</label>
                      <input value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Priya Sharma" style={{ width: '100%', padding: '0.8rem 1rem', border: '1.5px solid rgba(74,55,40,0.3)', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', backgroundColor: '#FAEBD7', color: '#4A3728', boxSizing: 'border-box', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                      <input value={email} onChange={e => setEmail(e.target.value)} required type="email" placeholder="you@example.com" style={{ width: '100%', padding: '0.8rem 1rem', border: '1.5px solid rgba(74,55,40,0.3)', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', backgroundColor: '#FAEBD7', color: '#4A3728', boxSizing: 'border-box', outline: 'none' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>Topics I Love</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {topics.map(topic => (
                          <span key={topic} onClick={() => toggleTopic(topic)} style={{ padding: '5px 14px', borderRadius: '20px', fontSize: '0.85rem', cursor: 'pointer', border: '1.5px solid #4A3728', backgroundColor: selectedTopics.includes(topic) ? '#4A3728' : 'transparent', color: selectedTopics.includes(topic) ? '#FAEBD7' : '#4A3728', transition: 'all 0.2s', userSelect: 'none' }}>
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ width: '100%', padding: '1rem', backgroundColor: '#4A3728', color: '#FAEBD7', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', fontFamily: "'Cinzel', serif", marginTop: '0.5rem' }}>
                      Subscribe Free
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐾</div>
                  <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.5rem', marginBottom: '1rem', color: '#27AE60' }}>You're In!</h2>
                  <p style={{ opacity: 0.8, lineHeight: 1.7 }}>Welcome aboard, <strong>{name}</strong>! Your first issue of The POBA Gazette lands in your inbox next month.</p>
                  <p style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: '1.5rem' }}>Sent to: {email}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TRUST BADGES */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            {[['4,200+', 'Subscribers'], ['Monthly', 'Issues'], ['No Spam', 'Promise']].map(([val, label]) => (
              <div key={label} style={{ flex: 1, textAlign: 'center', backgroundColor: '#EADDCA', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 'bold', fontSize: '1.1rem' }}>{val}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — PAST ISSUES */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ flex: '1 1 380px' }}>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: '1.4rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '2px solid rgba(74,55,40,0.15)' }}>Past Issues</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {pastIssues.map((issue, i) => (
              <motion.div key={i} whileHover={{ x: 5 }} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.2rem 1.5rem', boxShadow: '0 4px 15px rgba(74,55,40,0.07)', border: '1px solid rgba(74,55,40,0.08)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', backgroundColor: '#EADDCA', padding: '3px 10px', borderRadius: '20px', fontWeight: 'bold', display: 'inline-block', marginBottom: '6px' }}>{issue.tag}</span>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', lineHeight: 1.4 }}>{issue.title}</h4>
                  <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>{issue.date} · {issue.reads} reads</span>
                </div>
                <span style={{ fontSize: '1.2rem', opacity: 0.3, marginLeft: '1rem' }}>→</span>
              </motion.div>
            ))}
          </div>

          {/* PREVIEW SNIPPET */}
          <div style={{ marginTop: '2rem', backgroundColor: '#EADDCA', borderRadius: '16px', padding: '2rem', borderLeft: '4px solid #E07A5F' }}>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.5, marginBottom: '0.8rem' }}>From our latest issue</p>
            <p style={{ fontStyle: 'italic', lineHeight: 1.8, fontSize: '1.05rem', opacity: 0.85 }}>
              "Bruno arrived at POBA on a rainy Tuesday with a torn ear and a wagging tail. Six weeks later, he left with a family, a name tag that read 'Bruno the Brave', and a bed big enough for two..."
            </p>
            <p style={{ fontSize: '0.85rem', opacity: 0.5, marginTop: '1rem' }}>— The POBA Gazette, January 2026</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Newsletter;