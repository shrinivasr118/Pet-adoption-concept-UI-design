import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROFILE = {
  name: 'POBA PETs',
  headline: 'Animal Welfare Organization | Pet Adoption | Mumbai, India',
  location: 'Mumbai, Maharashtra, India',
  website: 'pobapet.com',
  email: 'hello@pobapet.com',
  phone: '+91 98765 43210',
  followers: '4,832',
  connections: '500+',
  about: 'POBA PETs is a Mumbai-based animal welfare organization dedicated to connecting abandoned and rescued pets with loving families. We operate adoption drives, pet care services, and community education programs across Maharashtra.\n\nSince 2019, we have facilitated over 500 successful adoptions and continue to work tirelessly for the welfare of every animal in our care.',
};

const EXPERIENCE = [
  { title: 'Animal Welfare Organization', company: 'POBA PETs', period: '2019 – Present', location: 'Mumbai, India', desc: 'Managing pet adoption drives, veterinary partnerships, and community outreach programs.' },
  { title: 'Partner NGO', company: 'Blue Cross Mumbai', period: '2017 – 2019', location: 'Mumbai, India', desc: 'Collaborated on rescue operations and animal welfare campaigns.' },
];

const POSTS = [
  { id: 1, text: 'We are thrilled to announce that POBA PETs crossed 500 successful adoptions this year! 🎉\n\nEvery single one of those animals deserves a warm home, and every one of those families deserves a loving companion.\n\nThank you to our volunteers, donors, and adopters.\n\n#PetAdoption #Mumbai #AnimalWelfare', time: '2d', likes: 1840, comments: 92, reposts: 143, img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80' },
  { id: 2, text: 'We are hiring! 🐾\n\n📌 Veterinary Assistant — Mumbai (Full Time)\n📌 Social Media Manager — Remote\n📌 Adoption Coordinator — Pune\n\nIf you love animals and want your work to matter, we want to hear from you.\n\n#Hiring #NowHiring #AnimalJobs #Mumbai', time: '4d', likes: 643, comments: 211, reposts: 387, img: null },
  { id: 3, text: '🌱 CSR Opportunity: Partner with POBA PETs\n\nWe are currently onboarding corporate partners for our 2026 Animal Welfare Drive.\n\n✅ Brand placement at adoption events\n✅ Employee volunteering slots\n✅ ESG-aligned impact reports\n✅ Co-branded campaigns\n\nReach out at partnerships@pobapet.com\n\n#CSR #ESG #AnimalWelfare', time: '1w', likes: 312, comments: 47, reposts: 89, img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80' },
  { id: 4, text: 'Meet Nisha — our new Veterinary Lead! 🐾\n\nNisha joins us with 8 years of experience in small animal care and a specialization in shelter medicine.\n\nWelcome to the family, Nisha! 🎉\n\n#TeamPOBA #VetLife #AnimalCare', time: '1w', likes: 987, comments: 134, reposts: 56, img: null },
];

const JOBS = [
  { title: 'Veterinary Assistant', company: 'POBA PETs', location: 'Mumbai, India', type: 'Full Time', posted: '2d ago', easy: true },
  { title: 'Social Media Manager', company: 'POBA PETs', location: 'Remote', type: 'Full Time', posted: '4d ago', easy: false },
  { title: 'Adoption Coordinator', company: 'POBA PETs', location: 'Pune, India', type: 'Full Time', posted: '4d ago', easy: true },
  { title: 'Animal Care Volunteer', company: 'Blue Cross India', location: 'Mumbai, India', type: 'Volunteer', posted: '1w ago', easy: false },
  { title: 'Wildlife Photographer', company: 'WWF India', location: 'Delhi, India', type: 'Contract', posted: '1w ago', easy: false },
];

const NETWORK = [
  { name: 'Blue Cross India', role: 'Animal Welfare NGO', mutual: 12 },
  { name: 'PETA India', role: 'Animal Rights Org', mutual: 8 },
  { name: 'Friendicoes SECA', role: 'Animal Shelter, Delhi', mutual: 5 },
  { name: 'WWF India', role: 'Conservation Org', mutual: 15 },
  { name: 'Humane Society India', role: 'Animal Protection', mutual: 3 },
];

const NOTIFS = [
  { icon: '👍', text: 'Aarav Kumar and 23 others reacted to your post about 500 adoptions', time: '2m' },
  { icon: '💬', text: 'Pooja Patel commented on your job posting', time: '1h' },
  { icon: '👤', text: 'Rohan Mehta wants to connect with you', time: '3h' },
  { icon: '🔁', text: 'Delhi Pet Lovers shared your post', time: '5h' },
  { icon: '🎉', text: 'Your post is getting more views — 1,200 impressions', time: '1d' },
  { icon: '💼', text: 'Your job post for Veterinary Assistant has 34 applicants', time: '1d' },
];

const DMS = [
  { user: 'Aarav Kumar', role: 'Veterinarian', msg: 'Hi! I am interested in the Vet Assistant role.', time: '2m', unread: true },
  { user: 'Pooja Patel', role: 'Marketing Manager', msg: 'Would love to discuss a CSR partnership!', time: '1h', unread: true },
  { user: 'Rohan Mehta', role: 'Animal Photographer', msg: 'I can help with your social media content.', time: '3h', unread: false },
];

const LinkedInPage = ({ onBack }) => {
  const [page, setPage] = useState('profile'); // profile, feed, network, jobs, notifications, messages, job-detail
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentMap, setCommentMap] = useState({});
  const [commentText, setCommentText] = useState({});
  const [openComments, setOpenComments] = useState(null);
  const [following, setFollowing] = useState(false);
  const [openDM, setOpenDM] = useState(null);
  const [dmText, setDmText] = useState('');
  const [dmMessages, setDmMessages] = useState({});
  const [openJob, setOpenJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [connectedPeople, setConnectedPeople] = useState([]);
  const [postText, setPostText] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [profileSection, setProfileSection] = useState('about');

  const toggleLike = (id) => setLikedPosts(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const addComment = (postId) => {
    if (!commentText[postId]?.trim()) return;
    setCommentMap(prev => ({ ...prev, [postId]: [...(prev[postId] || []), { user: 'You', text: commentText[postId] }] }));
    setCommentText(prev => ({ ...prev, [postId]: '' }));
  };
  const sendDM = () => {
    if (!dmText.trim() || !openDM) return;
    setDmMessages(prev => ({ ...prev, [openDM.user]: [...(prev[openDM.user] || []), { from: 'you', text: dmText }] }));
    setDmText('');
  };
  const postUpdate = () => {
    if (!postText.trim()) return;
    setUserPosts(prev => [{ id: Date.now(), text: postText, time: 'just now', likes: 0, comments: 0, reposts: 0, img: null }, ...prev]);
    setPostText('');
  };

  // ── POST CARD ──
  const PostCard = ({ post }) => (
    <div style={{ backgroundColor: '#fff', border: '1px solid #e0dfdc', borderRadius: '8px', marginBottom: '8px', overflow: 'hidden' }}>
      <div style={{ padding: '16px 16px 0', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <div onClick={() => setPage('profile')} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#4A3728', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAEBD7', fontSize: '18px', fontWeight: 'bold', flexShrink: 0, cursor: 'pointer' }}>P</div>
        <div style={{ flex: 1 }}>
          <div onClick={() => setPage('profile')} style={{ fontWeight: '600', fontSize: '15px', cursor: 'pointer' }}>POBA PETs</div>
          <div style={{ color: '#666', fontSize: '13px' }}>Animal Welfare · Mumbai</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{post.time} · 🌐</div>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: '#666' }}>···</button>
      </div>
      <div style={{ padding: '12px 16px', fontSize: '14px', lineHeight: '1.6', color: '#333', whiteSpace: 'pre-wrap' }}>{post.text}</div>
      {post.img && <img src={post.img} alt="post" style={{ width: '100%', display: 'block', maxHeight: '400px', objectFit: 'cover' }} />}
      <div style={{ padding: '6px 16px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', borderBottom: '1px solid #e0dfdc' }}>
        <span>👍 {(post.likes || 0) + (likedPosts.includes(post.id) ? 1 : 0)} reactions</span>
        <span>{(commentMap[post.id]?.length || 0) + (post.comments || 0)} comments · {post.reposts || 0} reposts</span>
      </div>
      <div style={{ display: 'flex', padding: '4px 8px' }}>
        {[
          { label: 'Like', icon: '👍', action: () => toggleLike(post.id), active: likedPosts.includes(post.id) },
          { label: 'Comment', icon: '💬', action: () => setOpenComments(openComments === post.id ? null : post.id), active: false },
          { label: 'Repost', icon: '🔁', action: () => {}, active: false },
          { label: 'Send', icon: '📤', action: () => {}, active: false },
        ].map(btn => (
          <motion.button key={btn.label} whileTap={{ scale: 0.95 }} onClick={btn.action} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 4px', borderRadius: '4px', color: btn.active ? '#0a66c2' : '#666', fontSize: '12px', fontWeight: btn.active ? '600' : '400' }}>
            <span style={{ fontSize: '16px' }}>{btn.icon}</span>{btn.label}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {openComments === post.id && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ borderTop: '1px solid #e0dfdc', padding: '12px 16px', overflow: 'hidden' }}>
            {(commentMap[post.id] || []).map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#4A3728', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAEBD7', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>Y</div>
                <div style={{ backgroundColor: '#f3f2ef', borderRadius: '8px', padding: '8px 12px', flex: 1 }}>
                  <div style={{ fontWeight: '600', fontSize: '13px' }}>{c.user}</div>
                  <div style={{ fontSize: '13px' }}>{c.text}</div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#4A3728', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAEBD7', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>Y</div>
              <div style={{ flex: 1, display: 'flex', gap: '8px' }}>
                <input value={commentText[post.id] || ''} onChange={e => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))} onKeyDown={e => e.key === 'Enter' && addComment(post.id)} placeholder="Add a comment..." style={{ flex: 1, border: '1px solid #e0dfdc', borderRadius: '20px', padding: '8px 16px', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }} />
                {commentText[post.id] && <button onClick={() => addComment(post.id)} style={{ backgroundColor: '#0a66c2', color: '#fff', border: 'none', borderRadius: '20px', padding: '8px 16px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Post</button>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // ── PROFILE PAGE ──
  const ProfilePage = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px' }}>
      {/* Cover + Avatar */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e0dfdc', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px' }}>
        <div style={{ height: '200px', backgroundColor: '#EADDCA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Long Cang', cursive", fontSize: '3rem', color: '#4A3728' }}>POBA PETs</span>
        </div>
        <div style={{ padding: '0 24px 24px', position: 'relative' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#4A3728', border: '4px solid #fff', position: 'absolute', top: '-60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAEBD7', fontSize: '44px', fontWeight: 'bold' }}>P</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', gap: '8px', marginBottom: '60px' }}>
            <button onClick={() => setPage('messages')} style={{ padding: '8px 20px', borderRadius: '20px', border: '1px solid #0a66c2', backgroundColor: '#fff', color: '#0a66c2', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>Message</button>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setFollowing(!following)} style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', backgroundColor: following ? '#efefef' : '#0a66c2', color: following ? '#666' : '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>
              {following ? '✓ Following' : '+ Follow'}
            </motion.button>
          </div>
          <h1 style={{ margin: '0 0 4px 0', fontSize: '24px', fontWeight: '700' }}>{PROFILE.name}</h1>
          <p style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#333' }}>{PROFILE.headline}</p>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>{PROFILE.location}</p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ color: '#0a66c2', cursor: 'pointer' }}>{PROFILE.website}</span>
            <span onClick={() => setPage('network')} style={{ color: '#0a66c2', cursor: 'pointer' }}>{PROFILE.followers} followers</span>
            <span onClick={() => setPage('network')} style={{ color: '#0a66c2', cursor: 'pointer' }}>{PROFILE.connections} connections</span>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e0dfdc', borderRadius: '8px', marginBottom: '8px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e0dfdc' }}>
          {[['about','About'],['posts','Posts'],['experience','Experience']].map(([s, label]) => (
            <button key={s} onClick={() => setProfileSection(s)} style={{ flex: 1, padding: '14px', background: 'none', border: 'none', borderBottom: profileSection === s ? '2px solid #0a66c2' : '2px solid transparent', cursor: 'pointer', color: profileSection === s ? '#0a66c2' : '#666', fontWeight: profileSection === s ? '600' : '400', fontSize: '14px' }}>{label}</button>
          ))}
        </div>
        <div style={{ padding: '20px 24px' }}>
          {profileSection === 'about' && (
            <div>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#333', whiteSpace: 'pre-wrap', margin: '0 0 20px 0' }}>{PROFILE.about}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#666' }}>
                <div>📍 {PROFILE.location}</div>
                <div>🌐 <span style={{ color: '#0a66c2' }}>{PROFILE.website}</span></div>
                <div>✉️ {PROFILE.email}</div>
                <div>📞 {PROFILE.phone}</div>
              </div>
            </div>
          )}
          {profileSection === 'posts' && (
            <div>
              {[...userPosts, ...POSTS].map(post => <PostCard key={post.id} post={post} />)}
            </div>
          )}
          {profileSection === 'experience' && (
            <div>
              {EXPERIENCE.map((exp, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '20px', paddingBottom: '20px', borderBottom: i < EXPERIENCE.length - 1 ? '1px solid #e0dfdc' : 'none' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '4px', backgroundColor: '#EADDCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#4A3728', flexShrink: 0 }}>P</div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '15px' }}>{exp.title}</div>
                    <div style={{ color: '#0a66c2', fontSize: '14px', cursor: 'pointer' }}>{exp.company}</div>
                    <div style={{ color: '#666', fontSize: '13px' }}>{exp.period} · {exp.location}</div>
                    <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#333' }}>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ── FEED ──
  const FeedPage = () => (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '16px', display: 'flex', gap: '16px' }}>
      <div style={{ flex: 1 }}>
        {/* Compose */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e0dfdc', borderRadius: '8px', padding: '16px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#4A3728', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAEBD7', fontWeight: 'bold', flexShrink: 0 }}>Y</div>
            <textarea value={postText} onChange={e => setPostText(e.target.value)} placeholder="Share something with your network..." style={{ flex: 1, border: '1px solid #e0dfdc', borderRadius: '8px', padding: '12px', fontSize: '14px', fontFamily: 'inherit', resize: 'none', minHeight: '56px', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['📷','🎥','📄','💡'].map((ic, i) => <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#666' }}>{ic}</button>)}
            </div>
            <motion.button whileTap={{ scale: 0.95 }} onClick={postUpdate} disabled={!postText.trim()} style={{ padding: '8px 24px', borderRadius: '20px', border: 'none', backgroundColor: postText.trim() ? '#0a66c2' : '#ccc', color: '#fff', fontWeight: '600', cursor: postText.trim() ? 'pointer' : 'not-allowed', fontSize: '14px' }}>Post</motion.button>
          </div>
        </div>
        {[...userPosts, ...POSTS].map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );

  // ── NETWORK ──
  const NetworkPage = () => (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '16px' }}>People you may know</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        {NETWORK.map((person, i) => (
          <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #e0dfdc', borderRadius: '8px', overflow: 'hidden', textAlign: 'center' }}>
            <div style={{ height: '60px', backgroundColor: '#EADDCA' }}></div>
            <div style={{ padding: '0 16px 16px', position: 'relative' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#4A3728', border: '2px solid #fff', margin: '-30px auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAEBD7', fontWeight: 'bold', fontSize: '20px' }}>{person.name[0]}</div>
              <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>{person.name}</div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{person.role}</div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>{person.mutual} mutual connections</div>
              <button onClick={() => setConnectedPeople(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])} style={{ width: '100%', padding: '6px', borderRadius: '20px', border: '1px solid #0a66c2', backgroundColor: connectedPeople.includes(i) ? '#0a66c2' : '#fff', color: connectedPeople.includes(i) ? '#fff' : '#0a66c2', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
                {connectedPeople.includes(i) ? '✓ Connected' : '+ Connect'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── JOBS ──
  const JobsPage = () => (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '16px' }}>
      {openJob ? (
        <div>
          <button onClick={() => setOpenJob(null)} style={{ background: 'none', border: 'none', color: '#0a66c2', cursor: 'pointer', fontSize: '14px', fontWeight: '600', marginBottom: '16px', padding: 0 }}>← Back to Jobs</button>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e0dfdc', borderRadius: '8px', padding: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '8px', backgroundColor: '#EADDCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#4A3728', fontSize: '24px', flexShrink: 0 }}>P</div>
              <div>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '22px', fontWeight: '700' }}>{openJob.title}</h2>
                <div style={{ color: '#0a66c2', fontSize: '16px', cursor: 'pointer' }}>POBA PETs</div>
                <div style={{ color: '#666', fontSize: '14px' }}>{openJob.location} · {openJob.type} · {openJob.posted}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setAppliedJobs(p => p.includes(openJob.title) ? p : [...p, openJob.title])} style={{ flex: 1, padding: '12px', borderRadius: '24px', border: 'none', backgroundColor: appliedJobs.includes(openJob.title) ? '#057642' : '#0a66c2', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>
                {appliedJobs.includes(openJob.title) ? '✓ Applied' : openJob.easy ? '⚡ Easy Apply' : 'Apply now'}
              </motion.button>
              <button onClick={() => setSavedJobs(p => p.includes(openJob.title) ? p.filter(x => x !== openJob.title) : [...p, openJob.title])} style={{ padding: '12px 20px', borderRadius: '24px', border: '1px solid #666', backgroundColor: '#fff', color: '#333', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>
                {savedJobs.includes(openJob.title) ? '🔖 Saved' : 'Save'}
              </button>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>About the job</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#333' }}>
              POBA PETs is looking for a passionate <strong>{openJob.title}</strong> to join our growing team in {openJob.location}.<br /><br />
              <strong>Responsibilities:</strong><br />
              • Support daily operations at our adoption centre<br />
              • Work closely with animals and their potential adopters<br />
              • Coordinate with veterinary staff and volunteers<br />
              • Maintain records and assist with community outreach<br /><br />
              <strong>Requirements:</strong><br />
              • Passion for animal welfare<br />
              • Relevant education or experience preferred<br />
              • Strong communication skills<br />
              • Ability to work in a fast-paced environment<br /><br />
              <strong>What we offer:</strong><br />
              • Meaningful work with real impact<br />
              • Collaborative team environment<br />
              • Competitive salary for NGO sector<br />
              • Opportunity to grow with us
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e0dfdc', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px', display: 'flex', gap: '8px' }}>
            <span style={{ color: '#666' }}>🔍</span>
            <span style={{ color: '#999', fontSize: '14px' }}>Search jobs</span>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#333', marginBottom: '12px' }}>Jobs for you</h3>
          {JOBS.map((job, i) => (
            <div key={i} onClick={() => setOpenJob(job)} style={{ backgroundColor: '#fff', border: '1px solid #e0dfdc', borderRadius: '8px', padding: '16px', marginBottom: '8px', cursor: 'pointer', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '4px', backgroundColor: '#EADDCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#4A3728', flexShrink: 0 }}>{job.company[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', fontSize: '15px', color: '#0a66c2' }}>{job.title}</div>
                <div style={{ fontSize: '14px', color: '#333' }}>{job.company}</div>
                <div style={{ fontSize: '13px', color: '#666' }}>{job.location} · {job.type}</div>
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{job.posted} {job.easy && <span style={{ color: '#057642', fontWeight: '600' }}>· ⚡ Easy Apply</span>}</div>
              </div>
              <button onClick={e => { e.stopPropagation(); setSavedJobs(p => p.includes(job.title) ? p.filter(x => x !== job.title) : [...p, job.title]); }} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: savedJobs.includes(job.title) ? '#0a66c2' : '#666', padding: '4px' }}>🔖</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ── NOTIFICATIONS ──
  const NotificationsPage = () => (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '16px' }}>Notifications</h2>
      {NOTIFS.map((n, i) => (
        <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #e0dfdc', borderRadius: '8px', padding: '16px', marginBottom: '8px', display: 'flex', gap: '12px', alignItems: 'flex-start', cursor: 'pointer' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#EADDCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>{n.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#333', lineHeight: '1.5' }}>{n.text}</div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );

  // ── MESSAGES ──
  const MessagesPage = () => (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', height: 'calc(100vh - 120px)', backgroundColor: '#fff', border: '1px solid #e0dfdc', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ width: '320px', borderRight: '1px solid #e0dfdc', flexShrink: 0, overflowY: 'auto' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e0dfdc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '700', fontSize: '16px' }}>Messaging</span>
          <span style={{ fontSize: '20px', cursor: 'pointer' }}>✏️</span>
        </div>
        {DMS.map((dm, i) => (
          <div key={i} onClick={() => setOpenDM(dm)} style={{ padding: '12px 16px', display: 'flex', gap: '12px', cursor: 'pointer', backgroundColor: openDM?.user === dm.user ? '#f3f2ef' : '#fff', borderBottom: '1px solid #f3f2ef' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#4A3728', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAEBD7', fontWeight: 'bold', fontSize: '18px', flexShrink: 0 }}>{dm.user[0]}</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontWeight: dm.unread ? '700' : '600', fontSize: '14px' }}>{dm.user}</div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>{dm.role}</div>
              <div style={{ fontSize: '13px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dm.msg}</div>
            </div>
            <div style={{ fontSize: '11px', color: '#666', flexShrink: 0 }}>{dm.time}</div>
          </div>
        ))}
      </div>
      {openDM ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e0dfdc', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#4A3728', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAEBD7', fontWeight: 'bold' }}>{openDM.user[0]}</div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>{openDM.user}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{openDM.role}</div>
            </div>
            <button onClick={() => setOpenDM(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: '#666' }}>×</button>
          </div>
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ alignSelf: 'flex-start', backgroundColor: '#f3f2ef', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', maxWidth: '70%' }}>{openDM.msg}</div>
            {(dmMessages[openDM.user] || []).map((m, i) => (
              <div key={i} style={{ alignSelf: m.from === 'you' ? 'flex-end' : 'flex-start', backgroundColor: m.from === 'you' ? '#0a66c2' : '#f3f2ef', color: m.from === 'you' ? '#fff' : '#333', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', maxWidth: '70%' }}>{m.text}</div>
            ))}
          </div>
          <div style={{ padding: '12px 16px', borderTop: '1px solid #e0dfdc', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input value={dmText} onChange={e => setDmText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendDM()} placeholder="Write a message..." style={{ flex: 1, border: '1px solid #e0dfdc', borderRadius: '4px', padding: '10px 16px', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }} />
            <motion.button whileTap={{ scale: 0.95 }} onClick={sendDM} style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', backgroundColor: '#0a66c2', color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Send</motion.button>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', color: '#666' }}>
          <div style={{ fontSize: '48px' }}>💬</div>
          <span style={{ fontSize: '16px', fontWeight: '600' }}>Select a conversation</span>
        </div>
      )}
    </div>
  );

  const renderPage = () => {
    switch (page) {
      case 'profile': return <ProfilePage />;
      case 'feed': return <FeedPage />;
      case 'network': return <NetworkPage />;
      case 'jobs': return <JobsPage />;
      case 'notifications': return <NotificationsPage />;
      case 'messages': return <MessagesPage />;
      default: return <ProfilePage />;
    }
  };

  const NAV = [
    { id: 'feed', icon: '🏠', label: 'Home' },
    { id: 'network', icon: '👥', label: 'Network' },
    { id: 'jobs', icon: '💼', label: 'Jobs' },
    { id: 'messages', icon: '💬', label: 'Messaging' },
    { id: 'notifications', icon: '🔔', label: 'Notifs' },
    { id: 'profile', icon: '👤', label: 'Me' },
  ];

  return (
    <div style={{ backgroundColor: '#f3f2ef', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#000' }}>
      {/* TOP NAV */}
      <div style={{ position: 'sticky', top: 0, backgroundColor: '#fff', borderBottom: '1px solid #e0dfdc', zIndex: 100, height: '52px', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '12px', boxSizing: 'border-box' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', color: '#333' }}>←</button>
        <div style={{ backgroundColor: '#0a66c2', borderRadius: '4px', width: '34px', height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '900', fontSize: '16px', flexShrink: 0 }}>in</div>
        <div style={{ backgroundColor: '#eef3f8', borderRadius: '4px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', flex: 1, maxWidth: '260px' }}>
          <span style={{ color: '#666', fontSize: '14px' }}>🔍 Search</span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex' }}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 10px', borderBottom: page === n.id ? '2px solid #000' : '2px solid transparent', color: page === n.id ? '#000' : '#666', fontSize: '11px' }}>
              <span style={{ fontSize: '18px' }}>{n.icon}</span>
              {n.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ paddingBottom: '20px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={page + (openJob?.title || '')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LinkedInPage;