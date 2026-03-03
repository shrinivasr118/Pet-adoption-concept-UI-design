import React, { useState, useRef, useEffect } from 'react';

// ─── LinkedIn exact color tokens ───────────────────────────────────────
const LI = {
  blue: '#0a66c2',
  blueDark: '#004182',
  blueHover: '#004182',
  green: '#057642',
  red: '#cc1016',
  bg: '#f4f2ee',
  white: '#ffffff',
  border: '#e8e4de',
  borderLight: '#f4f2ee',
  text: '#000000e6',
  textSub: '#00000099',
  textMuted: '#666666',
  hover: '#00000014',
  pill: '#70b5f9',
  cardShadow: '0 0 0 1px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.05)',
  fontStack: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif',
};

// ─── SVG Icons (exact LinkedIn icons) ──────────────────────────────────
const Icons = {
  Home: ({active}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill={active ? LI.text : 'rgba(0,0,0,0.6)'}>
      <path d="M23 9v2h-2v7a3 3 0 01-3 3h-4v-6h-4v6H6a3 3 0 01-3-3v-7H1V9l11-7 11 7zm-5 7.5V11h-3v5.5h3z" opacity={active?1:.75}/>
    </svg>
  ),
  Network: ({active}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill={active ? LI.text : 'rgba(0,0,0,0.6)'}>
      <path d="M12 16v6H3v-6a3 3 0 013-3h3a3 3 0 013 3zm5.5-3A3.5 3.5 0 1014 9.5a3.5 3.5 0 003.5 3.5zm1 2h-2a2.5 2.5 0 00-2.5 2.5V22h7v-4.5a2.5 2.5 0 00-2.5-2.5zM7.5 2A4.5 4.5 0 1012 6.5 4.49 4.49 0 007.5 2z" opacity={active?1:.75}/>
    </svg>
  ),
  Jobs: ({active}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill={active ? LI.text : 'rgba(0,0,0,0.6)'}>
      <path d="M17 6V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1H2v4a3 3 0 003 3h14a3 3 0 003-3V6zM9 5a1 1 0 011-1h4a1 1 0 011 1v1H9zm-2 8v8h10v-8zm5 2a1 1 0 110 2 1 1 0 010-2z" opacity={active?1:.75}/>
    </svg>
  ),
  Msg: ({active}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill={active ? LI.text : 'rgba(0,0,0,0.6)'}>
      <path d="M16 4H8a7 7 0 000 14h4v4l8.16-5.39A6.78 6.78 0 0023 11a7 7 0 00-7-7zm-8 8.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zm4 0A1.25 1.25 0 1113.25 11 1.25 1.25 0 0112 12.25zm4 0A1.25 1.25 0 1117.25 11 1.25 1.25 0 0116 12.25z" opacity={active?1:.75}/>
    </svg>
  ),
  Bell: ({active}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill={active ? LI.text : 'rgba(0,0,0,0.6)'}>
      <path d="M22 19h-8.28a2 2 0 11-3.44 0H2v-1a4.52 4.52 0 011.17-2.83l1-1.17h15.7l1 1.17A4.42 4.42 0 0122 18zM18.21 7.44A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13h14z" opacity={active?1:.75}/>
    </svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,0.6)">
      <path d="M21.7 20.3L17.4 16a8.9 8.9 0 10-1.4 1.4l4.3 4.3a1 1 0 001.4-1.4zM11 18a7 7 0 117-7 7 7 0 01-7 7z"/>
    </svg>
  ),
  ThumbUp: ({filled}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill={filled ? LI.blue : 'rgba(0,0,0,0.6)'}>
      <path d="M19.46 11l-3.91-9.16a2.3 2.3 0 00-2.12-1.4 2.1 2.1 0 00-2.09 2.1v3.06H4.4A2.4 2.4 0 002 8.14l1 9.16A2.4 2.4 0 005.4 19.7H19a1 1 0 001-1v-7a1 1 0 00-.54-.7zM4.4 17.94a.44.44 0 01-.4-.44l-1-9.16c0-.24.17-.44.41-.44H11V6.6a.11.11 0 01.11-.11.3.3 0 01.27.18l3.7 8.62v2.65z"/>
    </svg>
  ),
  Comment: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,0.6)">
      <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a6.78 6.78 0 01-2.84 5.61L8 22v-4H5.5A5.68 5.68 0 010 12.43v-1.86A5.68 5.68 0 015.5 5h13A5.68 5.68 0 0124 10.57z"/>
    </svg>
  ),
  Repost: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,0.6)">
      <path d="M13.96 5H6a2 2 0 00-2 2v7H2.5A.5.5 0 002 14.5v.5a.5.5 0 00.15.35l3 3a.48.48 0 00.7 0l3-3A.5.5 0 009 15v-.5a.5.5 0 00-.5-.5H7V7h6.96l1 1H8.5a.5.5 0 00-.5.5v.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V8a.5.5 0 00-.15-.36zm7.85 4.14l-3-3a.48.48 0 00-.7 0l-3 3A.5.5 0 0015 9.5v.5a.5.5 0 00.5.5H17v7h-6.96l-1-1H15.5a.5.5 0 00.5-.5v-.5a.5.5 0 00-.5-.5h-9a.5.5 0 00-.5.5v1a.5.5 0 00.15.35L8 18h9.54a2 2 0 002-2V9H21a.5.5 0 00.5-.5v-.5a.5.5 0 00-.15-.36z"/>
    </svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="rgba(0,0,0,0.6)">
      <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"/>
    </svg>
  ),
  More: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(0,0,0,0.6)">
      <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"/>
    </svg>
  ),
  Close: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="rgba(0,0,0,0.6)">
      <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"/>
    </svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="rgba(0,0,0,0.6)">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill={LI.blue}>
      <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.14-1.96 13-13a3 3 0 000-4.18zm-14.55 14l-.86-1.56-1.56-.86L4.7 13l9.62-9.64L16 5.03zm14.12-10l-1.5 1.5-2.67-2.68 1.5-1.5a1 1 0 011.41 0l1.27 1.27a1 1 0 01-.01 1.41z"/>
    </svg>
  ),
  Photo: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
      <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12H7V8h3zm5 0h-3v-4h3zM7 10V8h1v2zm13 6a1 1 0 01-1 1H5a1 1 0 01-1-1V9l3.5 4.5 2.5-3 3.5 4.5L16 12l4 3.5z" fill="#70b5f9"/>
    </svg>
  ),
  Video: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
      <path d="M19.59 7l-7.1 5.07L5 7H3v10h18V7zM5 15V9.3l7.48 5.37L20 9.3V15z" fill="#e7a33e"/>
    </svg>
  ),
  Article: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
      <path d="M21 3H3v18h18zM8 17H5v-3h3zm0-5H5V9h3zm0-5H5V4h3zm11 10H9v-3h10zm0-5H9V9h10zm0-5H9V4h10z" fill="#f5987e"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" fill="white"/>
    </svg>
  ),
  Back: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(0,0,0,0.6)">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  ),
};

// ─── DATA ───────────────────────────────────────────────────────────────
const PROFILE = {
  name: 'POBA PETs',
  headline: 'Animal Welfare Organization | Pet Adoption & Rescue | Mumbai, Maharashtra, India',
  location: 'Mumbai, Maharashtra, India',
  website: 'pobapet.com',
  email: 'hello@pobapet.com',
  phone: '+91 98765 43210',
  followers: '1,832',
  connections: '500+',
  about: 'POBA PETs is a Mumbai-based animal welfare organization dedicated to connecting abandoned and rescued pets with loving families. We operate adoption drives, pet care services, and community education programs across Maharashtra.\n\nSince 2019, we have facilitated over 500 successful adoptions and continue to work tirelessly for the welfare of every animal in our care.\n\nOur mission: Every animal deserves love, care, and a forever home.',
};

const EXPERIENCE = [
  { title: 'Animal Welfare Organization', company: 'POBA PETs', period: 'Jan 2019 – Present · 6 yrs 2 mos', location: 'Mumbai, Maharashtra, India · On-site', desc: 'Managing pet adoption drives, veterinary partnerships, and community outreach programs across Maharashtra. Facilitated over 500 successful adoptions since founding.' },
  { title: 'Partner NGO', company: 'Blue Cross Mumbai', period: 'Mar 2017 – Dec 2018 · 1 yr 10 mos', location: 'Mumbai, Maharashtra, India', desc: 'Collaborated on rescue operations and animal welfare campaigns across Mumbai metropolitan area.' },
];

const POSTS = [
  {
    id: 1,
    text: 'We are thrilled to announce that POBA PETs crossed 500 successful adoptions this year! 🎉\n\nEvery single one of those animals deserves a warm home, and every one of those families deserves a loving companion.\n\nThank you to our incredible volunteers, generous donors, and amazing adopters — you made this possible.\n\n#PetAdoption #Mumbai #AnimalWelfare #500Adoptions',
    time: '2d',
    likes: 1840,
    comments: 92,
    reposts: 143,
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80',
    reactions: ['👍','❤️','🎉']
  },
  {
    id: 2,
    text: "We're hiring! 🐾\n\nJoin our growing team and make a real difference:\n\n📌 Veterinary Assistant — Mumbai (Full Time)\n📌 Social Media Manager — Remote\n📌 Adoption Coordinator — Pune\n\nIf you love animals and want your work to matter every single day, we want to hear from you. DM us or apply via the link below.\n\n#Hiring #NowHiring #AnimalJobs #Mumbai #NGOJobs",
    time: '4d',
    likes: 643,
    comments: 211,
    reposts: 387,
    img: null,
    reactions: ['👍','❤️','🙌']
  },
  {
    id: 3,
    text: '🌱 CSR Opportunity: Partner with POBA PETs\n\nWe are currently onboarding corporate partners for our 2026 Animal Welfare Drive.\n\n✅ Brand placement at adoption events\n✅ Employee volunteering slots\n✅ ESG-aligned impact reports\n✅ Co-branded campaigns reaching 50K+ audience\n\nReach out at partnerships@pobapet.com\n\n#CSR #ESG #CorporateSocialResponsibility #AnimalWelfare #Mumbai',
    time: '1w',
    likes: 312,
    comments: 47,
    reposts: 89,
    img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80',
    reactions: ['👍','💡']
  },
  {
    id: 4,
    text: 'Meet Nisha — our new Veterinary Lead! 🐾\n\nNisha joins us with 8 years of experience in small animal care and a specialization in shelter medicine.\n\nWe are so excited to have her expertise guiding our medical team. Welcome to the family, Nisha! 🎉\n\n#TeamPOBA #VetLife #AnimalCare #WelcomeToTheTeam',
    time: '1w',
    likes: 987,
    comments: 134,
    reposts: 56,
    img: null,
    reactions: ['👍','❤️','🎊']
  },
];

const JOBS = [
  { id: 1, title: 'Veterinary Assistant', company: 'POBA PETs', location: 'Mumbai, Maharashtra, India', type: 'Full-time', posted: '2 days ago', easy: true, applicants: '34 applicants', salary: '₹18,000/mo - ₹25,000/mo' },
  { id: 2, title: 'Social Media Manager', company: 'POBA PETs', location: 'Remote', type: 'Full-time', posted: '4 days ago', easy: false, applicants: '87 applicants', salary: '₹22,000/mo - ₹35,000/mo' },
  { id: 3, title: 'Adoption Coordinator', company: 'POBA PETs', location: 'Pune, Maharashtra, India', type: 'Full-time', posted: '4 days ago', easy: true, applicants: '21 applicants', salary: '₹15,000/mo - ₹20,000/mo' },
  { id: 4, title: 'Animal Care Volunteer', company: 'Blue Cross India', location: 'Mumbai, Maharashtra, India', type: 'Volunteer', posted: '1 week ago', easy: false, applicants: '12 applicants', salary: 'Unpaid' },
  { id: 5, title: 'Wildlife Photographer', company: 'WWF India', location: 'New Delhi, India', type: 'Contract', posted: '1 week ago', easy: false, applicants: '45 applicants', salary: '₹30,000/mo - ₹50,000/mo' },
];

const NETWORK = [
  { name: 'Blue Cross India', role: 'Animal Welfare NGO · Mumbai', mutual: 12 },
  { name: 'PETA India', role: 'Animal Rights Organization · Pan India', mutual: 8 },
  { name: 'Friendicoes SECA', role: 'Animal Shelter · New Delhi', mutual: 5 },
  { name: 'WWF India', role: 'Conservation Organization · New Delhi', mutual: 15 },
  { name: 'Humane Society India', role: 'Animal Protection · Mumbai', mutual: 3 },
  { name: 'Welfare For Animals Global', role: 'International NGO · Remote', mutual: 7 },
];

const NOTIFS = [
  { icon: null, emoji: '👍', text: 'Aarav Kumar and 23 others reacted to your post about 500 adoptions milestone.', time: '2m ago', unread: true },
  { icon: null, emoji: '💬', text: 'Pooja Patel commented: "This is amazing! Would love to discuss a partnership opportunity."', time: '1h ago', unread: true },
  { icon: null, emoji: '🤝', text: 'Rohan Mehta sent you a connection request', time: '3h ago', unread: true },
  { icon: null, emoji: '🔁', text: 'Delhi Pet Lovers shared your CSR post to 2,300 followers', time: '5h ago', unread: false },
  { icon: null, emoji: '📊', text: 'Your post about 500 adoptions is getting more views — 1,200 impressions in the past day', time: '1d ago', unread: false },
  { icon: null, emoji: '💼', text: 'Your job post for Veterinary Assistant has 34 applicants. Review them now.', time: '1d ago', unread: false },
];

const DMS = [
  { user: 'Aarav Kumar', role: 'Veterinarian · Mumbai', avatar: 'A', msg: 'Hi! I saw your Veterinary Assistant posting and I am very interested. I have 4 years of experience...', time: '2m', unread: true },
  { user: 'Pooja Patel', role: 'Marketing Manager · Reliance', avatar: 'P', msg: 'Hello! I would love to discuss a potential CSR partnership with POBA PETs for 2026.', time: '1h', unread: true },
  { user: 'Rohan Mehta', role: 'Wildlife Photographer', avatar: 'R', msg: 'I can help document your adoption stories and create compelling visual content for your social media.', time: '3h', unread: false },
];

// ─── AVATAR ─────────────────────────────────────────────────────────────
const Avatar = ({ char = 'P', size = 48, bg = '#4A3728', color = '#FAEBD7', fontSize, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    width: size, height: size, borderRadius: '50%', backgroundColor: bg,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color, fontWeight: 700, fontSize: fontSize || Math.floor(size * 0.38),
    flexShrink: 0, cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none', ...style,
  }}>{char}</div>
);

// ─── BTN ─────────────────────────────────────────────────────────────────
const Btn = ({ children, primary, small, full, onClick, disabled, style = {} }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        padding: small ? '5px 16px' : '6px 24px',
        borderRadius: 24,
        border: primary ? 'none' : '1.5px solid rgba(0,0,0,0.6)',
        backgroundColor: primary ? (hov ? LI.blueDark : LI.blue) : (hov ? 'rgba(0,0,0,0.08)' : 'transparent'),
        color: primary ? '#fff' : 'rgba(0,0,0,0.9)',
        fontWeight: 600, fontSize: small ? 14 : 15,
        cursor: disabled ? 'not-allowed' : 'pointer',
        width: full ? '100%' : undefined,
        fontFamily: LI.fontStack,
        transition: 'background 0.15s',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >{children}</button>
  );
};

// ─── CARD ─────────────────────────────────────────────────────────────────
const Card = ({ children, style = {}, pad = 0 }) => (
  <div style={{
    backgroundColor: LI.white,
    borderRadius: 8,
    boxShadow: LI.cardShadow,
    padding: pad,
    overflow: 'hidden',
    marginBottom: 8,
    ...style,
  }}>{children}</div>
);

// ─── POST CARD ───────────────────────────────────────────────────────────
const PostCard = ({ post, onProfile }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const text = post.text;
  const isLong = text.length > 200;
  const displayText = isLong && !expanded ? text.slice(0, 200) + '…' : text;

  const addComment = () => {
    if (!commentText.trim()) return;
    setComments(c => [...c, { user: 'You', text: commentText, time: 'just now' }]);
    setCommentText('');
  };

  const actions = [
    { label: 'Like', icon: <Icons.ThumbUp filled={liked}/>, active: liked, fn: () => setLiked(l => !l), color: liked ? LI.blue : undefined },
    { label: 'Comment', icon: <Icons.Comment/>, active: showComments, fn: () => setShowComments(s => !s) },
    { label: 'Repost', icon: <Icons.Repost/>, active: false, fn: () => {} },
    { label: 'Send', icon: <Icons.Send/>, active: false, fn: () => {} },
  ];

  return (
    <Card>
      {/* Header */}
      <div style={{ padding: '12px 16px 0', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <Avatar char="P" size={48} onClick={onProfile} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <span onClick={onProfile} style={{ fontWeight: 600, fontSize: 14, cursor: 'pointer', color: LI.text }}>{PROFILE.name}</span>
              <div style={{ fontSize: 12, color: LI.textSub, lineHeight: 1.4 }}>Animal Welfare · Mumbai</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: LI.textSub }}>
                <span>{post.time}</span>
                <span>·</span>
                <Icons.Globe />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 4, color: LI.blue, fontWeight: 600, fontSize: 14, fontFamily: LI.fontStack }}>+ Follow</button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: '50%' }}><Icons.More /></button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: '50%' }}><Icons.Close /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <div style={{ padding: '8px 16px', fontSize: 14, lineHeight: 1.6, color: LI.text, whiteSpace: 'pre-wrap' }}>
        {displayText}
        {isLong && (
          <span onClick={() => setExpanded(e => !e)} style={{ color: LI.textSub, cursor: 'pointer', fontWeight: 600 }}>
            {' '}{expanded ? 'see less' : 'see more'}
          </span>
        )}
      </div>

      {/* Image */}
      {post.img && (
        <div style={{ position: 'relative', overflow: 'hidden', maxHeight: 400 }}>
          <img src={post.img} alt="" style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: 400 }} />
        </div>
      )}

      {/* Reactions bar */}
      <div style={{ padding: '6px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${LI.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: LI.textSub, cursor: 'pointer' }}>
          <div style={{ display: 'flex' }}>
            {post.reactions.slice(0,3).map((r, i) => (
              <div key={i} style={{ width: 16, height: 16, borderRadius: '50%', border: '1px solid #fff', marginLeft: i ? -4 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, backgroundColor: '#e8f3ff', zIndex: 3-i }}>{r}</div>
            ))}
          </div>
          <span style={{ marginLeft: 2 }}>{post.likes + (liked ? 1 : 0)}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, fontSize: 12, color: LI.textSub }}>
          <span onClick={() => setShowComments(true)} style={{ cursor: 'pointer' }}>{post.comments + comments.length} comments</span>
          <span>·</span>
          <span>{post.reposts} reposts</span>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', padding: '2px 8px' }}>
        {actions.map(a => (
          <ActionBtn key={a.label} label={a.label} icon={a.icon} active={a.active} onClick={a.fn} color={a.color} />
        ))}
      </div>

      {/* Comments */}
      {showComments && (
        <div style={{ borderTop: `1px solid ${LI.border}`, padding: '12px 16px' }}>
          {comments.map((c, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <Avatar char="Y" size={32} bg="#6b737a" color="#fff" />
              <div style={{ backgroundColor: '#f4f2ee', borderRadius: 8, padding: '8px 12px', flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{c.user}</div>
                <div style={{ fontSize: 13, color: LI.text }}>{c.text}</div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Avatar char="Y" size={32} bg="#6b737a" color="#fff" />
            <div style={{ flex: 1, display: 'flex', gap: 8 }}>
              <input
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addComment()}
                placeholder="Add a comment…"
                style={{ flex: 1, border: `1.5px solid ${LI.border}`, borderRadius: 24, padding: '8px 16px', fontSize: 14, outline: 'none', fontFamily: LI.fontStack, backgroundColor: 'transparent' }}
              />
            </div>
          </div>
          {commentText && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8, paddingLeft: 40 }}>
              <Btn primary small onClick={addComment}>Post</Btn>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

const ActionBtn = ({ label, icon, active, onClick, color }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        background: hov ? LI.hover : 'none', border: 'none', cursor: 'pointer',
        padding: '10px 4px', borderRadius: 4,
        color: color || (active ? LI.blue : 'rgba(0,0,0,0.6)'),
        fontSize: 14, fontWeight: active ? 600 : 400,
        fontFamily: LI.fontStack, transition: 'background 0.1s',
      }}
    >
      {icon}
      <span style={{ fontSize: 13 }}>{label}</span>
    </button>
  );
};

// ─── SIDEBAR PROFILE WIDGET ──────────────────────────────────────────────
const SideProfile = ({ onProfile }) => (
  <Card style={{ overflow: 'hidden' }}>
    <div style={{ height: 56, background: 'linear-gradient(135deg, #EADDCA 0%, #c9b49a 100%)', cursor: 'pointer' }} onClick={onProfile} />
    <div style={{ padding: '0 16px 12px', position: 'relative' }}>
      <Avatar char="P" size={56} style={{ border: '2px solid #fff', position: 'absolute', top: -28, cursor: 'pointer' }} onClick={onProfile} />
      <div style={{ paddingTop: 32 }}>
        <div onClick={onProfile} style={{ fontWeight: 600, fontSize: 14, cursor: 'pointer', color: LI.text }}>{PROFILE.name}</div>
        <div style={{ fontSize: 12, color: LI.textSub, lineHeight: 1.4, marginTop: 2 }}>{PROFILE.headline}</div>
      </div>
      <div style={{ borderTop: `1px solid ${LI.border}`, margin: '10px -16px 0', padding: '10px 16px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: LI.textSub, marginBottom: 4 }}>
          <span>Profile viewers</span>
          <span style={{ color: LI.blue, fontWeight: 600 }}>247</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: LI.textSub }}>
          <span>Post impressions</span>
          <span style={{ color: LI.blue, fontWeight: 600 }}>1,284</span>
        </div>
      </div>
    </div>
  </Card>
);

// ─── COMPOSE BOX ─────────────────────────────────────────────────────────
const ComposeBox = ({ onPost }) => {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);
  return (
    <Card pad={16} style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: focused ? 12 : 0 }}>
        <Avatar char="Y" size={48} bg="#6b737a" color="#fff" />
        <div
          onClick={() => setFocused(true)}
          style={{
            flex: 1, border: `1.5px solid ${LI.border}`, borderRadius: 24,
            padding: '10px 16px', fontSize: 14, color: '#666', cursor: 'text',
            display: focused ? 'none' : 'flex', alignItems: 'center',
            fontFamily: LI.fontStack,
          }}
        >Start a post</div>
        {focused && (
          <textarea
            autoFocus
            value={text}
            onChange={e => setText(e.target.value)}
            onBlur={() => !text && setFocused(false)}
            placeholder="What do you want to talk about?"
            style={{
              flex: 1, border: `1.5px solid ${LI.border}`, borderRadius: 8,
              padding: '10px 16px', fontSize: 14, fontFamily: LI.fontStack,
              resize: 'none', minHeight: 80, outline: 'none',
            }}
          />
        )}
      </div>
      {focused && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: 56 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[<Icons.Photo/>, <Icons.Video/>, <Icons.Article/>].map((ic, i) => (
              <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 4 }}>{ic}</button>
            ))}
          </div>
          <Btn primary small disabled={!text.trim()} onClick={() => { if (text.trim()) { onPost(text); setText(''); setFocused(false); } }}>Post</Btn>
        </div>
      )}
      {!focused && (
        <div style={{ display: 'flex', gap: 0, marginTop: 4 }}>
          {[['📷 Photo', '#70b5f9'], ['🎥 Video', '#e7a33e'], ['📄 Write article', '#f5987e']].map(([label, color]) => (
            <button key={label} onClick={() => setFocused(true)} style={{
              flex: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 4px',
              borderRadius: 4, fontSize: 13, fontWeight: 600, color: '#666', fontFamily: LI.fontStack,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>
              <span style={{ fontSize: 16 }}>{label.split(' ')[0]}</span>
              <span>{label.split(' ').slice(1).join(' ')}</span>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
};

// ─── PAGES ───────────────────────────────────────────────────────────────
const ProfilePage = ({ setPage }) => {
  const [tab, setTab] = useState('about');
  const [following, setFollowing] = useState(false);
  const [userPosts] = useState([]);

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '16px 16px 0', display: 'flex', gap: 16 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Top card */}
        <Card>
          <div style={{ height: 220, background: 'linear-gradient(135deg, #EADDCA 0%, #c9b49a 100%)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '2.5rem', color: '#4A3728', letterSpacing: 2, textShadow: '0 1px 2px rgba(255,255,255,0.5)' }}>POBA PETs</span>
          </div>
          <div style={{ padding: '0 24px 20px', position: 'relative' }}>
            <Avatar char="P" size={128} style={{ border: '4px solid #fff', position: 'absolute', top: -64 }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 16, gap: 8, marginBottom: 64 }}>
              <Btn onClick={() => setPage('messages')}>Message</Btn>
              <button
                onClick={() => setFollowing(f => !f)}
                style={{
                  padding: '6px 24px', borderRadius: 24, border: 'none',
                  backgroundColor: following ? '#efefef' : LI.blue, color: following ? '#666' : '#fff',
                  fontWeight: 600, fontSize: 15, cursor: 'pointer', fontFamily: LI.fontStack,
                }}
              >{following ? '✓ Following' : '+ Follow'}</button>
              <button style={{ background: 'none', border: `1.5px solid rgba(0,0,0,0.6)`, borderRadius: 24, cursor: 'pointer', padding: '6px 12px', fontSize: 20, lineHeight: 1, color: 'rgba(0,0,0,0.9)' }}>···</button>
            </div>
            <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 700, fontFamily: LI.fontStack }}>{PROFILE.name}</h1>
            <p style={{ margin: '0 0 6px', fontSize: 16, color: LI.text, fontFamily: LI.fontStack }}>{PROFILE.headline}</p>
            <p style={{ margin: '0 0 8px', fontSize: 14, color: LI.textSub }}>{PROFILE.location}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontSize: 14 }}>
              <span style={{ color: LI.blue, cursor: 'pointer', fontWeight: 500 }}>{PROFILE.website}</span>
              <span onClick={() => setPage('network')} style={{ color: LI.blue, cursor: 'pointer', fontWeight: 600 }}>{PROFILE.followers} followers</span>
              <span onClick={() => setPage('network')} style={{ color: LI.blue, cursor: 'pointer', fontWeight: 600 }}>{PROFILE.connections} connections</span>
            </div>
          </div>
        </Card>

        {/* Tab nav */}
        <Card>
          <div style={{ display: 'flex', borderBottom: `1px solid ${LI.border}` }}>
            {[['about','About'],['posts','Posts'],['experience','Experience']].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{
                padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: tab === id ? `2px solid ${LI.text}` : '2px solid transparent',
                color: tab === id ? LI.text : LI.textSub,
                fontWeight: tab === id ? 600 : 400, fontSize: 14, fontFamily: LI.fontStack,
                marginBottom: -1,
              }}>{label}</button>
            ))}
          </div>
          <div style={{ padding: '20px 24px' }}>
            {tab === 'about' && (
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px', fontFamily: LI.fontStack }}>About</h2>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: LI.text, whiteSpace: 'pre-wrap', margin: '0 0 20px' }}>{PROFILE.about}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14, color: LI.textSub }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>📍 <span>{PROFILE.location}</span></div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>🌐 <span style={{ color: LI.blue, cursor: 'pointer' }}>{PROFILE.website}</span></div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>✉️ <span>{PROFILE.email}</span></div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>📞 <span>{PROFILE.phone}</span></div>
                </div>
              </div>
            )}
            {tab === 'posts' && (
              <div>{[...userPosts, ...POSTS].map(p => <PostCard key={p.id} post={p} onProfile={() => setTab('about')} />)}</div>
            )}
            {tab === 'experience' && (
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 20px', fontFamily: LI.fontStack }}>Experience</h2>
                {EXPERIENCE.map((exp, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: i < EXPERIENCE.length - 1 ? `1px solid ${LI.border}` : 'none' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 4, backgroundColor: '#EADDCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#4A3728', flexShrink: 0, fontSize: 20 }}>P</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, fontFamily: LI.fontStack }}>{exp.title}</div>
                      <div style={{ color: LI.text, fontSize: 14 }}>{exp.company}</div>
                      <div style={{ color: LI.textSub, fontSize: 13 }}>{exp.period}</div>
                      <div style={{ color: LI.textSub, fontSize: 13 }}>{exp.location}</div>
                      <p style={{ margin: '8px 0 0', fontSize: 14, color: LI.text, lineHeight: 1.5 }}>{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Right sidebar */}
      <div style={{ width: 240, flexShrink: 0 }}>
        <Card pad={16}>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, fontFamily: LI.fontStack }}>Page analytics</h3>
          <div style={{ fontSize: 13, color: LI.textSub, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Followers</span><span style={{ fontWeight: 600, color: LI.text }}>{PROFILE.followers}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Post impressions</span><span style={{ fontWeight: 600, color: LI.text }}>3.2K</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Profile views</span><span style={{ fontWeight: 600, color: LI.text }}>247</span>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${LI.border}`, margin: '12px -16px 0', padding: '12px 16px 0' }}>
            <span style={{ fontSize: 13, color: LI.blue, fontWeight: 600, cursor: 'pointer' }}>View all analytics →</span>
          </div>
        </Card>
        <Card pad={16}>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, fontFamily: LI.fontStack }}>Ad performance</h3>
          <p style={{ fontSize: 13, color: LI.textSub, margin: '0 0 12px' }}>Boost your posts to reach more people.</p>
          <Btn full small>Create an ad</Btn>
        </Card>
      </div>
    </div>
  );
};

const FeedPage = ({ setPage }) => {
  const [userPosts, setUserPosts] = useState([]);
  return (
    <div style={{ maxWidth: 1128, margin: '0 auto', padding: '16px 24px 0', display: 'flex', gap: 16 }}>
      {/* Left sidebar */}
      <div style={{ width: 225, flexShrink: 0 }}>
        <SideProfile onProfile={() => setPage('profile')} />
        <div style={{ height: 1, backgroundColor: LI.border, margin: '0 0 8px' }} />
        <div style={{ fontSize: 13, padding: '4px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['Groups', 'Events', 'Followed Hashtags'].map(item => (
            <div key={item} style={{ padding: '6px 8px', cursor: 'pointer', borderRadius: 4, color: LI.textSub, fontWeight: 600, fontSize: 13 }}>{item}</div>
          ))}
          <div style={{ padding: '6px 8px', cursor: 'pointer', color: LI.textSub, fontSize: 13 }}>Discover more</div>
        </div>
      </div>

      {/* Main feed */}
      <div style={{ flex: 1, maxWidth: 552 }}>
        <ComposeBox onPost={(text) => setUserPosts(p => [{id: Date.now(), text, time: 'just now', likes: 0, comments: 0, reposts: 0, img: null, reactions: ['👍']}, ...p])} />
        {[...userPosts, ...POSTS].map(post => <PostCard key={post.id} post={post} onProfile={() => setPage('profile')} />)}
      </div>

      {/* Right sidebar */}
      <div style={{ width: 300, flexShrink: 0 }}>
        <Card pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, fontFamily: LI.fontStack }}>LinkedIn News</h3>
            <span style={{ cursor: 'pointer', fontSize: 18, color: LI.textSub }}>ℹ️</span>
          </div>
          {['Animal welfare funding rises 40% · 3h ago', 'Mumbai NGOs gain corporate backing · 8h ago', 'Pet adoption at record high in India · 1d ago', 'ESG trends reshaping CSR spend · 2d ago'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 10, cursor: 'pointer' }}>
              <span style={{ fontSize: 20, lineHeight: 1 }}>·</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{item.split(' · ')[0]}</div>
                <div style={{ fontSize: 12, color: LI.textSub }}>{item.split(' · ')[1]}</div>
              </div>
            </div>
          ))}
        </Card>
        <Card pad={16}>
          <p style={{ margin: 0, fontSize: 12, color: LI.textSub, textAlign: 'center' }}>
            <span style={{ cursor: 'pointer' }}>About</span> · <span style={{ cursor: 'pointer' }}>Accessibility</span> · <span style={{ cursor: 'pointer' }}>Help Center</span><br/>
            <span style={{ cursor: 'pointer' }}>Privacy & Terms</span> · <span style={{ cursor: 'pointer' }}>Ad Choices</span><br/>
            <span style={{ cursor: 'pointer' }}>Advertising</span> · <span style={{ cursor: 'pointer' }}>More</span>
          </p>
          <p style={{ margin: '12px 0 0', fontSize: 12, color: LI.textSub, textAlign: 'center' }}>LinkedIn Corporation © 2025</p>
        </Card>
      </div>
    </div>
  );
};

const NetworkPage = () => {
  const [connected, setConnected] = useState([]);
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: 16 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ width: 220, flexShrink: 0 }}>
          <Card pad={16}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Manage my network</div>
            {['Connections', 'Following & Followers', 'Groups', 'Events', 'Pages'].map(item => (
              <div key={item} style={{ padding: '6px 0', fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', borderRadius: 4, color: LI.text }}>
                <span>{item}</span>
                <span style={{ color: LI.textSub }}>›</span>
              </div>
            ))}
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 12, fontSize: 14, color: LI.textSub }}>People you may know · Based on your network</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {NETWORK.map((p, i) => (
              <Card key={i} style={{ textAlign: 'center', overflow: 'visible' }}>
                <button style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: LI.textSub, zIndex: 1 }}>×</button>
                <div style={{ height: 56, background: 'linear-gradient(135deg, #EADDCA, #c9b49a)', position: 'relative' }} />
                <div style={{ padding: '0 16px 16px' }}>
                  <Avatar char={p.name[0]} size={56} style={{ border: '2px solid #fff', margin: '-28px auto 8px', display: 'flex' }} />
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: LI.textSub, marginBottom: 4, minHeight: 32 }}>{p.role}</div>
                  <div style={{ fontSize: 12, color: LI.textSub, marginBottom: 12 }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      <Avatar char="·" size={16} bg="#ddd" color="#666" style={{ fontSize: 8, display: 'inline-flex' }} /> {p.mutual} mutual connections
                    </span>
                  </div>
                  <button
                    onClick={() => setConnected(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i])}
                    style={{
                      width: '100%', padding: '5px', borderRadius: 24,
                      border: `1.5px solid ${connected.includes(i) ? LI.blue : 'rgba(0,0,0,0.6)'}`,
                      backgroundColor: connected.includes(i) ? LI.blue : 'transparent',
                      color: connected.includes(i) ? '#fff' : 'rgba(0,0,0,0.9)',
                      fontWeight: 600, cursor: 'pointer', fontSize: 14, fontFamily: LI.fontStack,
                    }}
                  >{connected.includes(i) ? '✓ Connected' : '+ Connect'}</button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const JobsPage = () => {
  const [openJob, setOpenJob] = useState(null);
  const [applied, setApplied] = useState([]);
  const [saved, setSaved] = useState([]);

  if (openJob) return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: 16, display: 'flex', gap: 16 }}>
      <div style={{ flex: 1 }}>
        <button onClick={() => setOpenJob(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: LI.blue, fontSize: 14, fontWeight: 600, marginBottom: 16, padding: 0, fontFamily: LI.fontStack, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icons.Back /> Back to jobs
        </button>
        <Card pad={24}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 64, height: 64, borderRadius: 4, backgroundColor: '#EADDCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#4A3728', fontSize: 28, flexShrink: 0 }}>P</div>
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, fontFamily: LI.fontStack }}>{openJob.title}</h2>
              <div style={{ color: LI.blue, fontSize: 15, cursor: 'pointer', marginBottom: 2 }}>{openJob.company}</div>
              <div style={{ color: LI.textSub, fontSize: 14 }}>{openJob.location} · {openJob.type}</div>
              <div style={{ color: LI.textSub, fontSize: 13, marginTop: 4 }}>{openJob.posted} · {openJob.applicants}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <button
              onClick={() => setApplied(p => p.includes(openJob.id) ? p : [...p, openJob.id])}
              style={{
                padding: '10px 24px', borderRadius: 24, border: 'none',
                backgroundColor: applied.includes(openJob.id) ? LI.green : LI.blue,
                color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 15,
                fontFamily: LI.fontStack, display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              {applied.includes(openJob.id) ? '✓ Applied' : (openJob.easy ? '⚡ Easy Apply' : 'Apply')}
            </button>
            <button
              onClick={() => setSaved(p => p.includes(openJob.id) ? p.filter(x => x !== openJob.id) : [...p, openJob.id])}
              style={{
                padding: '10px 24px', borderRadius: 24,
                border: `1.5px solid rgba(0,0,0,0.6)`,
                backgroundColor: 'transparent', color: 'rgba(0,0,0,0.9)',
                fontWeight: 600, cursor: 'pointer', fontSize: 15, fontFamily: LI.fontStack,
              }}
            >{saved.includes(openJob.id) ? '🔖 Saved' : 'Save'}</button>
          </div>
          <div style={{ borderTop: `1px solid ${LI.border}`, paddingTop: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, fontFamily: LI.fontStack }}>About the job</h3>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: LI.text }}>
              <p>POBA PETs is looking for a passionate <strong>{openJob.title}</strong> to join our growing team in {openJob.location}.</p>
              <p><strong>Salary:</strong> {openJob.salary}</p>
              <p><strong>Responsibilities:</strong></p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 20 }}>
                <li>Support daily operations at our adoption centre</li>
                <li>Work closely with animals and their potential adopters</li>
                <li>Coordinate with veterinary staff and volunteers</li>
                <li>Maintain records and assist with community outreach</li>
              </ul>
              <p><strong>Requirements:</strong></p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 20 }}>
                <li>Passion for animal welfare</li>
                <li>Relevant education or experience preferred</li>
                <li>Strong communication skills</li>
                <li>Ability to work in a fast-paced environment</li>
              </ul>
              <p><strong>What we offer:</strong></p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Meaningful work with real impact</li>
                <li>Collaborative team environment</li>
                <li>Competitive NGO-sector salary</li>
                <li>Opportunity to grow with us</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
      <div style={{ width: 300, flexShrink: 0 }}>
        <Card pad={16}>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, fontFamily: LI.fontStack }}>Meet the hiring team</h3>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Avatar char="N" size={40} bg="#057642" color="#fff" />
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Nisha Sharma</div>
              <div style={{ fontSize: 12, color: LI.textSub }}>Veterinary Lead · POBA PETs</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: 16, display: 'flex', gap: 16 }}>
      <div style={{ width: 280, flexShrink: 0 }}>
        <Card pad={16}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>My jobs</div>
          {['My applications', 'Saved jobs', 'Applied jobs', 'Job alerts', 'Skill assessments'].map(item => (
            <div key={item} style={{ padding: '6px 0', fontSize: 14, cursor: 'pointer', color: LI.text, borderRadius: 4 }}>{item}</div>
          ))}
        </Card>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, fontFamily: LI.fontStack }}>Jobs you may be interested in</div>
        {JOBS.map(job => (
          <Card key={job.id} style={{ cursor: 'pointer' }} pad={16}>
            <div onClick={() => setOpenJob(job)} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 52, height: 52, borderRadius: 4, backgroundColor: '#EADDCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#4A3728', flexShrink: 0, fontSize: 22 }}>{job.company[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: LI.blue, marginBottom: 2 }}>{job.title}</div>
                <div style={{ fontSize: 14, color: LI.text }}>{job.company}</div>
                <div style={{ fontSize: 13, color: LI.textSub }}>{job.location} · {job.type}</div>
                <div style={{ fontSize: 12, color: LI.textSub, marginTop: 4 }}>
                  {job.posted} · {job.applicants}
                  {job.easy && <span style={{ color: LI.green, fontWeight: 600 }}> · ⚡ Easy Apply</span>}
                </div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); setSaved(p => p.includes(job.id) ? p.filter(x => x !== job.id) : [...p, job.id]); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: saved.includes(job.id) ? LI.blue : LI.textSub, padding: 4 }}
              >🔖</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const NotificationsPage = () => (
  <div style={{ maxWidth: 860, margin: '0 auto', padding: 16, display: 'flex', gap: 16 }}>
    <div style={{ width: 220, flexShrink: 0 }}>
      <Card pad={16}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Filter</div>
        {['All notifications', 'My posts', 'Mentions', 'Jobs'].map(item => (
          <div key={item} style={{ padding: '7px 8px', fontSize: 14, cursor: 'pointer', borderRadius: 4, color: LI.text, fontWeight: item === 'All notifications' ? 600 : 400 }}>{item}</div>
        ))}
      </Card>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, fontFamily: LI.fontStack }}>Notifications</h2>
        <div style={{ fontSize: 13, color: LI.blue, cursor: 'pointer', fontWeight: 600 }}>Mark all as read</div>
      </div>
      {NOTIFS.map((n, i) => (
        <div key={i} style={{
          backgroundColor: n.unread ? '#edf3fb' : LI.white,
          border: `1px solid ${LI.border}`, borderRadius: 8, padding: 16,
          marginBottom: 4, display: 'flex', gap: 12, cursor: 'pointer', alignItems: 'flex-start',
        }}>
          {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: LI.blue, flexShrink: 0, marginTop: 18 }} />}
          <div style={{
            width: 48, height: 48, borderRadius: '50%', backgroundColor: '#EADDCA',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
          }}>{n.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: LI.text, lineHeight: 1.5 }}>{n.text}</div>
            <div style={{ fontSize: 12, color: LI.blue, marginTop: 4, fontWeight: 600 }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MessagesPage = () => {
  const [openDM, setOpenDM] = useState(null);
  const [dmText, setDmText] = useState('');
  const [conversations, setConversations] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, openDM]);

  const sendMsg = () => {
    if (!dmText.trim() || !openDM) return;
    setConversations(prev => ({
      ...prev,
      [openDM.user]: [...(prev[openDM.user] || []), { from: 'you', text: dmText, time: 'Just now' }]
    }));
    setDmText('');
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 16 }}>
      <div style={{ display: 'flex', height: 'calc(100vh - 140px)', backgroundColor: LI.white, borderRadius: 8, boxShadow: LI.cardShadow, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: 336, borderRight: `1px solid ${LI.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: 16, borderBottom: `1px solid ${LI.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: 20, fontFamily: LI.fontStack }}>Messaging</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {['⚙️','✏️'].map((ic, i) => <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: LI.textSub }}>{ic}</button>)}
            </div>
          </div>
          <div style={{ padding: '8px 16px', borderBottom: `1px solid ${LI.border}` }}>
            <div style={{ backgroundColor: '#f4f2ee', borderRadius: 4, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icons.Search /> <span style={{ fontSize: 14, color: LI.textSub }}>Search messages</span>
            </div>
          </div>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {DMS.map((dm, i) => (
              <div key={i} onClick={() => setOpenDM(dm)} style={{
                padding: '12px 16px', display: 'flex', gap: 12, cursor: 'pointer',
                backgroundColor: openDM?.user === dm.user ? '#edf3fb' : LI.white,
                borderBottom: `1px solid ${LI.borderLight}`,
              }}>
                <div style={{ position: 'relative' }}>
                  <Avatar char={dm.avatar} size={48} />
                  {dm.unread && <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: LI.blue, border: '2px solid #fff', position: 'absolute', bottom: 0, right: 0 }} />}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: dm.unread ? 700 : 600, fontSize: 14 }}>{dm.user}</span>
                    <span style={{ fontSize: 12, color: LI.textSub }}>{dm.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: LI.textSub }}>{dm.role}</div>
                  <div style={{ fontSize: 13, color: dm.unread ? LI.text : LI.textSub, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: dm.unread ? 600 : 400 }}>{dm.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        {openDM ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LI.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar char={openDM.avatar} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{openDM.user}</div>
                <div style={{ fontSize: 12, color: LI.textSub }}>{openDM.role}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['📞','🎥','ℹ️'].map((ic, i) => <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: LI.textSub }}>{ic}</button>)}
              </div>
            </div>
            <div style={{ flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Initial message */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <Avatar char={openDM.avatar} size={32} />
                <div style={{ backgroundColor: '#f4f2ee', borderRadius: '16px 16px 16px 4px', padding: '10px 14px', fontSize: 14, maxWidth: '70%', color: LI.text }}>{openDM.msg}</div>
                <span style={{ fontSize: 11, color: LI.textSub }}>{openDM.time}</span>
              </div>
              {/* User replies */}
              {(conversations[openDM.user] || []).map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.from === 'you' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
                  {m.from !== 'you' && <Avatar char={openDM.avatar} size={32} />}
                  <div style={{
                    borderRadius: m.from === 'you' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    padding: '10px 14px', fontSize: 14, maxWidth: '70%',
                    backgroundColor: m.from === 'you' ? LI.blue : '#f4f2ee',
                    color: m.from === 'you' ? '#fff' : LI.text,
                  }}>{m.text}</div>
                  <span style={{ fontSize: 11, color: LI.textSub }}>{m.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div style={{ padding: 16, borderTop: `1px solid ${LI.border}` }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', border: `1.5px solid ${LI.border}`, borderRadius: 8, padding: '8px 12px' }}>
                <input
                  value={dmText}
                  onChange={e => setDmText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMsg()}
                  placeholder="Write a message…"
                  style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, fontFamily: LI.fontStack, backgroundColor: 'transparent' }}
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  {['📷','😊','📎','⋯'].map((ic, i) => <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: LI.textSub }}>{ic}</button>)}
                </div>
                <button
                  onClick={sendMsg}
                  disabled={!dmText.trim()}
                  style={{
                    background: 'none', border: 'none', cursor: dmText.trim() ? 'pointer' : 'not-allowed',
                    fontSize: 20, color: dmText.trim() ? LI.blue : LI.textSub, padding: 0,
                  }}
                >➤</button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <div style={{ fontSize: 64 }}>💬</div>
            <div style={{ fontWeight: 600, fontSize: 18, fontFamily: LI.fontStack }}>Select a message</div>
            <div style={{ fontSize: 14, color: LI.textSub, textAlign: 'center', maxWidth: 300 }}>Choose from your existing conversations, start a new one, or just keep swimming.</div>
            <Btn primary>New message</Btn>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN APP ────────────────────────────────────────────────────────────
const LinkedInPage = ({ onBack }) => {
  const [page, setPage] = useState('feed');
  const [notifCount] = useState(3);

  const NAV = [
    { id: 'feed', label: 'Home', Icon: Icons.Home },
    { id: 'network', label: 'My Network', Icon: Icons.Network },
    { id: 'jobs', label: 'Jobs', Icon: Icons.Jobs },
    { id: 'messages', label: 'Messaging', Icon: Icons.Msg, badge: 2 },
    { id: 'notifications', label: 'Notifications', Icon: Icons.Bell, badge: notifCount },
  ];

  const renderPage = () => {
    switch (page) {
      case 'profile': return <ProfilePage setPage={setPage} />;
      case 'feed': return <FeedPage setPage={setPage} />;
      case 'network': return <NetworkPage />;
      case 'jobs': return <JobsPage />;
      case 'notifications': return <NotificationsPage />;
      case 'messages': return <MessagesPage />;
      default: return <FeedPage setPage={setPage} />;
    }
  };

  return (
    <div style={{ backgroundColor: LI.bg, minHeight: '100vh', fontFamily: LI.fontStack, color: LI.text }}>
      {/* TOP NAVBAR */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        backgroundColor: LI.white,
        borderBottom: `1px solid ${LI.border}`,
        height: 52,
        display: 'flex', alignItems: 'stretch',
        padding: '0 24px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, maxWidth: 1128, margin: '0 auto', width: '100%' }}>
          {/* Back + Logo */}
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: 4, display: 'flex', alignItems: 'center', marginRight: 4 }}>
            <Icons.Back />
          </button>
          <div style={{ backgroundColor: LI.blue, borderRadius: 4, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icons.LinkedIn />
          </div>

          {/* Search */}
          <div style={{ backgroundColor: '#eef3f8', borderRadius: 4, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, width: 280 }}>
            <Icons.Search />
            <span style={{ fontSize: 14, color: LI.textSub }}>Search</span>
          </div>

          <div style={{ flex: 1 }} />

          {/* Nav items */}
          {NAV.map(({ id, label, Icon, badge }) => {
            const active = page === id;
            return (
              <button
                key={id}
                onClick={() => setPage(id)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 1, background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0 12px', height: '100%', position: 'relative',
                  borderBottom: active ? `2px solid ${LI.text}` : '2px solid transparent',
                  color: active ? LI.text : 'rgba(0,0,0,0.55)',
                  minWidth: 70,
                }}
              >
                <div style={{ position: 'relative' }}>
                  <Icon active={active} />
                  {badge && !active && (
                    <div style={{
                      position: 'absolute', top: -4, right: -4,
                      backgroundColor: LI.red, color: '#fff',
                      borderRadius: '50%', width: 16, height: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700,
                    }}>{badge}</div>
                  )}
                </div>
                <span style={{ fontSize: 11, lineHeight: 1.2 }}>{label}</span>
              </button>
            );
          })}

          {/* Me */}
          <button
            onClick={() => setPage('profile')}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 1, background: 'none', border: 'none', cursor: 'pointer',
              padding: '0 12px', height: '100%',
              borderBottom: page === 'profile' ? `2px solid ${LI.text}` : '2px solid transparent',
              color: page === 'profile' ? LI.text : 'rgba(0,0,0,0.55)',
              minWidth: 60,
            }}
          >
            <Avatar char="P" size={24} />
            <span style={{ fontSize: 11, lineHeight: 1.2 }}>Me ▾</span>
          </button>

          {/* Divider + For Business */}
          <div style={{ width: 1, height: 28, backgroundColor: LI.border, margin: '0 8px' }} />
          <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px', height: '100%', justifyContent: 'center', color: 'rgba(0,0,0,0.55)', fontSize: 11 }}>
            <span style={{ fontSize: 20 }}>⋯</span>
            <span>For Business</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 8, borderLeft: `1px solid ${LI.border}`, height: 28 }}>
            <span style={{ fontSize: 13, color: LI.blue, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Try Premium</span>
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div style={{ paddingBottom: 40 }}>
        {renderPage()}
      </div>
    </div>
  );
};

export default LinkedInPage;