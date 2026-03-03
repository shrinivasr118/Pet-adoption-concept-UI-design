import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const C = {
  bg: "#fafafa", white: "#ffffff", border: "#dbdbdb",
  text: "#262626", muted: "#8e8e8e", blue: "#0095f6", red: "#ed4956",
  grad: "linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
};

const PROFILE = {
  username: "pobapet_official", name: "POBA PETs",
  bio: "🐾 Mumbai's Pet Adoption Centre\n📍 Helping pets find homes since 2019\n❤️ 500+ successful adoptions\n🌐 DM to adopt",
  website: "pobapet.com",
};

const POSTS = [
  { id: 1, img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80", likes: 842, caption: "Bella found her forever home today 🐾 Swipe to see her reaction! #adoption #dog #pobapet", time: "2 hours ago", comments: [{ user: "animalover", text: "So adorable! 😍" }, { user: "dogmom", text: "This made my day 🥺" }] },
  { id: 2, img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80", likes: 1203, caption: "Luna the Siamese is still looking for a home 🥺 DM to adopt! #cat #adoptdontshop", time: "1 day ago", comments: [{ user: "catperson", text: "I want her 😭" }, { user: "mumbairescue", text: "Sharing this!" }] },
  { id: 3, img: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&q=80", likes: 567, caption: "Meet Rio! This Macaw knows 12 words and counting 🦜 #parrot #birds", time: "2 days ago", comments: [{ user: "birdwatcher", text: "What a beauty!" }] },
  { id: 4, img: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80", likes: 934, caption: "Snowball is the fluffiest resident at POBA 🐰 She loves cuddles and carrots! #rabbit #bunny", time: "3 days ago", comments: [{ user: "bunnyclub", text: "Need her in my life 🐰" }] },
  { id: 5, img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80", likes: 2100, caption: "ADOPTED! 🎉 Bruno found his forever family after 4 months with us. 💛 #success #adopted", time: "5 days ago", comments: [{ user: "adoptdontshop", text: "This is everything 💛" }, { user: "mumbaidog", text: "Bruno!!!! 🎉" }] },
  { id: 6, img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800&q=80", likes: 776, caption: "New arrival: Nala the British Shorthair 😻 She already thinks she owns the place! #cat", time: "1 week ago", comments: [{ user: "catmom99", text: "Queen energy 👑" }] },
];

const HIGHLIGHTS = [
  { id: 1, name: "Adopted ❤️", cover: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80", slides: ["https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80", "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80"] },
  { id: 2, name: "Dogs", cover: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200&q=80", slides: ["https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80", "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80"] },
  { id: 3, name: "Cats", cover: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&q=80", slides: ["https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80", "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80"] },
  { id: 4, name: "Birds", cover: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=200&q=80", slides: ["https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&q=80"] },
  { id: 5, name: "Care Tips", cover: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=200&q=80", slides: ["https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=600&q=80"] },
];

/* ─── ICONS ─────────────────────────────────────────────── */
const Icon = {
  Home: ({ f }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={f?"#262626":"none"} stroke="#262626" strokeWidth="1.8"><path d="M3 9.5L12 3l9 6.5V21a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Search: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.8"><circle cx="10.5" cy="10.5" r="7.5"/><line x1="16.5" y1="16.5" x2="22" y2="22" strokeLinecap="round"/></svg>,
  Plus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><line x1="12" y1="7" x2="12" y2="17" strokeLinecap="round"/><line x1="7" y1="12" x2="17" y2="12" strokeLinecap="round"/></svg>,
  Reels: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="9" y1="2" x2="9" y2="9"/><line x1="15" y1="2" x2="15" y2="9"/><path d="M10 13.5l5 3-5 3v-6z" fill="#262626" stroke="none"/></svg>,
  Profile: ({ f }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={f?"#262626":"none"} stroke="#262626" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/></svg>,
  Heart: ({ f }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={f?"#ed4956":"none"} stroke={f?"#ed4956":"#262626"} strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  Comment: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  Share: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="1.8"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Bookmark: ({ f }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={f?"#262626":"none"} stroke="#262626" strokeWidth="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>,
  More: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#262626"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>,
  Close: ({ dark }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={dark?"#262626":"white"} strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round"/><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round"/></svg>,
  ChevL: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ChevR: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Back: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#262626" strokeWidth="2"><polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  BigHeart: () => <svg width="80" height="80" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0.5" style={{filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.5))"}}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  GridTab: ({ a }) => <svg width="11" height="11" viewBox="0 0 11 11" fill={a?"#262626":"#8e8e8e"}><rect x="0" y="0" width="4.5" height="4.5" rx="0.5"/><rect x="6.5" y="0" width="4.5" height="4.5" rx="0.5"/><rect x="0" y="6.5" width="4.5" height="4.5" rx="0.5"/><rect x="6.5" y="6.5" width="4.5" height="4.5" rx="0.5"/></svg>,
  ReelsTab: ({ a }) => <svg width="11" height="11" viewBox="0 0 11 11" fill={a?"#262626":"#8e8e8e"}><rect x="0" y="0" width="11" height="11" rx="2"/><path d="M4 3.5l4 2-4 2v-4z" fill="white"/></svg>,
  TagTab: ({ a }) => <svg width="11" height="11" viewBox="0 0 12 12" fill={a?"#262626":"#8e8e8e"}><path d="M11 1H8L1 8l3 3 7-7V1zM9.5 3.5a1 1 0 110-2 1 1 0 010 2z"/></svg>,
};

/* ─── AVATAR RING ────────────────────────────────────────── */
function Ring({ size = 66, pad = 2, gap = 2, seen, label, onClick, children }) {
  const total = size + pad * 2 + gap * 2;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", flexShrink: 0 }} onClick={onClick}>
      <div style={{ width: total, height: total, borderRadius: "50%", background: seen ? "#dbdbdb" : C.grad, padding: pad, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: size, height: size, borderRadius: "50%", border: `${gap}px solid white`, overflow: "hidden", background: "#e1e8ed", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {children}
        </div>
      </div>
      {label && <div style={{ fontSize: 11, marginTop: 5, maxWidth: total + 4, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: C.text }}>{label}</div>}
    </div>
  );
}

/* ─── STORY VIEWER ───────────────────────────────────────── */
function StoryViewer({ hl, onClose }) {
  const [idx, setIdx] = useState(0);
  const [prog, setProg] = useState(0);
  const ref = useRef(null);
  const DURATION = 5000;

  useState(() => {
    let start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = (elapsed / DURATION) * 100;
      if (p >= 100) {
        if (idx < hl.slides.length - 1) { setIdx(i => i + 1); start = Date.now(); setProg(0); }
        else onClose();
      } else {
        setProg(p);
        ref.current = requestAnimationFrame(tick);
      }
    };
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  });

  // Use useEffect for the timer
  const [, forceRender] = useState(0);
  useState(() => { forceRender(n => n + 1); });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, background: "#000", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <StoryContent hl={hl} onClose={onClose} />
    </motion.div>
  );
}

function StoryContent({ hl, onClose }) {
  const [idx, setIdx] = useState(0);
  const [prog, setProg] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(Date.now());

  const runTimer = () => {
    startRef.current = Date.now();
    setProg(0);
    const tick = () => {
      const p = Math.min(((Date.now() - startRef.current) / 5000) * 100, 100);
      setProg(p);
      if (p < 100) rafRef.current = requestAnimationFrame(tick);
      else {
        if (idx < hl.slides.length - 1) setIdx(i => i + 1);
        else onClose();
      }
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  };

  // Start timer on mount and idx change
  const [, bump] = useState(0);
  if (typeof window !== "undefined") {
    // We'll use a simpler approach with useEffect-like behavior
  }

  const isMobile = window.innerWidth <= 420;

  return (
    <div style={{ width: Math.min(400, window.innerWidth), height: "100%", maxHeight: isMobile ? "100%" : 720, position: "relative", overflow: "hidden", borderRadius: isMobile ? 0 : 12 }}>
      {/* Progress bars */}
      <div style={{ position: "absolute", top: 12, left: 12, right: 12, zIndex: 10, display: "flex", gap: 4 }}>
        {hl.slides.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 2, borderRadius: 2, background: "rgba(255,255,255,0.35)", overflow: "hidden" }}>
            <ProgressBar running={i === idx} done={i < idx} onDone={() => { if (i === hl.slides.length - 1) onClose(); else setIdx(i + 1); }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ position: "absolute", top: 24, left: 12, right: 12, zIndex: 10, display: "flex", alignItems: "center", gap: 10 }}>
        <Ring size={34} pad={2} gap={1} seen><img src={hl.cover} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></Ring>
        <div>
          <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{PROFILE.username}</div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{hl.name}</div>
        </div>
        <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer" }}><Icon.Close /></button>
      </div>

      {/* Slide image */}
      <AnimatePresence mode="wait">
        <motion.img key={idx} src={hl.slides[idx]} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </AnimatePresence>

      {/* Tap zones */}
      <div style={{ position: "absolute", inset: 0, display: "flex", zIndex: 9 }}>
        <div style={{ flex: 1 }} onClick={() => idx > 0 && setIdx(i => i - 1)} />
        <div style={{ flex: 1 }} onClick={() => { if (idx < hl.slides.length - 1) setIdx(i => i + 1); else onClose(); }} />
      </div>

      {/* Nav arrows */}
      {idx > 0 && <button onClick={() => setIdx(i => i - 1)} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.3)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 11 }}><Icon.ChevL /></button>}
      {idx < hl.slides.length - 1 && <button onClick={() => setIdx(i => i + 1)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.3)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 11 }}><Icon.ChevR /></button>}

      {/* Reply bar */}
      <div style={{ position: "absolute", bottom: 20, left: 12, right: 12, zIndex: 10, display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ flex: 1, border: "1.5px solid rgba(255,255,255,0.6)", borderRadius: 24, padding: "9px 16px", color: "rgba(255,255,255,0.8)", fontSize: 14 }}>Reply to {PROFILE.username}…</div>
        <button style={{ background: "none", border: "none", cursor: "pointer" }}><Icon.Share /></button>
      </div>
    </div>
  );
}

// Simple animated progress bar using RAF
function ProgressBar({ running, done, onDone }) {
  const [width, setWidth] = useState(done ? 100 : 0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  if (done && width !== 100) setWidth(100);
  if (!running && !done && width !== 0) setWidth(0);

  if (running && startRef.current === null) {
    startRef.current = Date.now();
    const tick = () => {
      const p = Math.min(((Date.now() - startRef.current) / 5000) * 100, 100);
      setWidth(p);
      if (p < 100) rafRef.current = requestAnimationFrame(tick);
      else { startRef.current = null; onDone(); }
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  if (!running) {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; startRef.current = null; }
  }

  return <div style={{ height: "100%", background: "white", width: `${width}%` }} />;
}

/* ─── POST MODAL ─────────────────────────────────────────── */
function PostModal({ post, liked, saved, onLike, onSave, onClose }) {
  const [comments, setComments] = useState(post.comments);
  const [input, setInput] = useState("");
  const [heartAnim, setHeartAnim] = useState(false);
  const lastTap = useRef(0);

  const doubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) { if (!liked) onLike(post.id); setHeartAnim(true); setTimeout(() => setHeartAnim(false), 900); }
    lastTap.current = now;
  };

  const submit = () => {
    if (!input.trim()) return;
    setComments(c => [...c, { user: "you", text: input }]);
    setInput("");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: "spring", stiffness: 280, damping: 28 }}
        onClick={e => e.stopPropagation()}
        style={{ background: C.white, borderRadius: 4, overflow: "hidden", display: "flex", width: "100%", maxWidth: 900, maxHeight: "90vh", boxShadow: "0 12px 48px rgba(0,0,0,0.5)" }}>

        {/* LEFT: Image */}
        <div style={{ flex: "0 0 auto", width: "55%", background: "#000", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={doubleTap}>
          <img src={post.img} style={{ width: "100%", maxHeight: "90vh", objectFit: "cover", display: "block" }} />
          <AnimatePresence>
            {heartAnim && (
              <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1.1 }} exit={{ opacity: 0, scale: 1.4 }} transition={{ duration: 0.6 }}
                style={{ position: "absolute", pointerEvents: "none" }}><Icon.BigHeart /></motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: Panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", padding: "14px 16px", borderBottom: `1px solid ${C.border}`, gap: 10, flexShrink: 0 }}>
            <Ring size={32} pad={1.5} gap={1.5}><div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#4A3728" }}>P</div></Ring>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{PROFILE.username}</div>
              <div style={{ fontSize: 11, color: C.muted }}>Mumbai, India</div>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon.Close dark /></button>
          </div>

          {/* Comments scroll */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <Ring size={32} pad={1.5} gap={1.5}><div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#4A3728" }}>P</div></Ring>
              <div style={{ flex: 1 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{PROFILE.username} </span>
                <span style={{ fontSize: 14 }}>{post.caption}</span>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{post.time}</div>
              </div>
            </div>
            {comments.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: `hsl(${i * 67 + 30},55%,65%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>{c.user[0].toUpperCase()}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{c.user} </span>
                  <span style={{ fontSize: 14 }}>{c.text}</span>
                  <div style={{ display: "flex", gap: 14, marginTop: 4 }}>
                    <span style={{ fontSize: 11, color: C.muted }}>1h</span>
                    <span style={{ fontSize: 11, color: C.muted, cursor: "pointer" }}>Reply</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ borderTop: `1px solid ${C.border}`, padding: "8px 12px 0", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", gap: 12, flex: 1 }}>
                <motion.button whileTap={{ scale: 1.4 }} onClick={() => onLike(post.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon.Heart f={liked} /></motion.button>
                <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon.Comment /></button>
                <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon.Share /></button>
              </div>
              <motion.button whileTap={{ scale: 1.3 }} onClick={() => onSave(post.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon.Bookmark f={saved} /></motion.button>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{(post.likes + (liked ? 1 : 0)).toLocaleString()} likes</div>
          </div>

          {/* Input */}
          <div style={{ display: "flex", alignItems: "center", padding: "10px 12px", borderTop: `1px solid ${C.border}`, gap: 10, flexShrink: 0 }}>
            <span style={{ fontSize: 22, cursor: "pointer" }}>😊</span>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="Add a comment…" style={{ flex: 1, border: "none", outline: "none", fontSize: 14, fontFamily: "inherit", background: "transparent" }} />
            {input && <button onClick={submit} style={{ background: "none", border: "none", cursor: "pointer", color: C.blue, fontWeight: 600, fontSize: 14, padding: 0 }}>Post</button>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── DOUBLE TAP IMAGE ───────────────────────────────────── */
function DoubleTapImg({ post, liked, onLike, onOpenPost }) {
  const [heart, setHeart] = useState(false);
  const tapRef = useRef(0);

  const handleClick = () => {
    const now = Date.now();
    if (now - tapRef.current < 300) {
      if (!liked) onLike(post.id);
      setHeart(true);
      setTimeout(() => setHeart(false), 900);
    }
    tapRef.current = now;
  };

  return (
    <div style={{ position: "relative", cursor: "pointer" }} onClick={handleClick}>
      <img src={post.img} style={{ width: "100%", display: "block" }} alt="" />
      <AnimatePresence>
        {heart && (
          <motion.div initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1.1 }} exit={{ opacity: 0, scale: 1.5 }} transition={{ duration: 0.6 }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <Icon.BigHeart />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────── */
export default function InstagramClone({ onBack }) {
  const [page, setPage] = useState("profile");
  const [liked, setLiked] = useState([]);
  const [saved, setSaved] = useState([]);
  const [following, setFollowing] = useState(false);
  const [tab, setTab] = useState("posts");
  const [story, setStory] = useState(null);
  const [modal, setModal] = useState(null);
  const [seenHl, setSeenHl] = useState([]);

  const toggleLike = id => setLiked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleSave = id => setSaved(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const openHl = h => { setStory(h); setSeenHl(s => [...new Set([...s, h.id])]); };

  /* ── PROFILE ── */
  const ProfilePage = () => (
    <div style={{ maxWidth: 935, margin: "0 auto", paddingTop: 30 }}>
      {/* Header */}
      <header style={{ display: "flex", marginBottom: 44, padding: "0 20px", gap: 30 }}>
        <div style={{ flexShrink: 0 }}>
          <Ring size={150} pad={3} gap={3}>
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, fontWeight: 700, color: "#4A3728" }}>P</div>
          </Ring>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 20, fontWeight: 300, margin: 0, color: C.text }}>{PROFILE.username}</h2>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setFollowing(f => !f)}
              style={{ background: following ? "transparent" : C.blue, border: following ? `1px solid ${C.border}` : "none", borderRadius: 8, color: following ? C.text : "white", cursor: "pointer", fontWeight: 600, padding: "7px 16px", fontSize: 14, fontFamily: "inherit" }}>
              {following ? "Following" : "Follow"}
            </motion.button>
            <button style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, color: C.text, cursor: "pointer", fontWeight: 600, padding: "7px 16px", fontSize: 14, fontFamily: "inherit" }}>Message</button>
          </div>
          <ul style={{ display: "flex", listStyle: "none", padding: 0, margin: "0 0 16px", gap: 40 }}>
            {[["6","posts"],["2.4K","followers"],["210","following"]].map(([v,l]) => (
              <li key={l} style={{ fontSize: 16, color: C.text }}><span style={{ fontWeight: 600 }}>{v}</span> {l}</li>
            ))}
          </ul>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{PROFILE.name}</div>
          <div style={{ fontSize: 14, lineHeight: "20px", whiteSpace: "pre-wrap", color: C.text }}>{PROFILE.bio}</div>
          <a href="#" style={{ color: "#00376b", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>{PROFILE.website}</a>
        </div>
      </header>

      {/* Highlights */}
      <div style={{ display: "flex", gap: 20, padding: "0 20px 24px", overflowX: "auto" }}>
        {HIGHLIGHTS.map(h => (
          <Ring key={h.id} size={66} pad={2} gap={2} label={h.name} seen={seenHl.includes(h.id)} onClick={() => openHl(h)}>
            <img src={h.cover} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Ring>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ borderTop: `1px solid ${C.border}`, display: "flex" }}>
        {[
          { id: "posts", label: "POSTS", Icon: (a) => <Icon.GridTab a={a} /> },
          { id: "reels", label: "REELS", Icon: (a) => <Icon.ReelsTab a={a} /> },
          { id: "tagged", label: "TAGGED", Icon: (a) => <Icon.TagTab a={a} /> },
        ].map(({ id, label, Icon: TabIcon }) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ flex: 1, background: "none", border: "none", borderTop: tab === id ? `1px solid ${C.text}` : "none", marginTop: -1, cursor: "pointer", height: 52, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: 1, color: tab === id ? C.text : C.muted, fontFamily: "inherit" }}>
            <TabIcon a={tab === id} />
            {label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3, paddingBottom: 60 }}>
        {POSTS.map(post => (
          <motion.div key={post.id} whileHover={{ opacity: 0.85 }} onClick={() => setModal(post)}
            style={{ aspectRatio: "1/1", overflow: "hidden", cursor: "pointer", position: "relative" }}>
            <img src={post.img} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            {/* Hover overlay with likes */}
            <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
              <span style={{ color: "white", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                {post.likes.toLocaleString()}
              </span>
              <span style={{ color: "white", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                {post.comments.length}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  /* ── FEED ── */
  const FeedPage = () => (
    <div style={{ maxWidth: 470, margin: "0 auto" }}>
      {POSTS.map((post, i) => {
        const isLiked = liked.includes(post.id);
        const isSaved = saved.includes(post.id);
        return (
          <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", padding: "10px 12px", gap: 10 }}>
              <Ring size={32} pad={1.5} gap={1.5} onClick={() => setPage("profile")}>
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#4A3728" }}>P</div>
              </Ring>
              <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setPage("profile")}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{PROFILE.username}</div>
                <div style={{ fontSize: 11, color: C.muted }}>Mumbai, India</div>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer" }}><Icon.More /></button>
            </div>

            <DoubleTapImg post={post} liked={isLiked} onLike={toggleLike} onOpenPost={() => setModal(post)} />

            <div style={{ padding: "4px 12px 10px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
                <div style={{ display: "flex", gap: 14, flex: 1 }}>
                  <motion.button whileTap={{ scale: 1.4 }} onClick={() => toggleLike(post.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon.Heart f={isLiked} /></motion.button>
                  <button onClick={() => setModal(post)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon.Comment /></button>
                  <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon.Share /></button>
                </div>
                <motion.button whileTap={{ scale: 1.3 }} onClick={() => toggleSave(post.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><Icon.Bookmark f={isSaved} /></motion.button>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{(post.likes + (isLiked ? 1 : 0)).toLocaleString()} likes</div>
              <div style={{ fontSize: 14, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>{PROFILE.username} </span>{post.caption}</div>
              {post.comments.length > 0 && <button onClick={() => setModal(post)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: C.muted, fontSize: 14 }}>View all {post.comments.length} comments</button>}
              <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: 0.3, marginTop: 4 }}>{post.time}</div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>
      {/* Top Nav */}
      <nav style={{ background: C.white, borderBottom: `1px solid ${C.border}`, position: "fixed", top: 0, width: "100%", zIndex: 200, height: 60, boxSizing: "border-box" }}>
        <div style={{ maxWidth: 975, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", height: "100%", justifyContent: "space-between" }}>
          <button onClick={onBack || (() => {})} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}><Icon.Back /></button>
          <div style={{ fontFamily: "'Billabong','Grand Hotel',cursive", fontSize: 28, color: C.text, userSelect: "none" }}>Instagram</div>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}><Icon.Plus /></button>
        </div>
      </nav>

      {/* Content */}
      <div style={{ paddingTop: 60, paddingBottom: 60 }}>
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
            {page === "profile" ? <ProfilePage /> : <FeedPage />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <nav style={{ background: C.white, borderTop: `1px solid ${C.border}`, position: "fixed", bottom: 0, width: "100%", height: 52, display: "flex", alignItems: "center", zIndex: 200 }}>
        {[
          { id: "feed",    el: () => <Icon.Home f={page==="feed"} /> },
          { id: "search",  el: () => <Icon.Search /> },
          { id: "new",     el: () => <Icon.Plus /> },
          { id: "reels",   el: () => <Icon.Reels /> },
          { id: "profile", el: () => <Icon.Profile f={page==="profile"} /> },
        ].map(({ id, el }) => (
          <button key={id} onClick={() => { if (id === "profile") setPage("profile"); else if (id === "feed") setPage("feed"); }}
            style={{ flex: 1, background: "none", border: "none", cursor: "pointer", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
              opacity: (id==="feed"&&page==="feed")||(id==="profile"&&page==="profile") ? 1 : 0.5, transition: "opacity 0.15s" }}>
            {el()}
          </button>
        ))}
      </nav>

      {/* Overlays */}
      <AnimatePresence>
        {story && <StoryViewer key="story" hl={story} onClose={() => setStory(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {modal && <PostModal key={modal.id} post={modal} liked={liked.includes(modal.id)} saved={saved.includes(modal.id)} onLike={toggleLike} onSave={toggleSave} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </div>
  );
}