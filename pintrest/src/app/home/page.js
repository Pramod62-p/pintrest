"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./page.module.css";

// Icons
const LogoSVG = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const ShareIcon = () => (
  <svg
    width="15"
    height="15"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="15"
    height="15"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const DotsIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

// Toast Hook
function useToast() {
  const [toast, setToast] = useState({ msg: "", show: false });
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

  return { toast, showToast };
}

// Categories
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

// Sample Pins
const INITIAL_PINS = [
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
];

// Pin Card
function PinCard({ pin, delay, showToast }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className={styles.pinCard}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={styles.pinImgWrap}>
        <Image
          className={styles.pinImg}
          src={pin.img}
          alt={pin.title}
          width={400}
          height={pin.h}
          style={{
            height: pin.h,
            objectFit: "cover",
          }}
        />

        <div className={styles.pinOverlay}>
          <button
            className={styles.saveBtn}
            onClick={(e) => {
              e.stopPropagation();
              setSaved(true);
              showToast(`"${pin.title}" saved to board!`);
            }}
          >
            {saved ? "Saved ✓" : "Save"}
          </button>

          <div className={styles.pinActionsBottom}>
            <button
              className={styles.pinActionBtn}
              onClick={(e) => {
                e.stopPropagation();
                showToast("Share link copied!");
              }}
            >
              <ShareIcon />
            </button>

            <button
              className={styles.pinActionBtn}
              onClick={(e) => {
                e.stopPropagation();
                showToast("Reaction added!");
              }}
            >
              <HeartIcon />
            </button>

            <button
              className={styles.pinActionBtn}
              onClick={(e) => {
                e.stopPropagation();
                showToast("More options");
              }}
            >
              <DotsIcon />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.pinMeta}>
        <div className={styles.pinTitle}>{pin.title}</div>

        <div className={styles.pinSource}>{pin.src}</div>

        <div className={styles.pinAuthor}>
          <Image
            className={styles.authorAvatar}
            src={pin.av}
            alt={pin.author}
            width={28}
            height={28}
          />

          <span className={styles.authorName}>{pin.author}</span>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function PinterestHome() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [pins, setPins] = useState(INITIAL_PINS);
  const [dropOpen, setDropOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");

  const loadingRef = useRef(false);
  const dropRef = useRef(null);

  const { toast, showToast } = useToast();

  // Infinite Scroll
  useEffect(() => {
    const onScroll = () => {
      if (loadingRef.current) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        loadingRef.current = true;

        showToast("Loading more pins…");

        setTimeout(() => {
          setPins((prev) => [
            ...prev,
            ...INITIAL_PINS.map((p) => ({
              ...p,
              id: Date.now() + Math.random(),
            })),
          ]);

          loadingRef.current = false;
        }, 800);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [showToast]);

  // Close dropdown
  useEffect(() => {
    const handler = (e) => {
      if (
        dropRef.current &&
        e.target instanceof Node &&
        !dropRef.current.contains(e.target)
      ) {
        setDropOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const username = "Pramod";

  return (
    <div className={styles.homeContainer}>
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        Welcome back, {username}! 🎉 Your Pinterest feed is ready.
      </div>

      {/* Navbar */}
      <nav className={styles.homeNav}>
        <button className={styles.homeNavLogo} title="Pinterest">
          <LogoSVG />
        </button>

        {["Home", "Explore"].map((label) => (
          <button
            key={label}
            className={`${styles.navBtn} ${
              activeNav === label ? styles.navBtnActive : ""
            }`}
            onClick={() => {
              setActiveNav(label);
              showToast(`${label} feed`);
            }}
          >
            {label}
          </button>
        ))}

        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>
            <SearchIcon />
          </span>

          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                showToast(`Searching for "${e.target.value}"`);
              }
            }}
          />
        </div>

        <div className={styles.navRight}>
          <button
            className={styles.iconBtn}
            onClick={() => showToast("Create pin — coming soon!")}
          >
            <PlusIcon />
          </button>

          <div className={styles.dropdownWrap} ref={dropRef}>
            <Image
              className={styles.userAvatar}
              src="https://i.pravatar.cc/80?img=47"
              alt="Profile"
              width={42}
              height={42}
              onClick={() => setDropOpen((o) => !o)}
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
                    className={`${styles.dropItem} ${
                      danger ? styles.dropItemDanger : ""
                    }`}
                    onClick={() => {
                      setDropOpen(false);

                      if (danger) {
                        showToast("Logged out successfully");
                      } else {
                        showToast(label);
                      }
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

      {/* Categories */}
      <div className={styles.categories}>
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            className={`${styles.pill} ${
              activeCategory === i ? styles.pillActive : ""
            }`}
            onClick={() => {
              setActiveCategory(i);
              showToast(`Showing: ${cat}`);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Feed */}
      <main className={styles.homeMain}>
        <div className={styles.masonry}>
          {pins.map((pin, i) => (
            <PinCard
              key={pin.id}
              pin={pin}
              delay={i < 24 ? i * 35 : 0}
              showToast={showToast}
            />
          ))}
        </div>
      </main>

      {/* Toast */}
      <div
        className={`${styles.toast} ${
          toast.show ? styles.toastShow : ""
        }`}
      >
        {toast.msg}
      </div>
    </div>
  );
}
