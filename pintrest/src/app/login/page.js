"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./page.module.css";

// ── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Today's inspiration",
  "Outdoor decor",
  "Food & drink",
  "Architecture",
  "Fashion",
  "Hair",
  "Travel",
  "DIY & Crafts",
  "Fitness",
  "Quotes",
  "Tattoos",
  "Beauty",
  "Minimalism",
  "Wedding",
  "Art",
];

const PINS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    h: 280,
    title: "Mountain Sunrise",
    src: "travelblog.com",
    author: "Aria K.",
    av: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    h: 200,
    title: "Modern Living Room",
    src: "homedecor.co",
    author: "Marcus L.",
    av: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
    h: 320,
    title: "Gourmet Pizza",
    src: "foodie.net",
    author: "Sofia M.",
    av: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
    h: 240,
    title: "Street Fashion",
    src: "vogue.com",
    author: "Jenna T.",
    av: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1490750967868-88df5691cc14?w=400&q=80",
    h: 300,
    title: "Spring Flowers",
    src: "nature.io",
    author: "Lena B.",
    av: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&q=80",
    h: 220,
    title: "Architecture",
    src: "archdaily.com",
    author: "Omar P.",
    av: "https://i.pravatar.cc/40?img=6",
  },
];

// ── SVG Icons ────────────────────────────────────────────────────────────────

const LogoSVG = () => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 22, height: 22, fill: "#fff" }}
  >
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const GoogleSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
  </svg>
);

const EyeOpen = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeClosed = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// ── Toast Hook ───────────────────────────────────────────────────────────────

function useToast() {
  const [toast, setToast] = useState({
    msg: "",
    show: false,
  });

  const timer = useRef(null);

  const showToast = useCallback((msg) => {
    clearTimeout(timer.current);

    setToast({
      msg,
      show: true,
    });

    timer.current = setTimeout(() => {
      setToast((t) => ({
        ...t,
        show: false,
      }));
    }, 2300);
  }, []);

  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  return { toast, showToast };
}

// ── Validation ───────────────────────────────────────────────────────────────

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

// ── Pin Card ────────────────────────────────────────────────────────────────

function PinCard({ pin, delay, showToast }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className={styles.pinCard}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      <div className={styles.pinImgWrap}>
        <img
          src={pin.img}
          alt={pin.title}
          loading="lazy"
          className={styles.pinImg}
          style={{
            height: `${pin.h}px`,
            width: "100%",
            objectFit: "cover",
          }}
        />

        <div className={styles.pinOverlay}>
          <button
            type="button"
            className={`${styles.saveBtn} ${
              saved ? styles.saveBtnSaved : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();

              if (!saved) {
                setSaved(true);
                showToast(`"${pin.title}" saved!`);
              }
            }}
          >
            {saved ? "Saved ✓" : "Save"}
          </button>
        </div>
      </div>

      <div className={styles.pinMeta}>
        <div className={styles.pinTitle}>{pin.title}</div>
        <div className={styles.pinSource}>{pin.src}</div>

        <div className={styles.pinAuthor}>
          <img
            src={pin.av}
            alt={pin.author}
            className={styles.authorAvatar}
          />

          <span className={styles.authorName}>{pin.author}</span>
        </div>
      </div>
    </div>
  );
}

// ── Home Feed ────────────────────────────────────────────────────────────────

function HomeFeed({ userEmail, onLogout, showToast }) {
  const [activeCategory, setActiveCategory] = useState(0);

  const username = userEmail
    ? userEmail.split("@")[0]
    : "User";

  return (
    <div className={styles.homeContainer}>
      <nav className={styles.homeNav}>
        <button
          type="button"
          className={styles.homeNavLogo}
        >
          <LogoSVG />
        </button>

        <div className={styles.searchWrap}>
          <input
            type="text"
            placeholder="Search"
            aria-label="Search pins"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.navRight}>
          <img
            src="https://i.pravatar.cc/80?img=47"
            alt="User avatar"
            draggable="false"
            className={styles.userAvatar}
          />

          <button
            type="button"
            className={styles.logoutBtn}
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className={styles.welcomeBanner}>
        Welcome back, {username} 🎉
      </div>

      <div className={styles.categories}>
        {CATEGORIES.map((cat, i) => (
          <button
            type="button"
            key={`${cat}-${i}`}
            className={`${styles.pill} ${
              activeCategory === i
                ? styles.pillActive
                : ""
            }`}
            onClick={() => {
              setActiveCategory(i);
              showToast(`Showing ${cat}`);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <main className={styles.homeMain}>
        <div
          className={styles.masonry}
          suppressHydrationWarning
        >
          {PINS.map((pin, i) => (
            <PinCard
              key={pin.id}
              pin={pin}
              delay={i * 40}
              showToast={showToast}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function PinterestAuth() {
  const [isSignup, setIsSignup] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [loggedInEmail, setLoggedInEmail] =
    useState("");

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [errors, setErrors] = useState({});

  const timeoutRef = useRef(null);

  const { toast, showToast } = useToast();

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  function switchMode() {
    setIsSignup((s) => !s);

    setErrors({});
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setShowPassword(false);
  }

  function validate() {
    const errs = {};

    if (isSignup && !name.trim()) {
      errs.name = "Name is required";
    }

    if (!validateEmail(email)) {
      errs.email = "Enter valid email";
    }

    if (!validatePassword(password)) {
      errs.password =
        "Password must be at least 6 characters";
    }

    if (
      isSignup &&
      password !== confirmPassword
    ) {
      errs.confirmPassword =
        "Passwords do not match";
    }

    return errs;
  }

  function handleSubmit() {
    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setLoading(true);

    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setLoggedInEmail(email);
      setLoggedIn(true);
    }, 1500);
  }

  function handleGoogleLogin() {
    setLoading(true);

    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setLoggedInEmail("googleuser@gmail.com");
      setLoggedIn(true);
    }, 1200);
  }

  function handleLogout() {
    setLoggedIn(false);
    setLoading(false);
    setErrors({});
    setEmail("");
    setPassword("");
  }

  if (loggedIn) {
    return (
      <>
        <HomeFeed
          userEmail={loggedInEmail}
          onLogout={handleLogout}
          showToast={showToast}
        />

        <div
          aria-live="polite"
          className={`${styles.toast} ${
            toast.show ? styles.toastShow : ""
          }`}
        >
          {toast.msg}
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      {/* Navbar */}

      <div className={styles.navbar}>
        <div className={styles.logoArea}>
          <div className={styles.logo}>P</div>
          <h2>Pinterest</h2>
        </div>

        <button
          type="button"
          className={styles.topButton}
          onClick={switchMode}
        >
          {isSignup ? "Log in" : "Sign up"}
        </button>
      </div>

      {/* Card */}

      <div className={styles.card}>
        <h1>
          {isSignup
            ? "Sign up to Pinterest"
            : "Log in to Pinterest"}
        </h1>

        {/* Google */}

        <button
          type="button"
          className={styles.googleBtn}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <span className={styles.googleIcon}>
            <GoogleSVG />
          </span>

          Continue with Google
        </button>

        <div className={styles.or}>OR</div>

        {/* Name */}

        {isSignup && (
          <>
            <input
              type="text"
              placeholder="Full name"
              className={`${styles.input} ${
                errors.name
                  ? styles.inputError
                  : ""
              }`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            {errors.name && (
              <span className={styles.fieldError}>
                {errors.name}
              </span>
            )}
          </>
        )}

        {/* Email */}

        <input
          type="email"
          placeholder="Email"
          className={`${styles.input} ${
            errors.email
              ? styles.inputError
              : ""
          }`}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        {errors.email && (
          <span className={styles.fieldError}>
            {errors.email}
          </span>
        )}

        {/* Password */}

        <div
          className={`${styles.passwordBox} ${
            errors.password
              ? styles.inputError
              : ""
          }`}
        >
          <input
            type={
              showPassword ? "text" : "password"
            }
            placeholder="Password"
            className={styles.passwordInput}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />

          <button
            type="button"
            className={styles.eye}
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
            onClick={() =>
              setShowPassword((s) => !s)
            }
          >
            {showPassword ? (
              <EyeClosed />
            ) : (
              <EyeOpen />
            )}
          </button>
        </div>

        {errors.password && (
          <span className={styles.fieldError}>
            {errors.password}
          </span>
        )}

        {/* Confirm Password */}

        {isSignup && (
          <>
            <input
              type="password"
              placeholder="Confirm Password"
              className={`${styles.input} ${
                errors.confirmPassword
                  ? styles.inputError
                  : ""
              }`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(
                  e.target.value
                );
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />

            {errors.confirmPassword && (
              <span className={styles.fieldError}>
                {errors.confirmPassword}
              </span>
            )}
          </>
        )}

        {/* Submit */}

        <button
          type="button"
          className={styles.loginBtn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className={styles.spinner} />
          ) : isSignup ? (
            "Sign up"
          ) : (
            "Log in"
          )}
        </button>

        {/* Switch */}

        <p className={styles.switchText}>
          {isSignup
            ? "Already have an account?"
            : "No account?"}

          <span onClick={switchMode}>
            {isSignup
              ? " Log in"
              : " Sign up"}
          </span>
        </p>
      </div>

      {/* Toast */}

      <div
        aria-live="polite"
        className={`${styles.toast} ${
          toast.show ? styles.toastShow : ""
        }`}
      >
        {toast.msg}
      </div>
    </div>
  );
}
