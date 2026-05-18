"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./page.module.css";

// ── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All", "Today's inspiration", "Outdoor decor", "Food & drink",
  "Architecture", "Fashion", "Hair", "Travel", "DIY & Crafts",
  "Fitness", "Quotes", "Tattoos", "Beauty", "Minimalism", "Wedding", "Art",
];

const PINS = [
  { id: 1,  img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", h: 280, title: "Mountain Sunrise",   src: "travelblog.com",   author: "Aria K.",   av: "https://i.pravatar.cc/40?img=1" },
  { id: 2,  img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", h: 200, title: "Modern Living Room",  src: "homedecor.co",     author: "Marcus L.", av: "https://i.pravatar.cc/40?img=2" },
  { id: 3,  img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", h: 320, title: "Gourmet Pizza",      src: "foodie.net",       author: "Sofia M.",  av: "https://i.pravatar.cc/40?img=3" },
  { id: 4,  img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80", h: 240, title: "Street Fashion",     src: "vogue.com",        author: "Jenna T.",  av: "https://i.pravatar.cc/40?img=4" },
  { id: 5,  img: "https://images.unsplash.com/photo-1490750967868-88df5691cc14?w=400&q=80", h: 300, title: "Spring Flowers",     src: "nature.io",        author: "Lena B.",   av: "https://i.pravatar.cc/40?img=5" },
  { id: 6,  img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80", h: 220, title: "Architecture",       src: "archdaily.com",    author: "Omar P.",   av: "https://i.pravatar.cc/40?img=6" },
  { id: 7,  img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80", h: 260, title: "Healthy Bowl",       src: "eatwell.co",       author: "Claire N.", av: "https://i.pravatar.cc/40?img=7" },
  { id: 8,  img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80", h: 340, title: "Yoga Sunrise",       src: "wellness.app",     author: "Zoe R.",    av: "https://i.pravatar.cc/40?img=8" },
  { id: 9,  img: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&q=80", h: 230, title: "Minimal Desk",       src: "desky.io",         author: "Ryan W.",   av: "https://i.pravatar.cc/40?img=9" },
  { id: 10, img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", h: 270, title: "Autumn Forest",      src: "hikingpal.com",    author: "Nina C.",   av: "https://i.pravatar.cc/40?img=10" },
  { id: 11, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80", h: 210, title: "Minimal Laptop",     src: "techdesign.io",    author: "Hugo F.",   av: "https://i.pravatar.cc/40?img=11" },
  { id: 12, img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", h: 290, title: "Home Gym",           src: "fitlife.com",      author: "Maya V.",   av: "https://i.pravatar.cc/40?img=12" },
  { id: 13, img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80", h: 360, title: "Summer Look",        src: "styleday.co",      author: "Ines A.",   av: "https://i.pravatar.cc/40?img=13" },
  { id: 14, img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80", h: 250, title: "Cozy Bedroom",       src: "sleepwell.io",     author: "Dave S.",   av: "https://i.pravatar.cc/40?img=14" },
  { id: 15, img: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80", h: 300, title: "Amalfi Coast",       src: "travelgram.net",   author: "Mia G.",    av: "https://i.pravatar.cc/40?img=15" },
  { id: 16, img: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=400&q=80", h: 240, title: "Latte Art",          src: "coffeelovers.co",  author: "Leo H.",    av: "https://i.pravatar.cc/40?img=16" },
  { id: 17, img: "https://images.unsplash.com/photo-1432958576632-8a39f6b97dc7?w=400&q=80", h: 200, title: "Geometric Pattern",  src: "artboard.io",      author: "Alisa D.",  av: "https://i.pravatar.cc/40?img=17" },
  { id: 18, img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80", h: 280, title: "City Lights",        src: "urbanlife.com",    author: "Ben O.",    av: "https://i.pravatar.cc/40?img=18" },
  { id: 19, img: "https://images.unsplash.com/photo-1559181567-c3190525afd3?w=400&q=80", h: 260, title: "Cherry Blossoms",    src: "japantravel.co",   author: "Yuki T.",   av: "https://i.pravatar.cc/40?img=19" },
  { id: 20, img: "https://images.unsplash.com/photo-1583394293214-0df5e4a9e7af?w=400&q=80", h: 310, title: "Skincare Routine",   src: "glowup.io",        author: "Chloe E.",  av: "https://i.pravatar.cc/40?img=20" },
  { id: 21, img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&q=80", h: 230, title: "Beach House",        src: "coastliving.com",  author: "James F.",  av: "https://i.pravatar.cc/40?img=21" },
  { id: 22, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80", h: 270, title: "Avocado Toast",      src: "brunchclub.io",    author: "Emma L.",   av: "https://i.pravatar.cc/40?img=22" },
  { id: 23, img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&q=80", h: 320, title: "Floral Dress",       src: "fashionweek.co",   author: "Isla B.",   av: "https://i.pravatar.cc/40?img=23" },
  { id: 24, img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80", h: 200, title: "Ocean View",         src: "beachlife.io",     author: "Karl M.",   av: "https://i.pravatar.cc/40?img=24" },
];

// ── SVG Icons ────────────────────────────────────────────────────────────────
const LogoSVG = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{width:22,height:22,fill:"#fff"}}>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const GoogleSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const EyeOpen = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeClosed = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);

const ChatIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const DotsIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

// ── Toast hook ───────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState({ msg: "", show: false });
  const timer = useRef(null);
  const showToast = useCallback((msg) => {
    clearTimeout(timer.current);
    setToast({ msg, show: true });
    timer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 2300);
  }, []);
  return { toast, showToast };
}

// ── Validation ───────────────────────────────────────────────────────────────
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
function validatePassword(p) { return p.length >= 6; }

// ══════════════════════════════════════════════════════════════════════════════
//  PIN CARD
// ══════════════════════════════════════════════════════════════════════════════
function PinCard({ pin, delay, showToast }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className={styles.pinCard} style={{ animationDelay: `${delay}ms` }}>
      <div className={styles.pinImgWrap}>
        <img
          className={styles.pinImg}
          src={pin.img}
          alt={pin.title}
          style={{ height: pin.h }}
          loading="lazy"
        />
        <div className={styles.pinOverlay}>
          <button
            className={`${styles.saveBtn} ${saved ? styles.saveBtnSaved : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setSaved(true);
              showToast(`"${pin.title}" saved to board!`);
            }}
          >
            {saved ? "Saved ✓" : "Save"}
          </button>
          <div className={styles.pinActionsBottom}>
            <button className={styles.pinActionBtn} onClick={(e) => { e.stopPropagation(); showToast("Share link copied!"); }}>
              <ShareIcon />
            </button>
            <button className={styles.pinActionBtn} onClick={(e) => { e.stopPropagation(); showToast("Reaction added!"); }}>
              <HeartIcon />
            </button>
            <button className={styles.pinActionBtn} onClick={(e) => { e.stopPropagation(); showToast("More options"); }}>
              <DotsIcon />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.pinMeta}>
        <div className={styles.pinTitle}>{pin.title}</div>
        <div className={styles.pinSource}>{pin.src}</div>
        <div className={styles.pinAuthor}>
          <img className={styles.authorAvatar} src={pin.av} alt={pin.author} />
          <span className={styles.authorName}>{pin.author}</span>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  HOME FEED
// ══════════════════════════════════════════════════════════════════════════════
function HomeFeed({ userEmail, onLogout, showToast }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [pins, setPins] = useState(PINS);
  const [dropOpen, setDropOpen] = useState(false);
  const [showNotifDot, setShowNotifDot] = useState(true);
  const [activeNav, setActiveNav] = useState("Home");
  const loadingRef = useRef(false);
  const dropRef = useRef(null);

  // Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (loadingRef.current) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadingRef.current = true;
        showToast("Loading more pins…");
        setTimeout(() => {
          setPins(prev => [
            ...prev,
            ...[...PINS].sort(() => Math.random() - 0.5).slice(0, 8).map((p, i) => ({
              ...p, id: Date.now() + i
            }))
          ]);
          loadingRef.current = false;
        }, 800);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [showToast]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const username = userEmail ? userEmail.split("@")[0] : "User";

  return (
    <div className={styles.homeContainer}>
      {/* Welcome banner */}
      <div className={styles.welcomeBanner}>
        Welcome back, {username}! 🎉 Your Pinterest feed is ready.
      </div>

      {/* Navbar */}
      <nav className={styles.homeNav}>
        <button className={styles.homeNavLogo} title="Pinterest">
          <LogoSVG />
        </button>

        {["Home", "Explore"].map(label => (
          <button
            key={label}
            className={`${styles.navBtn} ${activeNav === label ? styles.navBtnActive : ""}`}
            onClick={() => { setActiveNav(label); showToast(`${label} feed`); }}
          >
            {label}
          </button>
        ))}

        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            onKeyDown={(e) => { if (e.key === "Enter" && e.target.value) showToast(`Searching for "${e.target.value}"…`); }}
          />
        </div>

        <div className={styles.navRight}>
          <button className={styles.iconBtn} title="Create" onClick={() => showToast("Create pin — coming soon!")}>
            <PlusIcon />
          </button>

          <button
            className={styles.iconBtn}
            title="Notifications"
            onClick={() => { setShowNotifDot(false); showToast("No new notifications"); }}
          >
            <BellIcon />
            {showNotifDot && <span className={styles.notifDot} />}
          </button>

          <button className={styles.iconBtn} title="Messages" onClick={() => showToast("Messages — coming soon!")}>
            <ChatIcon />
          </button>

          {/* Avatar + dropdown */}
          <div className={styles.dropdownWrap} ref={dropRef}>
            <img
              className={styles.userAvatar}
              src="https://i.pravatar.cc/80?img=47"
              alt="Profile"
              onClick={() => setDropOpen(o => !o)}
            />
            {dropOpen && (
              <div className={styles.dropdown}>
                {[
                  ["Your profile", false],
                  ["Your boards", false],
                  ["Saved pins", false],
                  ["Settings", false],
                  ["Log out", true],
                ].map(([label, danger]) => (
                  <button
                    key={label}
                    className={`${styles.dropItem} ${danger ? styles.dropItemDanger : ""}`}
                    onClick={() => {
                      setDropOpen(false);
                      if (danger) { onLogout(); }
                      else showToast(label);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Category pills */}
      <div className={styles.categories}>
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            className={`${styles.pill} ${activeCategory === i ? styles.pillActive : ""}`}
            onClick={() => { setActiveCategory(i); showToast(`Showing: ${cat}`); }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <main className={styles.homeMain}>
        <div className={styles.masonry}>
          {pins.map((pin, i) => (
            <PinCard key={pin.id} pin={pin} delay={i < 24 ? i * 35 : 0} showToast={showToast} />
          ))}
        </div>
      </main>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  AUTH PAGE
// ══════════════════════════════════════════════════════════════════════════════
export default function PinterestAuth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Errors
  const [errors, setErrors] = useState({});

  const { toast, showToast } = useToast();

  // Reset form on mode switch
  const switchMode = () => {
    setIsSignup(s => !s);
    setErrors({});
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  function validate() {
    const errs = {};
    if (isSignup && !name.trim()) errs.name = "Name is required.";
    if (!validateEmail(email)) errs.email = "Enter a valid email address.";
    if (!validatePassword(password)) errs.password = "Password must be at least 6 characters.";
    if (isSignup && password !== confirmPassword) errs.confirmPassword = "Passwords do not match.";
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // Simulate async auth
    setTimeout(() => {
      setLoading(false);
      setLoggedInEmail(email);
      setLoggedIn(true);
    }, 1600);
  }

  function handleGoogleLogin() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setLoggedInEmail("google.user@gmail.com");
      setLoggedIn(true);
    }, 1200);
  }

  function handleForgotPassword() {
    if (!validateEmail(email)) {
      setErrors(e => ({ ...e, email: "Enter your email first." }));
      return;
    }
    showToast(`Password reset link sent to ${email}`);
  }

  function handleLogout() {
    setLoggedIn(false);
    setLoggedInEmail("");
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setIsSignup(false);
    showToast("Logged out successfully.");
  }

  // ── Home feed ──
  if (loggedIn) {
    return (
      <>
        <HomeFeed userEmail={loggedInEmail} onLogout={handleLogout} showToast={showToast} />
        <div className={`${styles.toast} ${toast.show ? styles.toastShow : ""}`}>{toast.msg}</div>
      </>
    );
  }

  // ── Auth page ──
  return (
    <div className={styles.container}>

      {/* Navbar */}
      <div className={styles.navbar}>
        <div className={styles.logoArea}>
          <div className={styles.logo}>P</div>
          <h2>Pinterest</h2>
        </div>
        <button className={styles.topButton} onClick={switchMode}>
          {isSignup ? "Log in" : "Sign up"}
        </button>
      </div>

      {/* Card */}
      <div className={styles.card}>
        <h1>{isSignup ? "Sign up to Pinterest" : "Log in to Pinterest"}</h1>

        {/* Google */}
        <button className={styles.googleBtn} onClick={handleGoogleLogin} disabled={loading}>
          <span className={styles.googleIcon}><GoogleSVG /></span>
          Continue with Google
        </button>

        <div className={styles.or}>OR</div>

        {/* Name (signup only) */}
        {isSignup && (
          <>
            <input
              type="text"
              placeholder="Full name"
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              value={name}
              onChange={e => { setName(e.target.value); setErrors(er => ({ ...er, name: "" })); }}
            />
            {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
          </>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(er => ({ ...er, email: "" })); }}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
        />
        {errors.email && <span className={styles.fieldError}>{errors.email}</span>}

        {/* Password */}
        <div className={`${styles.passwordBox} ${errors.password ? styles.inputError : ""}`}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.passwordInput}
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(er => ({ ...er, password: "" })); }}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
          />
          <button className={styles.eye} onClick={() => setShowPassword(s => !s)} type="button">
            {showPassword ? <EyeClosed /> : <EyeOpen />}
          </button>
        </div>
        {errors.password && <span className={styles.fieldError}>{errors.password}</span>}

        {/* Confirm password (signup only) */}
        {isSignup && (
          <>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
              value={confirmPassword}
              onChange={e => { setConfirmPassword(e.target.value); setErrors(er => ({ ...er, confirmPassword: "" })); }}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
            {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
          </>
        )}

        {/* Forgot password */}
        {!isSignup && (
          <button className={styles.forgot} onClick={handleForgotPassword}>
            Forgot your password?
          </button>
        )}

        {/* Submit button */}
        <button className={styles.loginBtn} onClick={handleSubmit} disabled={loading}>
          {loading
            ? <span className={styles.spinner} />
            : (isSignup ? "Sign up" : "Log in")
          }
        </button>

        {/* Facebook notice (login only) */}
        {!isSignup && (
          <>
            <p className={styles.facebook}>Facebook login is no longer available</p>
            <button className={styles.updateBtn} onClick={() => showToast("Please use email or Google to log in.")}>
              Update login method
            </button>
          </>
        )}

        {/* Switch mode */}
        <p className={styles.switchText}>
          {isSignup ? "Already have an account?" : "No Account?"}
          <span onClick={switchMode}>{isSignup ? " Log in" : " Sign up"}</span>
        </p>

        <button className={styles.business} onClick={() => showToast("Business signup — coming soon!")}>
          Are you a business? Get started here!
        </button>

        <p className={styles.terms}>
          By continuing, you agree to Pinterest's{" "}
          <a href="#" onClick={e => { e.preventDefault(); showToast("Terms of Service"); }}>Terms of Service</a>{" "}
          and acknowledge you've read our{" "}
          <a href="#" onClick={e => { e.preventDefault(); showToast("Privacy Policy"); }}>Privacy Policy</a>.
        </p>
      </div>

      {/* Toast */}
      <div className={`${styles.toast} ${toast.show ? styles.toastShow : ""}`}>{toast.msg}</div>
    </div>
  );
}
