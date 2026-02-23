import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROFILE = {
  username: 'pobapet_official',
  name: 'POBA PETs',
  bio: '🐾 Mumbai\'s Favourite Pet Adoption Centre\n📍 Mumbai, Maharashtra\n🌐 pobapet.com\n❤️ 500+ happy adoptions',
  followers: '2.4K',
  following: 210,
  posts: 6,
  avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&q=80',
};

const HIGHLIGHTS = [
  { id: 1, name: 'Adopted ❤️', cover: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&q=80', slides: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80','https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80'] },
  { id: 2, name: 'New Pals', cover: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&q=80', slides: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80','https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80'] },
  { id: 3, name: 'Care Tips', cover: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=150&q=80', slides: ['https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&q=80'] },
  { id: 4, name: 'Events', cover: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=150&q=80', slides: ['https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80'] },
  { id: 5, name: 'Shop', cover: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=150&q=80', slides: ['https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=600&q=80'] },
];

const POSTS = [
  { id: 1, img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80', likes: 842, caption: 'Bella found her forever home today 🐾 #adoption #dog #pobapet', time: '2 hours ago', comments: [{ user: 'aarav_k', text: 'This made my day!' }, { user: 'meow_india', text: 'So beautiful 😭' }] },
  { id: 2, img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80', likes: 1203, caption: 'Luna says good morning ☀️ Still available for adoption. DM us! #cat #siamese', time: '1 day ago', comments: [{ user: 'pooja.patel', text: 'She looks royal 👑' }, { user: 'delhi_petlover', text: 'I want her!!!' }] },
  { id: 3, img: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&q=80', likes: 567, caption: 'Rio has been with us for 3 months. He knows 12 words! 🦜 #macaw #bird', time: '2 days ago', comments: [{ user: 'shrini_118', text: 'What are the 12 words?? 😂' }] },
  { id: 4, img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&q=80', likes: 934, caption: 'Snowball is the fluffiest resident at POBA 🐰 #rabbit #bunny', time: '3 days ago', comments: [{ user: 'mumbai_bunny', text: 'She is the cutest thing 🥺' }] },
  { id: 5, img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', likes: 2100, caption: 'Bruno is officially ADOPTED! 🎉 We are crying happy tears 💛 #adopted #rottweiler', time: '5 days ago', comments: [{ user: 'arjun.official', text: 'YESSS!! So happy for him!' }] },
  { id: 6, img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80', likes: 776, caption: 'Meet Nala — our newest British Shorthair 😂 #cat #britishshorthair', time: '1 week ago', comments: [{ user: 'cats.of.india', text: 'She already owns the place 😍' }] },
];

const STORIES = [
  { name: 'pobapet_official', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=150&q=80', seen: false },
  { name: 'adopted_bella', img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&q=80', seen: false },
  { name: 'luna.cat', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&q=80', seen: true },
  { name: 'rio_parrot', img: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=150&q=80', seen: false },
  { name: 'snowball_bunny', img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=150&q=80', seen: true },
];

const EXPLORE_IMGS = [
  'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&q=80',
  'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=300&q=80',
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&q=80',
  'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&q=80',
  'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=300&q=80',
  'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=300&q=80',
  'https://images.unsplash.com/photo-1518715308788-3005759c61d4?w=300&q=80',
  'https://images.unsplash.com/photo-1559214369-a6b1d7919865?w=300&q=80',
  'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&q=80',
];

const NOTIFS = [
  { user: 'aarav_k', action: 'liked your photo', img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=60&q=80', time: '2m' },
  { user: 'pooja.patel', action: 'commented: "She looks royal 👑"', img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=60&q=80', time: '15m' },
  { user: 'delhi_petlover', action: 'started following you', img: null, time: '1h' },
  { user: 'neha__', action: 'liked your photo', img: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=60&q=80', time: '2h' },
  { user: 'mumbai_bunny', action: 'commented: "She is the cutest thing 🥺"', img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=60&q=80', time: '3h' },
  { user: 'arjun.official', action: 'started following you', img: null, time: '5h' },
  { user: 'cats.of.india', action: 'liked your photo', img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=60&q=80', time: '1d' },
];

const DMS = [
  { user: 'aarav_k', msg: 'Hey! Is Bella still available?', time: '2m', avatar: null, unread: true },
  { user: 'pooja.patel', msg: 'I want to adopt Luna 🥺', time: '1h', avatar: null, unread: true },
  { user: 'delhi_petlover', msg: 'What are your adoption fees?', time: '3h', avatar: null, unread: false },
  { user: 'mumbai_bunny', msg: 'Can I visit this Saturday?', time: '1d', avatar: null, unread: false },
];

const InstagramPage = ({ onBack }) => {
  const [page, setPage] = useState('profile'); // profile, feed, explore, reels, notifications, dms
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [openPost, setOpenPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState({});
  const [storyData, setStoryData] = useState(null); // { slides, index, name }
  const [highlightData, setHighlightData] = useState(null);
  const [profileTab, setProfileTab] = useState('posts'); // posts, reels, tagged
  const [openDM, setOpenDM] = useState(null);
  const [dmText, setDmText] = useState('');
  const [dmMessages, setDmMessages] = useState({});
  const [following, setFollowing] = useState(false);

  const toggleLike = (id) => setLikedPosts(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleSave = (id) => setSavedPosts(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const addComment = (postId) => {
    if (!commentText.trim()) return;
    setPostComments(prev => ({ ...prev, [postId]: [...(prev[postId] || []), { user: 'you', text: commentText }] }));
    setCommentText('');
  };

  const sendDM = () => {
    if (!dmText.trim() || !openDM) return;
    setDmMessages(prev => ({ ...prev, [openDM.user]: [...(prev[openDM.user] || []), { from: 'you', text: dmText }] }));
    setDmText('');
  };

  const allComments = (post) => [...post.comments, ...(postComments[post.id] || [])];

  // ── STORY VIEWER ──
  const StoryViewer = ({ data, onClose }) => {
    const [idx, setIdx] = useState(data.startIndex || 0);
    const slides = data.slides;
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '400px', aspectRatio: '9/16', borderRadius: '12px', overflow: 'hidden' }}>
          <img src={slides[idx]} alt="story" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {/* Progress bars */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', gap: '3px', padding: '10px 12px' }}>
            {slides.map((_, i) => <div key={i} style={{ flex: 1, height: '2px', backgroundColor: i <= idx ? '#fff' : 'rgba(255,255,255,0.4)', borderRadius: '2px' }} />)}
          </div>
          {/* Header */}
          <div style={{ position: 'absolute', top: '24px', left: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>P</div>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>{data.name}</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>• {idx + 1}/{slides.length}</span>
          </div>
          <button onClick={onClose} style={{ position: 'absolute', top: '24px', right: '16px', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
          {/* Nav */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
            <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => idx > 0 ? setIdx(idx - 1) : onClose()} />
            <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => idx < slides.length - 1 ? setIdx(idx + 1) : onClose()} />
          </div>
          <div style={{ position: 'absolute', bottom: '30px', left: 0, right: 0, textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: '18px' }}>{data.name}</div>
        </div>
      </motion.div>
    );
  };

  // ── POST MODAL ──
  const PostModal = ({ post, onClose }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()} style={{ backgroundColor: '#fff', borderRadius: '4px', display: 'flex', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'hidden' }}>
        <img src={post.img} alt="post" style={{ width: '55%', objectFit: 'cover', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #efefef', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>P</div>
              <span style={{ fontWeight: '600', fontSize: '14px' }}>pobapet_official</span>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <div style={{ marginBottom: '12px', fontSize: '14px' }}><span style={{ fontWeight: '600' }}>pobapet_official</span> {post.caption}</div>
            {allComments(post).map((c, i) => <div key={i} style={{ marginBottom: '8px', fontSize: '14px' }}><span style={{ fontWeight: '600' }}>{c.user}</span> {c.text}</div>)}
          </div>
          <div style={{ padding: '8px 16px', borderTop: '1px solid #efefef' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
              <motion.button whileTap={{ scale: 1.3 }} onClick={() => toggleLike(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', padding: 0 }}>{likedPosts.includes(post.id) ? '❤️' : '🤍'}</motion.button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', padding: 0 }}>💬</button>
              <motion.button whileTap={{ scale: 1.3 }} onClick={() => toggleSave(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '22px', padding: 0, marginLeft: 'auto' }}>{savedPosts.includes(post.id) ? '🔖' : '🏷️'}</motion.button>
            </div>
            <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>{(post.likes + (likedPosts.includes(post.id) ? 1 : 0)).toLocaleString()} likes</div>
          </div>
          <div style={{ padding: '12px 16px', borderTop: '1px solid #efefef', display: 'flex', gap: '10px' }}>
            <input value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key === 'Enter' && addComment(post.id)} placeholder="Add a comment..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', fontFamily: 'inherit' }} />
            {commentText && <button onClick={() => addComment(post.id)} style={{ background: 'none', border: 'none', color: '#0095f6', fontWeight: '600', cursor: 'pointer' }}>Post</button>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // ── PROFILE PAGE ──
  const ProfilePage = () => (
    <div style={{ maxWidth: '935px', margin: '0 auto', padding: '30px 20px' }}>
      {/* Profile Header */}
      <div style={{ display: 'flex', gap: '60px', marginBottom: '40px', alignItems: 'flex-start' }}>
        <div style={{ width: '150px', height: '150px', borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', padding: '3px', flexShrink: 0 }}>
          <img src={PROFILE.avatar} alt="profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '20px', fontWeight: '300' }}>{PROFILE.username}</span>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setFollowing(!following)} style={{ padding: '7px 24px', borderRadius: '8px', border: 'none', backgroundColor: following ? '#efefef' : '#0095f6', color: following ? '#262626' : '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
              {following ? 'Following' : 'Follow'}
            </motion.button>
            <button style={{ padding: '7px 24px', borderRadius: '8px', border: '1px solid #dbdbdb', backgroundColor: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }} onClick={() => setPage('dms')}>Message</button>
          </div>
          <div style={{ display: 'flex', gap: '40px', marginBottom: '20px' }}>
            <span><strong>{PROFILE.posts}</strong> posts</span>
            <span><strong>{PROFILE.followers}</strong> followers</span>
            <span><strong>{PROFILE.following}</strong> following</span>
          </div>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>{PROFILE.name}</div>
          <div style={{ fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{PROFILE.bio}</div>
        </div>
      </div>

      {/* Highlights */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
        {HIGHLIGHTS.map(h => (
          <div key={h.id} onClick={() => setHighlightData({ slides: h.slides, name: h.name })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}>
            <div style={{ width: '77px', height: '77px', borderRadius: '50%', border: '1px solid #dbdbdb', padding: '3px', backgroundColor: '#fafafa' }}>
              <img src={h.cover} alt={h.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
            <span style={{ fontSize: '12px', textAlign: 'center', maxWidth: '77px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.name}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderTop: '1px solid #dbdbdb' }}>
        {[['posts','⊞'], ['reels','▷'], ['tagged','@']].map(([tab, icon]) => (
          <button key={tab} onClick={() => setProfileTab(tab)} style={{ flex: 1, padding: '12px', background: 'none', border: 'none', borderTop: profileTab === tab ? '1px solid #262626' : '1px solid transparent', cursor: 'pointer', color: profileTab === tab ? '#262626' : '#8e8e8e', fontWeight: profileTab === tab ? '600' : '400', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            {icon} {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid */}
      {profileTab === 'posts' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px', marginTop: '3px' }}>
          {POSTS.map(post => (
            <div key={post.id} onClick={() => setOpenPost(post)} style={{ aspectRatio: '1/1', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}>
              <img src={post.img} alt="post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0)', transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#fff', fontWeight: 'bold', fontSize: '14px' }} className="post-hover">
              </div>
            </div>
          ))}
        </div>
      )}
      {profileTab === 'reels' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px', marginTop: '3px' }}>
          {POSTS.slice(0,3).map(post => (
            <div key={post.id} onClick={() => setOpenPost(post)} style={{ aspectRatio: '9/16', cursor: 'pointer', overflow: 'hidden', position: 'relative', backgroundColor: '#000' }}>
              <img src={post.img} alt="reel" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', color: '#fff', fontSize: '12px' }}>▶ {(post.likes / 1000).toFixed(1)}K</div>
            </div>
          ))}
        </div>
      )}
      {profileTab === 'tagged' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px', marginTop: '3px' }}>
          {POSTS.slice(2).map(post => (
            <div key={post.id} onClick={() => setOpenPost(post)} style={{ aspectRatio: '1/1', cursor: 'pointer', overflow: 'hidden' }}>
              <img src={post.img} alt="tagged" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ── FEED PAGE ──
  const FeedPage = () => (
    <div style={{ maxWidth: '470px', margin: '0 auto' }}>
      {/* Stories bar */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #dbdbdb', padding: '12px 0', display: 'flex', gap: '16px', overflowX: 'auto', paddingLeft: '16px', marginBottom: '0' }}>
        {STORIES.map((s, i) => (
          <div key={i} onClick={() => setStoryData({ slides: [s.img], name: s.name })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', flexShrink: 0 }}>
            <div style={{ width: '62px', height: '62px', borderRadius: '50%', padding: '2px', background: s.seen ? '#dbdbdb' : 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
              <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff' }} />
            </div>
            <span style={{ fontSize: '11px', maxWidth: '64px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</span>
          </div>
        ))}
      </div>
      {/* Posts */}
      {POSTS.map(post => (
        <div key={post.id} style={{ backgroundColor: '#fff', marginBottom: '1px', borderBottom: '1px solid #efefef' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: '12px' }}>
            <div onClick={() => setPage('profile')} style={{ cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>P</div>
            <div onClick={() => setPage('profile')} style={{ cursor: 'pointer', flex: 1 }}>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>pobapet_official</div>
              <div style={{ fontSize: '12px', color: '#8e8e8e' }}>Mumbai, India</div>
            </div>
            <span style={{ fontSize: '20px', cursor: 'pointer' }}>···</span>
          </div>
          <img src={post.img} alt="post" onClick={() => setOpenPost(post)} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
          <div style={{ padding: '8px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <motion.button whileTap={{ scale: 1.3 }} onClick={() => toggleLike(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '24px' }}>{likedPosts.includes(post.id) ? '❤️' : '🤍'}</motion.button>
                <button onClick={() => setOpenPost(post)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '22px' }}>💬</button>
              </div>
              <motion.button whileTap={{ scale: 1.3 }} onClick={() => toggleSave(post.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '22px' }}>{savedPosts.includes(post.id) ? '🔖' : '🏷️'}</motion.button>
            </div>
            <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>{(post.likes + (likedPosts.includes(post.id) ? 1 : 0)).toLocaleString()} likes</div>
            <div style={{ fontSize: '14px', marginBottom: '4px' }}><span style={{ fontWeight: '600' }}>pobapet_official</span> {post.caption}</div>
            <div onClick={() => setOpenPost(post)} style={{ fontSize: '14px', color: '#8e8e8e', cursor: 'pointer', marginBottom: '4px' }}>View all {allComments(post).length} comments</div>
            <div style={{ fontSize: '10px', color: '#8e8e8e', textTransform: 'uppercase' }}>{post.time}</div>
          </div>
        </div>
      ))}
    </div>
  );

  // ── EXPLORE PAGE ──
  const ExplorePage = () => (
    <div style={{ maxWidth: '935px', margin: '0 auto', padding: '8px' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ backgroundColor: '#efefef', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#8e8e8e' }}>🔍</span>
          <span style={{ color: '#8e8e8e', fontSize: '14px' }}>Search</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3px' }}>
        {EXPLORE_IMGS.map((img, i) => (
          <div key={i} onClick={() => setOpenPost(POSTS[i % POSTS.length])} style={{ aspectRatio: i % 5 === 0 ? '1/2' : '1/1', cursor: 'pointer', overflow: 'hidden', gridRow: i % 5 === 0 ? 'span 2' : 'span 1' }}>
            <img src={img} alt="explore" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
    </div>
  );

  // ── NOTIFICATIONS ──
  const NotificationsPage = () => (
    <div style={{ maxWidth: '470px', margin: '0 auto', padding: '16px' }}>
      <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '20px' }}>Notifications</h2>
      <p style={{ fontSize: '12px', color: '#8e8e8e', marginBottom: '12px', fontWeight: '600' }}>THIS WEEK</p>
      {NOTIFS.map((n, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', flexShrink: 0 }}>{n.user[0].toUpperCase()}</div>
          <div style={{ flex: 1, fontSize: '14px' }}>
            <span style={{ fontWeight: '600' }}>{n.user}</span> {n.action} <span style={{ color: '#8e8e8e' }}>· {n.time}</span>
          </div>
          {n.img && <img src={n.img} alt="" style={{ width: '44px', height: '44px', objectFit: 'cover', flexShrink: 0 }} />}
          {!n.img && <button style={{ padding: '6px 16px', borderRadius: '8px', border: '1px solid #dbdbdb', background: '#fff', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>Follow back</button>}
        </div>
      ))}
    </div>
  );

  // ── DMs ──
  const DMPage = () => (
    <div style={{ maxWidth: '935px', margin: '0 auto', display: 'flex', height: 'calc(100vh - 110px)' }}>
      {/* DM List */}
      <div style={{ width: '350px', borderRight: '1px solid #dbdbdb', flexShrink: 0 }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #dbdbdb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '600', fontSize: '16px' }}>pobapet_official</span>
          <span style={{ fontSize: '22px', cursor: 'pointer' }}>✏️</span>
        </div>
        {DMS.map((dm, i) => (
          <div key={i} onClick={() => setOpenDM(dm)} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', backgroundColor: openDM?.user === dm.user ? '#fafafa' : '#fff', borderBottom: '1px solid #fafafa' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '20px', flexShrink: 0 }}>{dm.user[0].toUpperCase()}</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontWeight: dm.unread ? '600' : '400', fontSize: '14px' }}>{dm.user}</div>
              <div style={{ fontSize: '13px', color: '#8e8e8e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dm.msg}</div>
            </div>
            <div style={{ fontSize: '12px', color: '#8e8e8e' }}>{dm.time}</div>
          </div>
        ))}
      </div>
      {/* Chat area */}
      {openDM ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #dbdbdb', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg,#f09433,#bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>{openDM.user[0].toUpperCase()}</div>
            <span style={{ fontWeight: '600', fontSize: '16px' }}>{openDM.user}</span>
          </div>
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ alignSelf: 'flex-start', backgroundColor: '#efefef', borderRadius: '18px', padding: '8px 14px', fontSize: '14px', maxWidth: '70%' }}>{openDM.msg}</div>
            {(dmMessages[openDM.user] || []).map((m, i) => (
              <div key={i} style={{ alignSelf: m.from === 'you' ? 'flex-end' : 'flex-start', backgroundColor: m.from === 'you' ? '#0095f6' : '#efefef', color: m.from === 'you' ? '#fff' : '#262626', borderRadius: '18px', padding: '8px 14px', fontSize: '14px', maxWidth: '70%' }}>{m.text}</div>
            ))}
          </div>
          <div style={{ padding: '12px 16px', borderTop: '1px solid #dbdbdb', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input value={dmText} onChange={e => setDmText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendDM()} placeholder="Message..." style={{ flex: 1, border: '1px solid #dbdbdb', borderRadius: '22px', padding: '10px 16px', outline: 'none', fontSize: '14px', fontFamily: 'inherit' }} />
            {dmText && <button onClick={sendDM} style={{ background: 'none', border: 'none', color: '#0095f6', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>Send</button>}
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', color: '#8e8e8e' }}>
          <div style={{ fontSize: '48px' }}>💬</div>
          <span style={{ fontSize: '16px' }}>Select a message</span>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#262626' }}>

      {/* TOP NAV */}
      <div style={{ position: 'sticky', top: 0, backgroundColor: '#fff', borderBottom: '1px solid #dbdbdb', zIndex: 100, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxSizing: 'border-box' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem' }}>←</button>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.6rem', fontStyle: 'italic', fontWeight: 'bold' }}>Instagram</span>
        <button onClick={() => setPage('dms')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.4rem' }}>💬</button>
      </div>

      {/* PAGE CONTENT */}
      <div style={{ paddingBottom: '70px' }}>
        <AnimatePresence mode="wait">
          <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {page === 'profile' && <ProfilePage />}
            {page === 'feed' && <FeedPage />}
            {page === 'explore' && <ExplorePage />}
            {page === 'notifications' && <NotificationsPage />}
            {page === 'dms' && <DMPage />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTop: '1px solid #dbdbdb', display: 'flex', justifyContent: 'space-around', padding: '10px 0', zIndex: 100 }}>
        {[['feed','🏠'],['explore','🔍'],['reels','➕'],['notifications','❤️'],['profile','👤']].map(([p, icon]) => (
          <button key={p} onClick={() => setPage(p)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '4px 12px', opacity: page === p ? 1 : 0.5 }}>{icon}</button>
        ))}
      </div>

      {/* OVERLAYS */}
      <AnimatePresence>
        {openPost && <PostModal post={openPost} onClose={() => setOpenPost(null)} />}
        {storyData && <StoryViewer data={storyData} onClose={() => setStoryData(null)} />}
        {highlightData && <StoryViewer data={highlightData} onClose={() => setHighlightData(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default InstagramPage;