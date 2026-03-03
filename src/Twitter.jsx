import React, { useState, useRef, useEffect } from 'react';

// ─── X/Twitter exact tokens ─────────────────────────────────────────────
const X = {
  bg: '#000000',
  surface: '#16181c',
  border: '#2f3336',
  text: '#e7e9ea',
  textSub: '#71767b',
  blue: '#1d9bf0',
  blueHover: '#1a8cd8',
  green: '#00ba7c',
  pink: '#f91880',
  orange: '#ff7043',
  yellow: '#ffd400',
  pill: 'rgba(29,155,240,0.1)',
  hover: 'rgba(255,255,255,0.03)',
  hoverBlue: 'rgba(29,155,240,0.1)',
  hoverGreen: 'rgba(0,186,124,0.1)',
  hoverPink: 'rgba(249,24,128,0.1)',
  hoverOrange: 'rgba(255,112,67,0.1)',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

// ─── SVG ICONS (exact X/Twitter icons) ──────────────────────────────────
const Ico = {
  Home: ({filled}) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill={filled ? X.text : 'none'} stroke={X.text} strokeWidth={filled ? 0 : 2}>
      {filled
        ? <path d="M12 1.696L.622 8.807l1.04 1.696L3 9.708V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.708l1.338.795 1.04-1.696L12 1.696zM12 16.5c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/>
        : <><path d="M12 1.696L.622 8.807l1.04 1.696L3 9.708V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.708l1.338.795 1.04-1.696L12 1.696zM5 19.5V8.513l7-4.158 7 4.158V19.5h-4v-5H9v5H5z"/></>
      }
    </svg>
  ),
  Explore: () => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={X.text} strokeWidth="2">
      <circle cx="10.5" cy="10.5" r="7.5"/>
      <line x1="16.5" y1="16.5" x2="22" y2="22"/>
    </svg>
  ),
  Bell: ({filled}) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill={filled ? X.text : 'none'} stroke={X.text} strokeWidth="2">
      {filled
        ? <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.484 3.017-7.997 7.042L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.103 0-2-.897-2-2h4c0 1.103-.897 2-2 2z"/>
        : <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.484 3.017-7.997 7.042L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.103 0-2-.897-2-2h4c0 1.103-.897 2-2 2zm-6.866-4l.847-6.698C6.456 6.219 8.953 4 11.996 4s5.54 2.219 6.015 5.302L18.864 16H5.134z"/>
      }
    </svg>
  ),
  Mail: ({filled}) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill={filled ? X.text : 'none'} stroke={X.text} strokeWidth="2">
      {filled
        ? <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.638V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-7.5 3.41-7.5-3.41V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"/>
        : <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.638V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-7.5 3.41-7.5-3.41V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"/>
      }
    </svg>
  ),
  Bookmark: ({filled}) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill={filled ? X.text : 'none'} stroke={X.text} strokeWidth="2">
      <path d={filled ? "M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z" : "M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zm2.5-1c-.276 0-.5.22-.5.5v15.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"}/>
    </svg>
  ),
  Profile: ({filled}) => (
    <svg viewBox="0 0 24 24" width="26" height="26" fill={filled ? X.text : 'none'} stroke={X.text} strokeWidth="2">
      {filled
        ? <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zm0 6c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
        : <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zm0 6c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
      }
    </svg>
  ),
  Reply: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z"/>
    </svg>
  ),
  Repost: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/>
    </svg>
  ),
  Like: ({filled}) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={filled ? X.pink : 'none'} stroke="currentColor" strokeWidth="1.8">
      <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/>
    </svg>
  ),
  BookmarkSmall: ({filled}) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={filled ? X.blue : 'none'} stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"/>
    </svg>
  ),
  Share: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
    </svg>
  ),
  More: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
    </svg>
  ),
  MoreV: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={X.textSub}>
      <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
    </svg>
  ),
  XLogo: () => (
    <svg viewBox="0 0 24 24" width="30" height="30" fill={X.text}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Back: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={X.text}>
      <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"/>
    </svg>
  ),
  Verified: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={X.blue}>
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/>
    </svg>
  ),
  Image: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={X.blue}>
      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"/>
    </svg>
  ),
  Gif: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={X.blue}>
      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v13c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-13c0-.276-.224-.5-.5-.5h-13zM7 11h2v5H7v-5zm4-3h2v8h-2V8zm4 3h2v2h-2v-2z"/>
    </svg>
  ),
  Poll: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={X.blue}>
      <path d="M3 3h18v2H3V3zm0 7h10v2H3v-2zm0 7h14v2H3v-2z"/>
    </svg>
  ),
  Emoji: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={X.blue}>
      <path d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 0c0-1.381.672-2.5 1.5-2.5s1.5 1.119 1.5 2.5-.672 2.5-1.5 2.5-1.5-1.119-1.5-2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633C7.179 14.805 8.605 18 12 18s4.821-3.195 4.948-3.683l-1.897-.633C14.919 14.17 14.111 16 12 16zm0-14C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill={X.blue}>
      <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37C12.879 21.616 20.5 16.467 20.5 10.5 20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"/>
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill={X.textSub}>
      <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.815 5.262l4.276 4.277-1.414 1.414-4.277-4.276c-1.447 1.133-3.276 1.815-5.27 1.815-4.694 0-8.5-3.806-8.5-8.5z"/>
    </svg>
  ),
};

// ─── DATA ─────────────────────────────────────────────────────────────────
const PROFILE = {
  name: 'POBA PETs',
  username: 'pobapet_official',
  bio: '🐾 Mumbai\'s favourite pet adoption centre | 500+ happy adoptions | DM to adopt | pobapet.com',
  location: 'Mumbai, Maharashtra',
  website: 'pobapet.com',
  joined: 'March 2019',
  following: 210,
  followers: 1143,
  verified: true,
};

const TWEETS = [
  { id: 1, text: '🐾 Big news! We just welcomed 8 new dogs to POBA this week. Labradors, Beagles, and a very fluffy Pomeranian. Come meet them this Saturday!\n\n#AdoptDontShop #Mumbai', time: '2h', likes: 312, retweets: 87, replies: 24, img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80', bookmarks: 45, views: 18400 },
  { id: 2, text: 'Luna the Siamese has been waiting 3 months for a home 🐱 She loves window seats and pretending she does not need you (she does). DM us to adopt her!\n\n#cat #siamese #adoptdontshop', time: '5h', likes: 541, retweets: 210, replies: 67, img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80', bookmarks: 89, views: 42100 },
  { id: 3, text: 'PSA: Rabbits are NOT low-maintenance pets. They need space, social time, and veggies daily. Before you adopt — read our care guide at pobapet.com/care 🐰\n\n#PetCare #RabbitTips', time: '1d', likes: 893, retweets: 445, replies: 112, img: null, bookmarks: 231, views: 76200 },
  { id: 4, text: 'Bruno the Rottweiler officially has a family ❤️ After 4 months with us, this gentle giant found his people. We cannot stop crying.\n\nThank you Mumbai 🙏\n\n#Adopted #HappyEnding', time: '2d', likes: 2840, retweets: 1203, replies: 347, img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80', bookmarks: 567, views: 198000 },
  { id: 5, text: 'Rio the Macaw has been learning new words 🦜 His vocabulary: hello, poba, treats, no (he refuses to use it), and something that sounds like "mama"\n\nSend help 😂', time: '4d', likes: 1540, retweets: 672, replies: 289, img: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&q=80', bookmarks: 112, views: 87300 },
];

const NOTIFS = [
  { type: 'like', users: ['aarav_k', 'meow_mumbai', 'petlover22'], text: 'liked your post', preview: '🐾 Big news! We just welcomed 8 new dogs...', time: '2m', icon: X.pink, emoji: '❤️' },
  { type: 'repost', users: ['meow_india'], text: 'reposted your post', preview: 'Luna the Siamese has been waiting...', time: '15m', icon: X.green, emoji: '🔁' },
  { type: 'follow', users: ['delhi_petlover'], text: 'followed you', preview: null, time: '1h', icon: X.blue, emoji: '👤' },
  { type: 'reply', users: ['pooja.patel'], text: 'replied to your post', preview: 'This is so wholesome 😭❤️', time: '2h', icon: X.blue, emoji: '💬' },
  { type: 'like', users: ['bangalore_dogs', 'peta_india'], text: 'liked your post', preview: 'Bruno the Rottweiler officially...', time: '3h', icon: X.pink, emoji: '❤️' },
  { type: 'mention', users: ['neha__'], text: 'mentioned you', preview: 'Hey @pobapet_official when is your next adoption drive?', time: '5h', icon: X.blue, emoji: '@' },
];

const DMS = [
  { user: 'Aarav Kumar', handle: 'aarav_k', msg: 'Hi! Is Luna still available for adoption?', time: '2m', unread: true, online: true },
  { user: 'Pooja Patel', handle: 'pooja.patel', msg: 'We would love to adopt Bruno!! When can we visit?', time: '1h', unread: true, online: false },
  { user: 'Delhi Pet Lover', handle: 'delhi_petlover', msg: 'What are your visiting hours this weekend?', time: '3h', unread: false, online: false },
];

const FOLLOWING_LIST = [
  { name: 'PETA India', handle: 'petaindia', bio: 'Animal rights for every creature 🐾', verified: false, followers: '142K' },
  { name: 'Blue Cross India', handle: 'bluecrossindia', bio: 'Protecting animals since 1959', verified: true, followers: '89.4K' },
  { name: 'WWF India', handle: 'wwfindia', bio: 'Conservation of nature and wildlife', verified: true, followers: '312K' },
  { name: 'Friendicoes SECA', handle: 'friendicoes', bio: 'Animal shelter, Delhi since 1979 🐕', verified: false, followers: '12.1K' },
];

const TRENDING = [
  { category: 'Trending in India', topic: '#AdoptDontShop', posts: '42.5K posts' },
  { category: 'Animal Welfare', topic: '#MumbaiPets', posts: '8,291 posts' },
  { category: 'Trending in Maharashtra', topic: 'POBA PETs', posts: '3.1K posts' },
  { category: 'Animals · Trending', topic: '#RescueDogs', posts: '18.4K posts' },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────
const fmtNum = n => {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return n.toString();
};

// ─── ICON BUTTON ─────────────────────────────────────────────────────────
const IconBtn = ({ children, label, count, active, activeColor, hoverBg, onClick, size = 38 }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={e => { e.stopPropagation(); onClick && onClick(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 4,
        background: 'none', border: 'none', cursor: 'pointer',
        color: active ? activeColor : (hov ? activeColor || X.blue : X.textSub),
        fontSize: 13, fontFamily: X.font, padding: 0,
        transition: 'color 0.1s',
      }}
    >
      <div style={{
        width: size, height: size, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: hov ? (hoverBg || X.hoverBlue) : 'transparent',
        transition: 'background 0.1s',
      }}>
        {children}
      </div>
      {count !== undefined && count !== null && (
        <span style={{ fontVariantNumeric: 'tabular-nums', fontSize: 13 }}>{count > 0 ? fmtNum(count) : ''}</span>
      )}
    </button>
  );
};

// ─── POST BUTTON (like/repost/bookmark) ───────────────────────────────────
const PostAction = ({ icon, activeIcon, count, active, activeColor, hoverBg, onClick }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={e => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
        cursor: 'pointer', color: active ? activeColor : (hov ? activeColor : X.textSub),
        padding: 0, fontFamily: X.font, fontSize: 13, transition: 'color 0.15s',
      }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: hov ? hoverBg : 'transparent', transition: 'background 0.15s',
      }}>
        {active && activeIcon ? activeIcon : icon}
      </div>
      {count > 0 && <span>{fmtNum(count)}</span>}
    </button>
  );
};

// ─── AVATAR ──────────────────────────────────────────────────────────────
const Av = ({ char, size = 40, bg = '#EADDCA', color = '#4A3728', style = {}, onClick }) => (
  <div onClick={onClick} style={{
    width: size, height: size, borderRadius: '50%', backgroundColor: bg,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color, fontWeight: 700, fontSize: Math.floor(size * 0.36),
    flexShrink: 0, cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none', ...style,
  }}>{char}</div>
);

// ─── TWEET CARD ──────────────────────────────────────────────────────────
const TweetCard = ({ tweet, onProfile, onOpen, userLiked, userReposted, userBookmarked, onLike, onRepost, onBookmark, showThread }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [localReplies, setLocalReplies] = useState([]);
  const [moreMenu, setMoreMenu] = useState(false);

  const doReply = () => {
    if (!replyText.trim()) return;
    setLocalReplies(r => [...r, replyText]);
    setReplyText('');
    setReplyOpen(false);
  };

  return (
    <article
      onClick={() => onOpen && onOpen(tweet)}
      style={{
        padding: '12px 16px', borderBottom: `1px solid ${X.border}`,
        display: 'flex', gap: 12, cursor: 'pointer',
        backgroundColor: X.bg,
        transition: 'background 0.1s',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = X.bg}
    >
      {/* Thread line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        <Av char="P" size={40} onClick={e => { e.stopPropagation(); onProfile && onProfile(); }} />
        {showThread && <div style={{ flex: 1, width: 2, backgroundColor: X.border, marginTop: 4 }} />}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            <span
              onClick={e => { e.stopPropagation(); onProfile && onProfile(); }}
              style={{ fontWeight: 700, fontSize: 15, color: X.text, cursor: 'pointer' }}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
            >POBA PETs</span>
            <Ico.Verified />
            <span style={{ color: X.textSub, fontSize: 15 }}>@pobapet_official</span>
            <span style={{ color: X.textSub, fontSize: 15 }}>·</span>
            <span style={{ color: X.textSub, fontSize: 15 }}
              onMouseEnter={e => e.target.style.textDecoration = 'underline'}
              onMouseLeave={e => e.target.style.textDecoration = 'none'}
              style={{ cursor: 'pointer', color: X.textSub, fontSize: 15 }}
            >{tweet.time}</span>
          </div>
          <div style={{ position: 'relative' }}>
            <button
              onClick={e => { e.stopPropagation(); setMoreMenu(m => !m); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: X.textSub, padding: 4, borderRadius: '50%', display: 'flex', lineHeight: 1 }}
            ><Ico.More /></button>
            {moreMenu && (
              <div onClick={e => e.stopPropagation()} style={{
                position: 'absolute', right: 0, top: 28, zIndex: 100,
                backgroundColor: X.bg, border: `1px solid ${X.border}`, borderRadius: 16,
                boxShadow: '0 0 15px rgba(255,255,255,0.1)', minWidth: 200,
              }}>
                {['Not interested in this post', 'Follow @pobapet_official', 'Add/remove from Lists', 'Mute @pobapet_official', 'Block @pobapet_official', 'Report post'].map((item, i) => (
                  <div key={i} onClick={() => setMoreMenu(false)} style={{
                    padding: '12px 16px', cursor: 'pointer', fontSize: 15,
                    color: i >= 4 ? X.pink : X.text, fontWeight: i === 0 || i >= 4 ? 700 : 400,
                  }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >{item}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Text */}
        <div style={{ fontSize: 15, lineHeight: 1.5, color: X.text, whiteSpace: 'pre-wrap', marginBottom: 8 }}>
          {tweet.text}
        </div>

        {/* Image */}
        {tweet.img && (
          <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 12, border: `1px solid ${X.border}`, maxHeight: 340 }} onClick={e => e.stopPropagation()}>
            <img src={tweet.img} alt="" style={{ width: '100%', objectFit: 'cover', maxHeight: 340, display: 'block' }} />
          </div>
        )}

        {/* Local replies */}
        {localReplies.map((r, i) => (
          <div key={i} style={{ fontSize: 14, color: X.textSub, marginBottom: 4 }}>
            <span style={{ color: X.blue, fontWeight: 600 }}>@you: </span>{r}
          </div>
        ))}

        {/* Actions row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 460, marginTop: 4 }} onClick={e => e.stopPropagation()}>
          <PostAction
            icon={<Ico.Reply />}
            count={tweet.replies + localReplies.length}
            active={replyOpen}
            activeColor={X.blue}
            hoverBg={X.hoverBlue}
            onClick={() => setReplyOpen(r => !r)}
          />
          <PostAction
            icon={<Ico.Repost />}
            activeIcon={<Ico.Repost />}
            count={tweet.retweets + (userReposted ? 1 : 0)}
            active={userReposted}
            activeColor={X.green}
            hoverBg={X.hoverGreen}
            onClick={onRepost}
          />
          <PostAction
            icon={<Ico.Like filled={false} />}
            activeIcon={<Ico.Like filled={true} />}
            count={tweet.likes + (userLiked ? 1 : 0)}
            active={userLiked}
            activeColor={X.pink}
            hoverBg={X.hoverPink}
            onClick={onLike}
          />
          <PostAction
            icon={<Ico.BookmarkSmall filled={false} />}
            activeIcon={<Ico.BookmarkSmall filled={true} />}
            count={tweet.bookmarks + (userBookmarked ? 1 : 0)}
            active={userBookmarked}
            activeColor={X.blue}
            hoverBg={X.hoverBlue}
            onClick={onBookmark}
          />
          <PostAction
            icon={<Ico.Share />}
            activeColor={X.blue}
            hoverBg={X.hoverBlue}
            onClick={() => {}}
          />
        </div>

        {/* Reply box */}
        {replyOpen && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }} onClick={e => e.stopPropagation()}>
            <Av char="Y" size={32} bg="#333" color="#fff" />
            <div style={{ flex: 1 }}>
              <input
                autoFocus
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doReply()}
                placeholder="Post your reply"
                style={{
                  width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none',
                  color: X.text, fontSize: 17, fontFamily: X.font, boxSizing: 'border-box',
                  marginBottom: 8, borderBottom: `1px solid ${X.border}`, paddingBottom: 8,
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={doReply}
                  disabled={!replyText.trim()}
                  style={{
                    backgroundColor: replyText.trim() ? X.blue : '#0e5f87',
                    color: '#fff', border: 'none', borderRadius: 20,
                    padding: '6px 16px', fontWeight: 700, cursor: replyText.trim() ? 'pointer' : 'not-allowed',
                    fontSize: 14, fontFamily: X.font,
                  }}
                >Reply</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

// ─── COMPOSE BOX ─────────────────────────────────────────────────────────
const ComposeBox = ({ onPost, placeholder = "What is happening?!" }) => {
  const [text, setText] = useState('');
  const pct = text.length / 280;
  const remaining = 280 - text.length;
  const circumference = 2 * Math.PI * 9;
  const offset = circumference * (1 - pct);

  return (
    <div style={{ padding: '12px 16px', borderBottom: `1px solid ${X.border}`, display: 'flex', gap: 12 }}>
      <Av char="Y" size={40} bg="#333" color="#fff" />
      <div style={{ flex: 1 }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value.slice(0, 280))}
          placeholder={placeholder}
          style={{
            width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none',
            color: X.text, fontSize: 20, resize: 'none', fontFamily: X.font,
            minHeight: 60, boxSizing: 'border-box', lineHeight: 1.5,
          }}
        />
        {/* Audience selector */}
        {text && (
          <div style={{ marginBottom: 8 }}>
            <button style={{ color: X.blue, fontWeight: 700, fontSize: 14, background: 'none', border: `1px solid ${X.blue}`, borderRadius: 20, padding: '2px 12px', cursor: 'pointer' }}>🌍 Everyone can reply</button>
          </div>
        )}
        <div style={{ borderTop: `1px solid ${X.border}`, paddingTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 0 }}>
            {[<Ico.Image/>, <Ico.Gif/>, <Ico.Poll/>, <Ico.Emoji/>, <Ico.Location/>].map((icon, i) => (
              <IconBtn key={i} hoverBg={X.hoverBlue} onClick={() => {}}>{icon}</IconBtn>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {text.length > 0 && (
              <>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="9" fill="none" stroke={X.border} strokeWidth="2"/>
                  <circle cx="10" cy="10" r="9" fill="none"
                    stroke={remaining <= 20 ? (remaining <= 0 ? X.pink : X.yellow) : X.blue}
                    strokeWidth="2" strokeDasharray={circumference}
                    strokeDashoffset={offset} strokeLinecap="round"
                    transform="rotate(-90 10 10)"
                  />
                  {remaining <= 20 && <text x="10" y="14" textAnchor="middle" fill={remaining <= 0 ? X.pink : X.textSub} fontSize="8">{remaining}</text>}
                </svg>
                <div style={{ width: 1, height: 24, backgroundColor: X.border }} />
              </>
            )}
            <button
              onClick={() => { if (text.trim()) { onPost(text); setText(''); }}}
              disabled={!text.trim()}
              style={{
                backgroundColor: text.trim() ? X.blue : '#0e5f87',
                color: '#fff', border: 'none', borderRadius: 20,
                padding: '8px 20px', fontWeight: 700, cursor: text.trim() ? 'pointer' : 'not-allowed',
                fontSize: 15, fontFamily: X.font,
              }}
            >Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── WHAT'S HAPPENING SIDEBAR ─────────────────────────────────────────────
const TrendingSidebar = ({ setPage }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {/* Search */}
    <div style={{ position: 'sticky', top: 0, paddingTop: 4, backgroundColor: X.bg }}>
      <div style={{ backgroundColor: X.surface, borderRadius: 50, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Ico.Search />
        <span style={{ fontSize: 15, color: X.textSub }}>Search</span>
      </div>
    </div>

    {/* Premium upsell */}
    <div style={{ backgroundColor: X.surface, borderRadius: 16, padding: 16 }}>
      <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8 }}>Subscribe to Premium</div>
      <div style={{ fontSize: 14, color: X.textSub, marginBottom: 12 }}>Subscribe to unlock new features and if eligible, receive a share of revenue.</div>
      <button style={{ backgroundColor: X.blue, color: '#fff', border: 'none', borderRadius: 20, padding: '8px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: X.font }}>Subscribe</button>
    </div>

    {/* What's happening */}
    <div style={{ backgroundColor: X.surface, borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', fontWeight: 800, fontSize: 20 }}>What's happening</div>
      {TRENDING.map((t, i) => (
        <div key={i} style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div>
            <div style={{ fontSize: 13, color: X.textSub }}>{t.category}</div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{t.topic}</div>
            <div style={{ fontSize: 13, color: X.textSub }}>{t.posts}</div>
          </div>
          <button style={{ background: 'none', border: 'none', color: X.textSub, cursor: 'pointer', padding: 4 }}><Ico.MoreV /></button>
        </div>
      ))}
      <div style={{ padding: '12px 16px', color: X.blue, cursor: 'pointer', fontSize: 15 }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >Show more</div>
    </div>

    {/* Who to follow */}
    <div style={{ backgroundColor: X.surface, borderRadius: 16, overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px', fontWeight: 800, fontSize: 20 }}>Who to follow</div>
      {FOLLOWING_LIST.slice(0, 3).map((p, i) => (
        <div key={i} style={{ padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <Av char={p.name[0]} size={40} bg="#333" color="#fff" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 4 }}>
              {p.name.length > 14 ? p.name.slice(0, 14) + '…' : p.name}
              {p.verified && <Ico.Verified />}
            </div>
            <div style={{ fontSize: 13, color: X.textSub }}>@{p.handle}</div>
          </div>
          <button style={{ backgroundColor: X.text, color: X.bg, border: 'none', borderRadius: 20, padding: '6px 16px', fontWeight: 700, cursor: 'pointer', fontSize: 14, flexShrink: 0 }}>Follow</button>
        </div>
      ))}
      <div style={{ padding: '12px 16px', color: X.blue, cursor: 'pointer', fontSize: 15 }}>Show more</div>
    </div>

    <div style={{ fontSize: 13, color: X.textSub, padding: '0 4px', lineHeight: 2 }}>
      {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility', 'Ads info', 'More'].map((t, i) => (
        <span key={i}><span style={{ cursor: 'pointer' }}>{t}</span>{i < 5 ? ' · ' : ''}</span>
      ))}
      <div>© 2025 X Corp.</div>
    </div>
  </div>
);

// ─── LEFT NAV ─────────────────────────────────────────────────────────────
const LeftNav = ({ page, setPage, onBack }) => {
  const items = [
    { id: 'home', label: 'Home', Icon: Ico.Home },
    { id: 'explore', label: 'Explore', Icon: Ico.Explore },
    { id: 'notifications', label: 'Notifications', Icon: Ico.Bell, badge: 3 },
    { id: 'messages', label: 'Messages', Icon: Ico.Mail, badge: 2 },
    { id: 'bookmarks', label: 'Bookmarks', Icon: Ico.Bookmark },
    { id: 'profile', label: 'Profile', Icon: Ico.Profile },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0 12px', gap: 4 }}>
      {/* Back */}
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '12px', borderRadius: '50%', display: 'flex', marginBottom: 4 }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <Ico.Back />
      </button>

      {/* X Logo */}
      <div style={{ padding: '12px', marginBottom: 8 }}>
        <Ico.XLogo />
      </div>

      {items.map(({ id, label, Icon, badge }) => {
        const active = page === id;
        return (
          <button
            key={id}
            onClick={() => setPage(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 20, padding: '12px',
              background: 'none', border: 'none', cursor: 'pointer',
              borderRadius: 50, color: X.text, fontFamily: X.font,
              fontSize: 20, fontWeight: active ? 700 : 400,
              position: 'relative', width: '100%', textAlign: 'left',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{ position: 'relative' }}>
              <Icon filled={active} />
              {badge && (
                <div style={{
                  position: 'absolute', top: -4, right: -4, backgroundColor: X.blue, color: '#fff',
                  borderRadius: '50%', width: 16, height: 16, fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{badge}</div>
              )}
            </div>
            <span>{label}</span>
          </button>
        );
      })}

      {/* Post button */}
      <button style={{
        backgroundColor: X.blue, color: '#fff', border: 'none', borderRadius: 50,
        padding: '14px 26px', fontWeight: 700, fontSize: 17, cursor: 'pointer',
        fontFamily: X.font, marginTop: 16, width: '90%',
      }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = X.blueHover}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = X.blue}
      >Post</button>

      {/* Profile mini card */}
      <div style={{ marginTop: 'auto', padding: '12px', borderRadius: 50, cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'center', width: '100%', boxSizing: 'border-box', marginTop: 16 }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <Av char="P" size={40} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, display: 'flex', alignItems: 'center', gap: 4 }}>POBA PETs <Ico.Verified /></div>
          <div style={{ fontSize: 13, color: X.textSub }}>@pobapet_official</div>
        </div>
        <span style={{ marginLeft: 'auto', color: X.textSub, fontSize: 18 }}>···</span>
      </div>
    </div>
  );
};

// ─── PAGES ────────────────────────────────────────────────────────────────
const HomePage = ({ tweets, setPage, likes, reposts, bookmarks, onLike, onRepost, onBookmark, onProfile, onOpen, onPost }) => (
  <div>
    <div style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 10, borderBottom: `1px solid ${X.border}` }}>
      <div style={{ display: 'flex' }}>
        {['For you', 'Following'].map((tab, i) => (
          <button key={tab} style={{
            flex: 1, padding: '16px', background: 'none', border: 'none', cursor: 'pointer',
            borderBottom: i === 0 ? `2px solid ${X.blue}` : '2px solid transparent',
            color: i === 0 ? X.text : X.textSub, fontWeight: i === 0 ? 700 : 400,
            fontSize: 15, fontFamily: X.font,
          }}>{tab}</button>
        ))}
      </div>
    </div>
    <ComposeBox onPost={onPost} />
    {tweets.map(t => (
      <TweetCard key={t.id} tweet={t} onProfile={onProfile} onOpen={onOpen}
        userLiked={likes.includes(t.id)} userReposted={reposts.includes(t.id)} userBookmarked={bookmarks.includes(t.id)}
        onLike={() => onLike(t.id)} onRepost={() => onRepost(t.id)} onBookmark={() => onBookmark(t.id)}
      />
    ))}
  </div>
);

const ProfilePage = ({ tweets, setPage, likes, reposts, bookmarks, onLike, onRepost, onBookmark, following, setFollowing }) => {
  const [tab, setTab] = useState('posts');
  return (
    <div>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ fontWeight: 700, fontSize: 20 }}>POBA PETs</span>
        <span style={{ color: X.textSub, fontSize: 13 }}>{fmtNum(TWEETS.length + tweets.filter(t=>t.isUser).length)} posts</span>
      </div>

      {/* Banner */}
      <div style={{ height: 200, background: 'linear-gradient(135deg, #EADDCA 0%, #c9a87c 50%, #8B6914 100%)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}>
          <span style={{ fontSize: 80 }}>🐾</span>
        </div>
      </div>

      <div style={{ padding: '0 16px 16px', borderBottom: `1px solid ${X.border}` }}>
        {/* Avatar + buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, marginTop: -20 }}>
          <Av char="P" size={80} style={{ border: `4px solid ${X.bg}` }} />
          <div style={{ display: 'flex', gap: 8, paddingTop: 24 }}>
            <button style={{ padding: '8px 12px', borderRadius: 20, border: `1px solid ${X.border}`, backgroundColor: 'transparent', color: X.text, fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: X.font }}>···</button>
            <button onClick={() => setPage('messages')} style={{ padding: '8px 16px', borderRadius: 20, border: `1px solid ${X.border}`, backgroundColor: 'transparent', color: X.text, fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: X.font }}>Message</button>
            <button
              onClick={() => setFollowing(f => !f)}
              style={{
                padding: '8px 20px', borderRadius: 20,
                border: following ? `1px solid ${X.border}` : 'none',
                backgroundColor: following ? 'transparent' : X.text,
                color: following ? X.text : X.bg,
                fontWeight: 700, cursor: 'pointer', fontSize: 14, fontFamily: X.font,
              }}
            >{following ? 'Following' : 'Follow'}</button>
          </div>
        </div>

        {/* Info */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <span style={{ fontWeight: 800, fontSize: 20 }}>{PROFILE.name}</span>
            <Ico.Verified />
          </div>
          <div style={{ color: X.textSub, fontSize: 15, marginBottom: 10 }}>@{PROFILE.username}</div>
          <p style={{ fontSize: 15, lineHeight: 1.5, margin: '0 0 12px' }}>{PROFILE.bio}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontSize: 15, color: X.textSub, marginBottom: 12 }}>
            <span>📍 {PROFILE.location}</span>
            <span style={{ color: X.blue }}>🔗 {PROFILE.website}</span>
            <span>📅 Joined {PROFILE.joined}</span>
          </div>
          <div style={{ display: 'flex', gap: 20, fontSize: 15 }}>
            <span onClick={() => setPage('following')} style={{ cursor: 'pointer' }}>
              <strong>{PROFILE.following}</strong> <span style={{ color: X.textSub }}>Following</span>
            </span>
            <span onClick={() => setPage('followers')} style={{ cursor: 'pointer' }}>
              <strong>{fmtNum(PROFILE.followers)}</strong> <span style={{ color: X.textSub }}>Followers</span>
            </span>
          </div>
        </div>

        {/* Follower avatars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: X.textSub }}>
          <div style={{ display: 'flex' }}>
            {['#e74c3c','#3498db','#27ae60'].map((c, i) => (
              <div key={i} style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: c, border: `2px solid ${X.bg}`, marginLeft: i ? -6 : 0 }} />
            ))}
          </div>
          <span>Followed by pooja.patel, aarav_k, and 23 others you know</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${X.border}`, position: 'sticky', top: 53, backgroundColor: X.bg, zIndex: 9 }}>
        {[['posts','Posts'],['replies','Replies'],['highlights','Highlights'],['media','Media'],['likes','Likes']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, padding: '16px 4px', background: 'none', border: 'none',
            borderBottom: tab === id ? `2px solid ${X.blue}` : '2px solid transparent',
            cursor: 'pointer', color: tab === id ? X.text : X.textSub,
            fontWeight: tab === id ? 700 : 400, fontSize: 15, fontFamily: X.font,
          }}>{label}</button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'posts' && [...tweets.filter(t => t.isUser), ...TWEETS].map(t => (
        <TweetCard key={t.id} tweet={t}
          userLiked={likes.includes(t.id)} userReposted={reposts.includes(t.id)} userBookmarked={bookmarks.includes(t.id)}
          onLike={() => onLike(t.id)} onRepost={() => onRepost(t.id)} onBookmark={() => onBookmark(t.id)}
          onProfile={() => {}}
        />
      ))}
      {tab === 'media' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, padding: 2 }}>
          {TWEETS.filter(t => t.img).map(t => (
            <div key={t.id} style={{ aspectRatio: '1/1', overflow: 'hidden', cursor: 'pointer' }}>
              <img src={t.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      )}
      {tab === 'likes' && TWEETS.slice(2).map(t => (
        <TweetCard key={t.id} tweet={t} userLiked={likes.includes(t.id)} userReposted={reposts.includes(t.id)} userBookmarked={bookmarks.includes(t.id)} onLike={() => onLike(t.id)} onRepost={() => onRepost(t.id)} onBookmark={() => onBookmark(t.id)} onProfile={() => {}} />
      ))}
      {(tab === 'replies' || tab === 'highlights') && (
        <div style={{ padding: 32, textAlign: 'center', color: X.textSub, fontSize: 15 }}>Nothing to show here yet.</div>
      )}
    </div>
  );
};

const NotificationsPage = () => (
  <div>
    <div style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${X.border}`, zIndex: 10 }}>
      <div style={{ padding: '16px', fontWeight: 800, fontSize: 20 }}>Notifications</div>
      <div style={{ display: 'flex' }}>
        {['All', 'Verified', 'Mentions'].map((t, i) => (
          <button key={t} style={{
            flex: 1, padding: '16px', background: 'none', border: 'none', cursor: 'pointer',
            borderBottom: i === 0 ? `2px solid ${X.blue}` : '2px solid transparent',
            color: i === 0 ? X.text : X.textSub, fontWeight: i === 0 ? 700 : 400, fontSize: 15,
          }}>{t}</button>
        ))}
      </div>
    </div>
    {NOTIFS.map((n, i) => (
      <div key={i} style={{ padding: '12px 16px', borderBottom: `1px solid ${X.border}`, display: 'flex', gap: 12, cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end', paddingTop: 4, fontSize: 20, flexShrink: 0 }}>{n.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {n.users.slice(0, 4).map((u, j) => (
              <Av key={j} char={u[0].toUpperCase()} size={32} bg="#333" color="#fff" />
            ))}
          </div>
          <div style={{ fontSize: 15, color: X.text }}>
            <strong>{n.users[0]}</strong>
            {n.users.length > 1 && <span style={{ color: X.textSub }}> and {n.users.length - 1} others</span>}
            <span style={{ color: X.textSub }}> {n.text}</span>
          </div>
          {n.preview && <div style={{ fontSize: 15, color: X.textSub, marginTop: 4 }}>{n.preview}</div>}
          <div style={{ fontSize: 13, color: X.textSub, marginTop: 4 }}>{n.time}</div>
        </div>
      </div>
    ))}
  </div>
);

const BookmarksPage = ({ tweets, bookmarks, onLike, onRepost, onBookmark, likes, reposts }) => (
  <div>
    <div style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${X.border}`, zIndex: 10, padding: 16 }}>
      <div style={{ fontWeight: 800, fontSize: 20 }}>Bookmarks</div>
      <div style={{ color: X.textSub, fontSize: 13 }}>@pobapet_official</div>
    </div>
    {tweets.filter(t => bookmarks.includes(t.id)).map(t => (
      <TweetCard key={t.id} tweet={t}
        userLiked={likes.includes(t.id)} userReposted={reposts.includes(t.id)} userBookmarked={bookmarks.includes(t.id)}
        onLike={() => onLike(t.id)} onRepost={() => onRepost(t.id)} onBookmark={() => onBookmark(t.id)} onProfile={() => {}}
      />
    ))}
    {tweets.filter(t => bookmarks.includes(t.id)).length === 0 && (
      <div style={{ padding: 40, textAlign: 'center', color: X.textSub }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔖</div>
        <div style={{ fontWeight: 800, fontSize: 28, color: X.text, marginBottom: 8 }}>Save posts for later</div>
        <div>Bookmark posts to easily find them again in the future.</div>
      </div>
    )}
  </div>
);

const MessagesPage = () => {
  const [openDM, setOpenDM] = useState(null);
  const [dmText, setDmText] = useState('');
  const [msgs, setMsgs] = useState({});
  const endRef = useRef(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [msgs, openDM]);

  const send = () => {
    if (!dmText.trim() || !openDM) return;
    setMsgs(p => ({ ...p, [openDM.handle]: [...(p[openDM.handle] || []), { from: 'you', text: dmText, time: 'now' }] }));
    setDmText('');
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 0px)', overflow: 'hidden' }}>
      {/* List */}
      <div style={{ width: openDM ? 320 : '100%', borderRight: `1px solid ${X.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px', borderBottom: `1px solid ${X.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}>
          <div style={{ fontWeight: 800, fontSize: 20 }}>Messages</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: X.blue }}>⚙️</button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: X.blue }}>✏️</button>
          </div>
        </div>
        {/* Search in messages */}
        <div style={{ padding: '8px 16px', borderBottom: `1px solid ${X.border}` }}>
          <div style={{ backgroundColor: X.surface, borderRadius: 50, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Ico.Search />
            <span style={{ fontSize: 15, color: X.textSub }}>Search Direct Messages</span>
          </div>
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {DMS.map((dm, i) => (
            <div key={i} onClick={() => setOpenDM(dm)} style={{
              padding: '12px 16px', display: 'flex', gap: 12, cursor: 'pointer',
              backgroundColor: openDM?.handle === dm.handle ? X.hover : 'transparent',
              borderBottom: `1px solid ${X.border}`,
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = openDM?.handle === dm.handle ? X.hover : 'transparent'}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Av char={dm.user[0]} size={48} bg="#333" color="#fff" />
                {dm.online && <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: X.green, border: `2px solid ${X.bg}`, position: 'absolute', bottom: 0, right: 0 }} />}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: dm.unread ? 700 : 400, fontSize: 15 }}>{dm.user}</span>
                  <span style={{ fontSize: 13, color: X.textSub }}>{dm.time}</span>
                </div>
                <div style={{ fontSize: 13, color: X.textSub }}>@{dm.handle}</div>
                <div style={{ fontSize: 14, color: dm.unread ? X.text : X.textSub, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: dm.unread ? 600 : 400 }}>{dm.msg}</div>
              </div>
              {dm.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: X.blue, flexShrink: 0, marginTop: 20 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      {openDM && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${X.border}`, display: 'flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', flexShrink: 0 }}>
            <Av char={openDM.user[0]} size={40} bg="#333" color="#fff" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{openDM.user}</div>
              <div style={{ fontSize: 13, color: X.textSub }}>@{openDM.handle}</div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: X.blue, fontSize: 20 }}>ℹ️</button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Info card */}
            <div style={{ textAlign: 'center', padding: '16px 0', borderBottom: `1px solid ${X.border}`, marginBottom: 8 }}>
              <Av char={openDM.user[0]} size={64} bg="#333" color="#fff" style={{ margin: '0 auto 8px' }} />
              <div style={{ fontWeight: 700, fontSize: 17 }}>{openDM.user}</div>
              <div style={{ color: X.textSub, fontSize: 14 }}>@{openDM.handle}</div>
              <div style={{ color: X.textSub, fontSize: 14, marginTop: 4 }}>No mutual followers · Joined recently</div>
            </div>

            {/* Initial message bubble */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
              <Av char={openDM.user[0]} size={32} bg="#333" color="#fff" />
              <div>
                <div style={{ backgroundColor: X.surface, borderRadius: '18px 18px 18px 4px', padding: '10px 16px', fontSize: 15, maxWidth: 340, color: X.text }}>{openDM.msg}</div>
                <div style={{ fontSize: 12, color: X.textSub, marginTop: 4 }}>{openDM.time}</div>
              </div>
            </div>

            {(msgs[openDM.handle] || []).map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'you' ? 'flex-end' : 'flex-start', gap: 8, alignItems: 'flex-end' }}>
                {m.from !== 'you' && <Av char={openDM.user[0]} size={32} bg="#333" color="#fff" />}
                <div>
                  <div style={{
                    borderRadius: m.from === 'you' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    padding: '10px 16px', fontSize: 15, maxWidth: 340,
                    backgroundColor: m.from === 'you' ? X.blue : X.surface,
                    color: '#fff',
                  }}>{m.text}</div>
                  <div style={{ fontSize: 12, color: X.textSub, marginTop: 4, textAlign: m.from === 'you' ? 'right' : 'left' }}>{m.time}</div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div style={{ padding: '12px 16px', borderTop: `1px solid ${X.border}`, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: X.surface, borderRadius: 50, padding: '6px 16px 6px 8px' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {[<Ico.Image/>, <Ico.Gif/>, <Ico.Emoji/>].map((ic, i) => (
                  <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: '50%', display: 'flex' }}>{ic}</button>
                ))}
              </div>
              <input
                value={dmText}
                onChange={e => setDmText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Start a new message"
                style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: X.text, fontSize: 15, fontFamily: X.font }}
              />
              {dmText && (
                <button onClick={send} style={{ background: 'none', border: 'none', cursor: 'pointer', color: X.blue, fontWeight: 700, fontSize: 15, padding: 4, flexShrink: 0 }}>➤</button>
              )}
            </div>
          </div>
        </div>
      )}

      {!openDM && (
        <div style={{ flex: 1, display: 'none' }} />
      )}
    </div>
  );
};

const ExplorePage = () => (
  <div>
    <div style={{ padding: '8px 16px', position: 'sticky', top: 0, backgroundColor: X.bg, zIndex: 10 }}>
      <div style={{ backgroundColor: X.surface, borderRadius: 50, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Ico.Search />
        <span style={{ fontSize: 15, color: X.textSub }}>Search X</span>
      </div>
    </div>
    <div style={{ display: 'flex', overflowX: 'auto', gap: 0, borderBottom: `1px solid ${X.border}`, padding: '0 16px' }}>
      {['For you', 'Trending', 'News', 'Sports', 'Entertainment'].map((t, i) => (
        <button key={t} style={{ padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: i === 0 ? 700 : 400, fontSize: 15, color: i === 0 ? X.text : X.textSub, borderBottom: i === 0 ? `2px solid ${X.blue}` : '2px solid transparent', whiteSpace: 'nowrap' }}>{t}</button>
      ))}
    </div>
    {TRENDING.map((t, i) => (
      <div key={i} style={{ padding: '12px 16px', borderBottom: `1px solid ${X.border}`, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <div>
          <div style={{ fontSize: 13, color: X.textSub }}>{t.category}</div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{t.topic}</div>
          <div style={{ fontSize: 13, color: X.textSub }}>{t.posts}</div>
        </div>
        <button style={{ background: 'none', border: 'none', color: X.textSub, cursor: 'pointer' }}><Ico.MoreV /></button>
      </div>
    ))}
  </div>
);

const PeoplePage = ({ title, setPage }) => (
  <div>
    <div style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${X.border}`, zIndex: 10 }}>
      <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => setPage('profile')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%' }}><Ico.Back /></button>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{PROFILE.name}</div>
          <div style={{ color: X.textSub, fontSize: 13 }}>@{PROFILE.username}</div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        {['Following', 'Followers'].map((tab, i) => (
          <button key={tab} onClick={() => setPage(tab.toLowerCase())} style={{
            flex: 1, padding: 16, background: 'none', border: 'none', cursor: 'pointer',
            borderBottom: title === tab ? `2px solid ${X.blue}` : '2px solid transparent',
            color: title === tab ? X.text : X.textSub, fontWeight: title === tab ? 700 : 400, fontSize: 15,
          }}>{tab}</button>
        ))}
      </div>
    </div>
    {FOLLOWING_LIST.map((p, i) => (
      <div key={i} style={{ padding: 16, borderBottom: `1px solid ${X.border}`, display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = X.hover}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        <Av char={p.name[0]} size={48} bg="#333" color="#fff" />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
            <span style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</span>
            {p.verified && <Ico.Verified />}
          </div>
          <div style={{ color: X.textSub, fontSize: 14, marginBottom: 4 }}>@{p.handle}</div>
          <div style={{ fontSize: 14 }}>{p.bio}</div>
          <div style={{ fontSize: 13, color: X.textSub, marginTop: 4 }}>{p.followers} followers</div>
        </div>
        <button style={{ padding: '6px 16px', borderRadius: 20, border: `1px solid ${X.border}`, backgroundColor: 'transparent', color: X.text, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Following</button>
      </div>
    ))}
  </div>
);

const TweetDetailPage = ({ tweet, likes, reposts, bookmarks, onLike, onRepost, onBookmark, onBack, onProfile }) => {
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);

  const doReply = () => {
    if (!replyText.trim()) return;
    setReplies(r => [...r, { user: 'You', handle: 'you', text: replyText, time: 'now', likes: 0 }]);
    setReplyText('');
  };

  return (
    <div>
      <div style={{ position: 'sticky', top: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${X.border}`, zIndex: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: '50%' }}><Ico.Back /></button>
        <span style={{ fontWeight: 800, fontSize: 20 }}>Post</span>
      </div>

      <div style={{ padding: 16, borderBottom: `1px solid ${X.border}` }}>
        {/* Author row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Av char="P" size={48} onClick={onProfile} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontWeight: 800, fontSize: 16 }}>{PROFILE.name}</span>
                <Ico.Verified />
              </div>
              <div style={{ color: X.textSub, fontSize: 15 }}>@{PROFILE.username}</div>
            </div>
          </div>
          <button style={{ backgroundColor: X.text, color: X.bg, border: 'none', borderRadius: 20, padding: '6px 16px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Follow</button>
        </div>

        {/* Text — large */}
        <p style={{ fontSize: 20, lineHeight: 1.6, margin: '0 0 16px', whiteSpace: 'pre-wrap', color: X.text }}>{tweet.text}</p>

        {/* Image */}
        {tweet.img && (
          <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 16, border: `1px solid ${X.border}` }}>
            <img src={tweet.img} alt="" style={{ width: '100%', display: 'block' }} />
          </div>
        )}

        {/* Timestamp & app */}
        <div style={{ color: X.textSub, fontSize: 15, marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${X.border}` }}>
          {tweet.time} · <span style={{ color: X.blue }}>X for iPhone</span>
          {' · '}<span style={{ color: X.blue }}>{fmtNum(tweet.views || 0)}</span> Views
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 20, fontSize: 15, paddingBottom: 16, borderBottom: `1px solid ${X.border}`, flexWrap: 'wrap' }}>
          {[
            [tweet.retweets + (reposts.includes(tweet.id) ? 1 : 0), 'Reposts'],
            [tweet.likes + (likes.includes(tweet.id) ? 1 : 0), 'Likes'],
            [tweet.bookmarks + (bookmarks.includes(tweet.id) ? 1 : 0), 'Bookmarks'],
          ].map(([n, label]) => (
            <span key={label}><strong>{fmtNum(n)}</strong> <span style={{ color: X.textSub }}>{label}</span></span>
          ))}
        </div>

        {/* Action row — large icons */}
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px 0', borderBottom: `1px solid ${X.border}` }}>
          <PostAction icon={<Ico.Reply />} activeColor={X.blue} hoverBg={X.hoverBlue} onClick={() => {}} />
          <PostAction icon={<Ico.Repost />} count={null} active={reposts.includes(tweet.id)} activeColor={X.green} hoverBg={X.hoverGreen} onClick={() => onRepost(tweet.id)} />
          <PostAction icon={<Ico.Like filled={false} />} activeIcon={<Ico.Like filled={true} />} active={likes.includes(tweet.id)} activeColor={X.pink} hoverBg={X.hoverPink} onClick={() => onLike(tweet.id)} />
          <PostAction icon={<Ico.BookmarkSmall filled={false} />} activeIcon={<Ico.BookmarkSmall filled={true} />} active={bookmarks.includes(tweet.id)} activeColor={X.blue} hoverBg={X.hoverBlue} onClick={() => onBookmark(tweet.id)} />
          <PostAction icon={<Ico.Share />} activeColor={X.blue} hoverBg={X.hoverBlue} onClick={() => {}} />
        </div>
      </div>

      {/* User replies */}
      {replies.map((r, i) => (
        <div key={i} style={{ padding: '12px 16px', borderBottom: `1px solid ${X.border}`, display: 'flex', gap: 12 }}>
          <Av char="Y" size={40} bg="#333" color="#fff" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>You</span>
              <span style={{ color: X.textSub, fontSize: 15 }}>@you · {r.time}</span>
            </div>
            <p style={{ margin: 0, fontSize: 15, color: X.text }}>{r.text}</p>
          </div>
        </div>
      ))}

      {/* Reply box */}
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${X.border}`, display: 'flex', gap: 12 }}>
        <Av char="Y" size={40} bg="#333" color="#fff" />
        <div style={{ flex: 1 }}>
          <div style={{ color: X.textSub, fontSize: 14, marginBottom: 8 }}>
            Replying to <span style={{ color: X.blue }}>@pobapet_official</span>
          </div>
          <textarea
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Post your reply"
            style={{ width: '100%', backgroundColor: 'transparent', border: 'none', outline: 'none', color: X.text, fontSize: 18, resize: 'none', fontFamily: X.font, minHeight: 60, boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: `1px solid ${X.border}` }}>
            <div style={{ display: 'flex', gap: 0 }}>
              {[<Ico.Image/>, <Ico.Gif/>, <Ico.Emoji/>].map((ic, i) => (
                <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6 }}>{ic}</button>
              ))}
            </div>
            <button onClick={doReply} disabled={!replyText.trim()} style={{ backgroundColor: replyText.trim() ? X.blue : '#0e5f87', color: '#fff', border: 'none', borderRadius: 20, padding: '8px 20px', fontWeight: 700, cursor: replyText.trim() ? 'pointer' : 'not-allowed', fontSize: 15, fontFamily: X.font }}>Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────
const TwitterPage = ({ onBack }) => {
  const [page, setPage] = useState('home');
  const [likes, setLikes] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [bookmarks, setBookmarks] = useState([TWEETS[1].id, TWEETS[3].id]);
  const [userTweets, setUserTweets] = useState([]);
  const [openTweet, setOpenTweet] = useState(null);
  const [following, setFollowing] = useState(false);

  const allTweets = [...userTweets.map(t => ({ ...t, isUser: true })), ...TWEETS];

  const onLike = id => setLikes(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const onRepost = id => setReposts(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const onBookmark = id => setBookmarks(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const onPost = text => setUserTweets(p => [{ id: Date.now(), text, time: 'now', likes: 0, retweets: 0, replies: 0, bookmarks: 0, views: 0, img: null }, ...p]);

  const sharedProps = { tweets: allTweets, likes, reposts, bookmarks, onLike, onRepost, onBookmark };

  const renderContent = () => {
    if (openTweet) return (
      <TweetDetailPage tweet={openTweet} {...sharedProps}
        onBack={() => setOpenTweet(null)}
        onProfile={() => { setOpenTweet(null); setPage('profile'); }}
      />
    );
    switch (page) {
      case 'home': return <HomePage {...sharedProps} onPost={onPost} onProfile={() => setPage('profile')} onOpen={setOpenTweet} setPage={setPage} />;
      case 'profile': return <ProfilePage {...sharedProps} following={following} setFollowing={setFollowing} setPage={setPage} />;
      case 'notifications': return <NotificationsPage />;
      case 'bookmarks': return <BookmarksPage {...sharedProps} />;
      case 'messages': return <MessagesPage />;
      case 'explore': return <ExplorePage />;
      case 'following': return <PeoplePage title="Following" setPage={setPage} />;
      case 'followers': return <PeoplePage title="Followers" setPage={setPage} />;
      default: return <HomePage {...sharedProps} onPost={onPost} onProfile={() => setPage('profile')} onOpen={setOpenTweet} setPage={setPage} />;
    }
  };

  return (
    <div style={{ backgroundColor: X.bg, minHeight: '100vh', fontFamily: X.font, color: X.text }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', minHeight: '100vh' }}>

        {/* LEFT NAV */}
        <div style={{ width: 275, flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', paddingTop: 8 }}>
          <LeftNav page={openTweet ? '' : page} setPage={p => { setOpenTweet(null); setPage(p); }} onBack={onBack} />
        </div>

        {/* MAIN COLUMN */}
        <div style={{ flex: 1, maxWidth: 600, borderLeft: `1px solid ${X.border}`, borderRight: `1px solid ${X.border}`, minHeight: '100vh' }}>
          {renderContent()}
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ width: 348, flexShrink: 0, padding: '0 0 0 28px', paddingTop: 8, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
          <TrendingSidebar setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default TwitterPage;