import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PROFILE = {
  name: 'POBA PETs',
  username: '@pobapet_official',
  bio: '🐾 Mumbai\'s favourite pet adoption centre | 500+ happy adoptions | DM to adopt | pobapet.com',
  location: 'Mumbai, Maharashtra',
  website: 'pobapet.com',
  joined: 'March 2019',
  following: 210,
  followers: '2.1K',
  banner: '#EADDCA',
  verified: true,
};

const TWEETS = [
  { id: 1, text: '🐾 Big news! We just welcomed 8 new dogs to POBA this week. Labradors, Beagles, and a very fluffy Pomeranian. Come meet them this Saturday!\n\n#AdoptDontShop #Mumbai', time: '2h', likes: 312, retweets: 87, replies: 24, img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80', bookmarks: 45 },
  { id: 2, text: 'Luna the Siamese has been waiting 3 months for a home 🐱 She loves window seats and pretending she does not need you (she does). DM us to adopt her!\n\n#cat #siamese #adoptdontshop', time: '5h', likes: 541, retweets: 210, replies: 67, img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&q=80', bookmarks: 89 },
  { id: 3, text: 'PSA: Rabbits are NOT low-maintenance pets. They need space, social time, and veggies daily. Before you adopt — read our care guide at pobapet.com/care 🐰\n\n#PetCare #RabbitTips', time: '1d', likes: 893, retweets: 445, replies: 112, img: null, bookmarks: 231 },
  { id: 4, text: 'Bruno the Rottweiler officially has a family ❤️ After 4 months with us, this gentle giant found his people. We cannot stop crying.\n\nThank you Mumbai 🙏\n\n#Adopted #HappyEnding', time: '2d', likes: 2840, retweets: 1203, replies: 347, img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80', bookmarks: 567 },
  { id: 5, text: 'Rio the Macaw has been learning new words 🦜 His vocabulary: hello, poba, treats, no (he refuses to use it), and something that sounds like "mama"\n\nSend help 😂', time: '4d', likes: 1540, retweets: 672, replies: 289, img: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=500&q=80', bookmarks: 112 },
];

const NOTIFS = [
  { type: 'like', user: 'aarav_k', text: 'liked your Tweet', preview: '🐾 Big news! We just welcomed...', time: '2m', icon: '❤️' },
  { type: 'retweet', user: 'meow_india', text: 'retweeted your Tweet', preview: 'Luna the Siamese has been...', time: '15m', icon: '🔁' },
  { type: 'follow', user: 'delhi_petlover', text: 'followed you', preview: null, time: '1h', icon: '👤' },
  { type: 'reply', user: 'pooja.patel', text: 'replied to your Tweet', preview: 'This is so wholesome 😭', time: '2h', icon: '💬' },
  { type: 'like', user: 'bangalore_dogs', text: 'liked your Tweet', preview: 'Bruno the Rottweiler officially...', time: '3h', icon: '❤️' },
  { type: 'mention', user: 'shrini_118', text: 'mentioned you', preview: 'Hey @pobapet_official when...', time: '5h', icon: '@' },
];

const BOOKMARKED = [TWEETS[1], TWEETS[3]];

const DMS = [
  { user: 'aarav_k', msg: 'Hi! Is Luna still available for adoption?', time: '2m', unread: true },
  { user: 'pooja.patel', msg: 'We would love to adopt Bruno!!', time: '1h', unread: true },
  { user: 'delhi_petlover', msg: 'What are your visiting hours?', time: '3h', unread: false },
];

const FOLLOWING_LIST = [
  { name: 'PETA India', user: '@petaindia', bio: 'Animal rights for every creature 🐾', verified: false },
  { name: 'Blue Cross India', user: '@bluecrossindia', bio: 'Protecting animals since 1959', verified: true },
  { name: 'WWF India', user: '@wwfindia', bio: 'Conservation of nature', verified: true },
  { name: 'Friendicoes', user: '@friendicoes', bio: 'Animal shelter, Delhi', verified: false },
];

const TwitterPage = ({ onBack }) => {
  const [page, setPage] = useState('profile'); // profile, home, notifications, bookmarks, messages, following, followers
  const [likedTweets, setLikedTweets] = useState([]);
  const [retweeted, setRetweeted] = useState([]);
  const [bookmarked, setBookmarked] = useState([TWEETS[1].id, TWEETS[3].id]);
  const [tweetText, setTweetText] = useState('');
  const [userTweets, setUserTweets] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState({});
  const [openDM, setOpenDM] = useState(null);
  const [dmText, setDmText] = useState('');
  const [dmMessages, setDmMessages] = useState({});
  const [following, setFollowing] = useState(false);
  const [openTweet, setOpenTweet] = useState(null);
  const [composing, setComposing] = useState(false);
  const [profileTab, setProfileTab] = useState('tweets');

  const toggleLike = (id) => setLikedTweets(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleRetweet = (id) => setRetweeted(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const toggleBookmark = (id) => setBookmarked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const postTweet = () => {
    if (!tweetText.trim()) return;
    setUserTweets(prev => [{ id: Date.now(), text: tweetText, time: 'just now', likes: 0, retweets: 0, replies: 0, img: null, bookmarks: 0 }, ...prev]);
    setTweetText('');
    setComposing(false);
  };

  const postReply = (tweetId) => {
    if (!replyText.trim()) return;
    setReplies(prev => ({ ...prev, [tweetId]: [...(prev[tweetId] || []), { user: 'you', text: replyText }] }));
    setReplyText('');
    setReplyingTo(null);
  };

  const sendDM = () => {
    if (!dmText.trim() || !openDM) return;
    setDmMessages(prev => ({ ...prev, [openDM.user]: [...(prev[openDM.user] || []), { from: 'you', text: dmText }] }));
    setDmText('');
  };

  const allTweets = [...userTweets, ...TWEETS];

  // ── TWEET CARD ──
  const TweetCard = ({ tweet, compact = false }) => (
    <div style={{ padding: '16px', borderBottom: '1px solid #2f3336', display: 'flex', gap: '12px', cursor: 'pointer' }} onClick={() => !compact && setOpenTweet(tweet)}>
      <div onClick={e => { e.stopPropagation(); setPage('profile'); }} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#EADDCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#4A3728', flexShrink: 0, cursor: 'pointer', fontSize: '14px' }}>P</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap' }}>
          <span onClick={e => { e.stopPropagation(); setPage('profile'); }} style={{ fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>POBA PETs</span>
          {PROFILE.verified && <span style={{ color: '#1d9bf0', fontSize: '14px' }}>✓</span>}
          <span style={{ color: '#71767b', fontSize: '14px' }}>@pobapet_official · {tweet.time}</span>
        </div>
        <p style={{ margin: '0 0 12px 0', fontSize: '15px', lineHeight: '1.5', color: '#e7e9ea', whiteSpace: 'pre-wrap' }}>{tweet.text}</p>
        {tweet.img && <img src={tweet.img} alt="" style={{ width: '100%', borderRadius: '12px', marginBottom: '12px', maxHeight: '280px', objectFit: 'cover', border: '1px solid #2f3336' }} onClick={e => e.stopPropagation()} />}
        {/* Replies preview */}
        {(replies[tweet.id] || []).map((r, i) => (
          <div key={i} style={{ fontSize: '14px', color: '#71767b', marginBottom: '4px' }}>
            <span style={{ color: '#e7e9ea', fontWeight: '600' }}>@{r.user}: </span>{r.text}
          </div>
        ))}
        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '420px' }} onClick={e => e.stopPropagation()}>
          <motion.button whileTap={{ scale: 1.2 }} onClick={() => setReplyingTo(replyingTo === tweet.id ? null : tweet.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#71767b', fontSize: '13px', padding: '4px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            {(tweet.replies || 0) + (replies[tweet.id]?.length || 0)}
          </motion.button>
          <motion.button whileTap={{ scale: 1.2 }} onClick={() => toggleRetweet(tweet.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: retweeted.includes(tweet.id) ? '#00ba7c' : '#71767b', fontSize: '13px', padding: '4px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            {(tweet.retweets || 0) + (retweeted.includes(tweet.id) ? 1 : 0)}
          </motion.button>
          <motion.button whileTap={{ scale: 1.2 }} onClick={() => toggleLike(tweet.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: likedTweets.includes(tweet.id) ? '#f91880' : '#71767b', fontSize: '13px', padding: '4px' }}>
            {likedTweets.includes(tweet.id) ? '❤️' : '🤍'} {(tweet.likes || 0) + (likedTweets.includes(tweet.id) ? 1 : 0)}
          </motion.button>
          <motion.button whileTap={{ scale: 1.2 }} onClick={() => toggleBookmark(tweet.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: bookmarked.includes(tweet.id) ? '#1d9bf0' : '#71767b', fontSize: '13px', padding: '4px' }}>
            <svg width="18" height="18" fill={bookmarked.includes(tweet.id) ? '#1d9bf0' : 'none'} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            {(tweet.bookmarks || 0) + (bookmarked.includes(tweet.id) ? 1 : 0)}
          </motion.button>
        </div>
        {/* Reply box */}
        <AnimatePresence>
          {replyingTo === tweet.id && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ marginTop: '12px', display: 'flex', gap: '8px' }} onClick={e => e.stopPropagation()}>
              <input value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => e.key === 'Enter' && postReply(tweet.id)} placeholder="Post your reply..." style={{ flex: 1, backgroundColor: '#16181c', border: '1px solid #2f3336', borderRadius: '20px', padding: '8px 16px', color: '#e7e9ea', fontSize: '14px', outline: 'none', fontFamily: 'inherit' }} />
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => postReply(tweet.id)} style={{ backgroundColor: '#1d9bf0', color: '#fff', border: 'none', borderRadius: '20px', padding: '8px 16px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>Reply</motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  // ── PROFILE PAGE ──
  const ProfilePage = () => (
    <div>
      {/* Banner */}
      <div style={{ height: '200px', backgroundColor: '#EADDCA', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-50px', left: '20px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#4A3728', border: '4px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FAEBD7', fontSize: '36px', fontWeight: 'bold' }}>P</div>
      </div>
      <div style={{ padding: '60px 20px 16px', borderBottom: '1px solid #2f3336' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px', gap: '8px' }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setPage('messages')} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #536471', backgroundColor: 'transparent', color: '#e7e9ea', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>Message</motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setFollowing(!following)} style={{ padding: '8px 20px', borderRadius: '20px', border: following ? '1px solid #536471' : 'none', backgroundColor: following ? 'transparent' : '#e7e9ea', color: following ? '#e7e9ea' : '#0f1419', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>
            {following ? 'Following' : 'Follow'}
          </motion.button>
        </div>
        <h2 style={{ margin: '0 0 2px 0', fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {PROFILE.name} {PROFILE.verified && <span style={{ color: '#1d9bf0' }}>✓</span>}
        </h2>
        <div style={{ color: '#71767b', fontSize: '15px', marginBottom: '12px' }}>{PROFILE.username}</div>
        <p style={{ margin: '0 0 12px 0', fontSize: '15px', lineHeight: '1.5' }}>{PROFILE.bio}</p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', color: '#71767b', fontSize: '14px', marginBottom: '12px' }}>
          <span>📍 {PROFILE.location}</span>
          <span style={{ color: '#1d9bf0' }}>🔗 {PROFILE.website}</span>
          <span>📅 Joined {PROFILE.joined}</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', fontSize: '15px' }}>
          <span onClick={() => setPage('following')} style={{ cursor: 'pointer' }}><strong>{PROFILE.following}</strong> <span style={{ color: '#71767b' }}>Following</span></span>
          <span onClick={() => setPage('followers')} style={{ cursor: 'pointer' }}><strong>{PROFILE.followers}</strong> <span style={{ color: '#71767b' }}>Followers</span></span>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #2f3336' }}>
        {[['tweets','Tweets'],['replies','Replies'],['media','Media'],['likes','Likes']].map(([t, label]) => (
          <button key={t} onClick={() => setProfileTab(t)} style={{ flex: 1, padding: '16px 4px', background: 'none', border: 'none', borderBottom: profileTab === t ? '2px solid #1d9bf0' : '2px solid transparent', cursor: 'pointer', color: profileTab === t ? '#e7e9ea' : '#71767b', fontWeight: profileTab === t ? '700' : '400', fontSize: '15px' }}>{label}</button>
        ))}
      </div>
      {/* Content */}
      {profileTab === 'tweets' && [...userTweets, ...TWEETS].map(t => <TweetCard key={t.id} tweet={t} />)}
      {profileTab === 'replies' && TWEETS.slice(0, 2).map(t => <TweetCard key={t.id} tweet={t} />)}
      {profileTab === 'media' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', padding: '2px' }}>
          {TWEETS.filter(t => t.img).map(t => (
            <div key={t.id} onClick={() => setOpenTweet(t)} style={{ aspectRatio: '1/1', cursor: 'pointer', overflow: 'hidden' }}>
              <img src={t.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
      {profileTab === 'likes' && TWEETS.slice(2).map(t => <TweetCard key={t.id} tweet={t} />)}
    </div>
  );

  // ── HOME FEED ──
  const HomeFeed = () => (
    <div>
      <div style={{ position: 'sticky', top: '60px', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 10, borderBottom: '1px solid #2f3336' }}>
        <div style={{ display: 'flex' }}>
          {['For you', 'Following'].map((tab, i) => (
            <button key={tab} style={{ flex: 1, padding: '16px', background: 'none', border: 'none', borderBottom: i === 0 ? '2px solid #1d9bf0' : '2px solid transparent', cursor: 'pointer', color: i === 0 ? '#e7e9ea' : '#71767b', fontWeight: i === 0 ? '700' : '400', fontSize: '15px' }}>{tab}</button>
          ))}
        </div>
      </div>
      {/* Compose */}
      <div style={{ padding: '16px', borderBottom: '1px solid #2f3336', display: 'flex', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', flexShrink: 0 }}>Y</div>
        <div style={{ flex: 1 }}>
          <textarea value={tweetText} onChange={e => setTweetText(e.target.value)} placeholder="What is happening?!" maxLength={280} style={{ width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#e7e9ea', fontSize: '20px', resize: 'none', fontFamily: 'inherit', minHeight: '60px', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #2f3336' }}>
            <div style={{ display: 'flex', gap: '8px', color: '#1d9bf0', fontSize: '18px' }}>
              {['🖼️','😊','📊','📅'].map((ic, i) => <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>{ic}</button>)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {tweetText && <span style={{ fontSize: '13px', color: tweetText.length > 260 ? '#f4212e' : '#71767b' }}>{280 - tweetText.length}</span>}
              <motion.button whileTap={{ scale: 0.95 }} onClick={postTweet} disabled={!tweetText.trim()} style={{ backgroundColor: tweetText.trim() ? '#1d9bf0' : '#0e5f87', color: '#fff', border: 'none', borderRadius: '20px', padding: '8px 20px', fontWeight: '700', cursor: tweetText.trim() ? 'pointer' : 'not-allowed', fontSize: '15px' }}>Post</motion.button>
            </div>
          </div>
        </div>
      </div>
      {allTweets.map(t => <TweetCard key={t.id} tweet={t} />)}
    </div>
  );

  // ── NOTIFICATIONS ──
  const NotificationsPage = () => (
    <div>
      <div style={{ position: 'sticky', top: '60px', backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #2f3336', zIndex: 10 }}>
        <div style={{ display: 'flex' }}>
          {['All', 'Verified', 'Mentions'].map((tab, i) => (
            <button key={tab} style={{ flex: 1, padding: '16px', background: 'none', border: 'none', borderBottom: i === 0 ? '2px solid #1d9bf0' : '2px solid transparent', cursor: 'pointer', color: i === 0 ? '#e7e9ea' : '#71767b', fontWeight: i === 0 ? '700' : '400', fontSize: '15px' }}>{tab}</button>
          ))}
        </div>
      </div>
      {NOTIFS.map((n, i) => (
        <div key={i} style={{ padding: '16px', borderBottom: '1px solid #2f3336', display: 'flex', gap: '12px', cursor: 'pointer' }}>
          <div style={{ fontSize: '20px', width: '40px', textAlign: 'center', flexShrink: 0 }}>{n.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#333', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}>{n.user[0].toUpperCase()}</div>
            <div style={{ fontSize: '15px' }}><span style={{ fontWeight: '700' }}>{n.user}</span> {n.text}</div>
            {n.preview && <div style={{ fontSize: '15px', color: '#71767b', marginTop: '4px' }}>{n.preview}</div>}
            <div style={{ fontSize: '13px', color: '#71767b', marginTop: '4px' }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );

  // ── BOOKMARKS ──
  const BookmarksPage = () => (
    <div>
      <div style={{ padding: '16px', borderBottom: '1px solid #2f3336' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Bookmarks</h2>
        <div style={{ color: '#71767b', fontSize: '14px' }}>@pobapet_official</div>
      </div>
      {allTweets.filter(t => bookmarked.includes(t.id)).map(t => <TweetCard key={t.id} tweet={t} />)}
      {allTweets.filter(t => bookmarked.includes(t.id)).length === 0 && (
        <div style={{ padding: '40px', textAlign: 'center', color: '#71767b' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔖</div>
          <p>No bookmarks yet</p>
        </div>
      )}
    </div>
  );

  // ── MESSAGES ──
  const MessagesPage = () => (
    <div style={{ display: 'flex', height: 'calc(100vh - 120px)' }}>
      <div style={{ width: '100%', maxWidth: openDM ? '320px' : '100%', borderRight: openDM ? '1px solid #2f3336' : 'none', flexShrink: 0, overflowY: 'auto' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #2f3336', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Messages</h2>
          <span style={{ fontSize: '20px', cursor: 'pointer' }}>✏️</span>
        </div>
        {DMS.map((dm, i) => (
          <div key={i} onClick={() => setOpenDM(dm)} style={{ padding: '16px', borderBottom: '1px solid #2f3336', display: 'flex', gap: '12px', cursor: 'pointer', backgroundColor: openDM?.user === dm.user ? '#16181c' : 'transparent' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '18px', flexShrink: 0 }}>{dm.user[0].toUpperCase()}</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontWeight: dm.unread ? '700' : '400', fontSize: '15px' }}>{dm.user}</div>
              <div style={{ fontSize: '14px', color: '#71767b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dm.msg}</div>
            </div>
            <div style={{ fontSize: '13px', color: '#71767b', flexShrink: 0 }}>{dm.time}</div>
          </div>
        ))}
      </div>
      {openDM && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #2f3336', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>{openDM.user[0].toUpperCase()}</div>
            <span style={{ fontWeight: '700', fontSize: '16px' }}>{openDM.user}</span>
            <button onClick={() => setOpenDM(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#71767b', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
          </div>
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ alignSelf: 'flex-start', backgroundColor: '#2f3336', borderRadius: '18px', padding: '10px 16px', fontSize: '15px', maxWidth: '70%', color: '#e7e9ea' }}>{openDM.msg}</div>
            {(dmMessages[openDM.user] || []).map((m, i) => (
              <div key={i} style={{ alignSelf: m.from === 'you' ? 'flex-end' : 'flex-start', backgroundColor: m.from === 'you' ? '#1d9bf0' : '#2f3336', borderRadius: '18px', padding: '10px 16px', fontSize: '15px', maxWidth: '70%', color: '#fff' }}>{m.text}</div>
            ))}
          </div>
          <div style={{ padding: '12px 16px', borderTop: '1px solid #2f3336', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input value={dmText} onChange={e => setDmText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendDM()} placeholder="Start a new message" style={{ flex: 1, backgroundColor: '#2f3336', border: 'none', borderRadius: '20px', padding: '10px 16px', color: '#e7e9ea', fontSize: '15px', outline: 'none', fontFamily: 'inherit' }} />
            {dmText && <button onClick={sendDM} style={{ background: 'none', border: 'none', color: '#1d9bf0', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>Send</button>}
          </div>
        </div>
      )}
    </div>
  );

  // ── FOLLOWING / FOLLOWERS ──
  const PeoplePage = ({ title }) => (
    <div>
      <div style={{ padding: '16px', borderBottom: '1px solid #2f3336', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => setPage('profile')} style={{ background: 'none', border: 'none', color: '#e7e9ea', cursor: 'pointer', fontSize: '1.2rem' }}>←</button>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>{PROFILE.name}</h2>
          <div style={{ color: '#71767b', fontSize: '13px' }}>{PROFILE.username}</div>
        </div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid #2f3336' }}>
        {['Following', 'Followers'].map((tab, i) => (
          <button key={tab} onClick={() => setPage(tab.toLowerCase())} style={{ flex: 1, padding: '16px', background: 'none', border: 'none', borderBottom: title === tab ? '2px solid #1d9bf0' : '2px solid transparent', cursor: 'pointer', color: title === tab ? '#e7e9ea' : '#71767b', fontWeight: title === tab ? '700' : '400', fontSize: '15px' }}>{tab}</button>
        ))}
      </div>
      {FOLLOWING_LIST.map((person, i) => (
        <div key={i} style={{ padding: '16px', borderBottom: '1px solid #2f3336', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '18px', flexShrink: 0 }}>{person.name[0]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '4px' }}>{person.name} {person.verified && <span style={{ color: '#1d9bf0', fontSize: '13px' }}>✓</span>}</div>
            <div style={{ color: '#71767b', fontSize: '14px', marginBottom: '4px' }}>{person.user}</div>
            <div style={{ fontSize: '14px' }}>{person.bio}</div>
          </div>
          <button style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #536471', background: 'transparent', color: '#e7e9ea', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}>Following</button>
        </div>
      ))}
    </div>
  );

  // ── TWEET DETAIL ──
  const TweetDetail = ({ tweet }) => (
    <div>
      <div style={{ padding: '16px', borderBottom: '1px solid #2f3336', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => setOpenTweet(null)} style={{ background: 'none', border: 'none', color: '#e7e9ea', cursor: 'pointer', fontSize: '1.3rem' }}>←</button>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Post</h2>
      </div>
      <div style={{ padding: '16px', borderBottom: '1px solid #2f3336' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div onClick={() => { setOpenTweet(null); setPage('profile'); }} style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#EADDCA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#4A3728', cursor: 'pointer', fontSize: '18px' }}>P</div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '4px' }}>POBA PETs {PROFILE.verified && <span style={{ color: '#1d9bf0' }}>✓</span>}</div>
            <div style={{ color: '#71767b', fontSize: '14px' }}>@pobapet_official</div>
          </div>
        </div>
        <p style={{ fontSize: '20px', lineHeight: '1.5', margin: '0 0 16px 0', whiteSpace: 'pre-wrap' }}>{tweet.text}</p>
        {tweet.img && <img src={tweet.img} alt="" style={{ width: '100%', borderRadius: '12px', marginBottom: '16px', border: '1px solid #2f3336' }} />}
        <div style={{ color: '#71767b', fontSize: '15px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #2f3336' }}>{tweet.time} · pobapet.com · <span style={{ color: '#1d9bf0' }}>Twitter for iPhone</span></div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '15px', paddingBottom: '16px', borderBottom: '1px solid #2f3336' }}>
          <span><strong>{(tweet.retweets || 0) + (retweeted.includes(tweet.id) ? 1 : 0)}</strong> <span style={{ color: '#71767b' }}>Retweets</span></span>
          <span><strong>{tweet.bookmarks || 0}</strong> <span style={{ color: '#71767b' }}>Bookmarks</span></span>
          <span><strong>{(tweet.likes || 0) + (likedTweets.includes(tweet.id) ? 1 : 0)}</strong> <span style={{ color: '#71767b' }}>Likes</span></span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '4px', paddingBottom: '4px', borderBottom: '1px solid #2f3336' }}>
          <motion.button whileTap={{ scale: 1.3 }} onClick={() => setReplyingTo(replyingTo === tweet.id ? null : tweet.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71767b', fontSize: '20px', padding: '8px' }}>💬</motion.button>
          <motion.button whileTap={{ scale: 1.3 }} onClick={() => toggleRetweet(tweet.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: retweeted.includes(tweet.id) ? '#00ba7c' : '#71767b', fontSize: '20px', padding: '8px' }}>🔁</motion.button>
          <motion.button whileTap={{ scale: 1.3 }} onClick={() => toggleLike(tweet.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: '8px' }}>{likedTweets.includes(tweet.id) ? '❤️' : '🤍'}</motion.button>
          <motion.button whileTap={{ scale: 1.3 }} onClick={() => toggleBookmark(tweet.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: bookmarked.includes(tweet.id) ? '#1d9bf0' : '#71767b', fontSize: '20px', padding: '8px' }}>🔖</motion.button>
        </div>
      </div>
      {/* Comments */}
      {(replies[tweet.id] || []).map((r, i) => (
        <div key={i} style={{ padding: '16px', borderBottom: '1px solid #2f3336', display: 'flex', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', flexShrink: 0 }}>Y</div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '4px' }}>you <span style={{ color: '#71767b', fontWeight: '400' }}>@you</span></div>
            <p style={{ margin: 0, fontSize: '15px' }}>{r.text}</p>
          </div>
        </div>
      ))}
      {/* Reply box */}
      <div style={{ padding: '16px', borderBottom: '1px solid #2f3336', display: 'flex', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', flexShrink: 0 }}>Y</div>
        <div style={{ flex: 1 }}>
          <input value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => e.key === 'Enter' && postReply(tweet.id)} placeholder="Post your reply..." style={{ width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#e7e9ea', fontSize: '17px', fontFamily: 'inherit', marginBottom: '8px', boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => postReply(tweet.id)} style={{ backgroundColor: '#1d9bf0', color: '#fff', border: 'none', borderRadius: '20px', padding: '8px 20px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>Reply</motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    if (openTweet) return <TweetDetail tweet={openTweet} />;
    switch (page) {
      case 'profile': return <ProfilePage />;
      case 'home': return <HomeFeed />;
      case 'notifications': return <NotificationsPage />;
      case 'bookmarks': return <BookmarksPage />;
      case 'messages': return <MessagesPage />;
      case 'following': return <PeoplePage title="Following" />;
      case 'followers': return <PeoplePage title="Followers" />;
      default: return <ProfilePage />;
    }
  };

  const NAV = [
    { id: 'home', icon: '🏠' },
    { id: 'notifications', icon: '🔔' },
    { id: 'messages', icon: '✉️' },
    { id: 'bookmarks', icon: '🔖' },
    { id: 'profile', icon: '👤' },
  ];

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', color: '#e7e9ea', display: 'flex', flexDirection: 'column' }}>
      {/* TOP BAR */}
      <div style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #2f3336', zIndex: 100, height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', boxSizing: 'border-box' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e7e9ea', fontSize: '1.4rem', padding: '4px' }}>←</button>
        <div style={{ fontWeight: '900', fontSize: '1.5rem' }}>𝕏</div>
        <div style={{ width: '32px' }} />
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, maxWidth: '600px', width: '100%', margin: '0 auto', borderLeft: '1px solid #2f3336', borderRight: '1px solid #2f3336', paddingBottom: '70px', boxSizing: 'border-box' }}>
        <AnimatePresence mode="wait">
          <motion.div key={openTweet ? 'tweet-detail' : page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#000', borderTop: '1px solid #2f3336', display: 'flex', justifyContent: 'space-around', padding: '10px 0', zIndex: 100 }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => { setOpenTweet(null); setPage(n.id); }} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '6px 16px', opacity: page === n.id && !openTweet ? 1 : 0.5, transition: 'opacity 0.2s' }}>{n.icon}</button>
        ))}
      </div>
    </div>
  );
};

export default TwitterPage;