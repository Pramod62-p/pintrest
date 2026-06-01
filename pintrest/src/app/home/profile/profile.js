"use client";

import Image from "next/image";
import styles from "./profile.module.css";

const BOARDS = [
  {
    id: 1,
    title: "Travel Dreams",
    count: 124,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 2,
    title: "Modern Homes",
    count: 86,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    id: 3,
    title: "Food Inspiration",
    count: 65,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
  },
];

const PINS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=800&q=80",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
];

export default function ProfilePage() {
  return (
    <div className={styles.profilePage}>
      {/* Cover */}

      <div className={styles.cover}>
        <Image
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80"
          alt="cover"
          fill
          className={styles.coverImg}
          unoptimized
        />
      </div>

      {/* User */}

      <div className={styles.profileHeader}>
        <div className={styles.avatarWrap}>
          <Image
            src="https://i.pravatar.cc/300?img=47"
            alt="avatar"
            width={130}
            height={130}
            className={styles.avatar}
            unoptimized
          />
        </div>

        <h1 className={styles.name}>Aria Williams</h1>

        <p className={styles.username}>@ariadesigns</p>

        <p className={styles.bio}>
          Travel lover • Interior enthusiast • Collecting ideas daily.
        </p>

        <div className={styles.stats}>
          <div>
            <strong>12.5K</strong>
            <span>Followers</span>
          </div>

          <div>
            <strong>520</strong>
            <span>Following</span>
          </div>

          <div>
            <strong>1.8K</strong>
            <span>Pins</span>
          </div>
        </div>

        <button className={styles.editBtn}>
          Edit Profile
        </button>
      </div>

      {/* Boards */}

      <section className={styles.section}>
        <h2>Boards</h2>

        <div className={styles.boardGrid}>
          {BOARDS.map((board) => (
            <div key={board.id} className={styles.boardCard}>
              <Image
                src={board.image}
                alt={board.title}
                width={500}
                height={320}
                className={styles.boardImg}
                unoptimized
              />

              <div className={styles.boardInfo}>
                <h3>{board.title}</h3>
                <span>{board.count} Pins</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Saved Pins */}

      <section className={styles.section}>
        <h2>Saved Pins</h2>

        <div className={styles.masonry}>
          {PINS.map((pin) => (
            <div key={pin.id} className={styles.pin}>
              <Image
                src={pin.image}
                alt=""
                width={600}
                height={800}
                className={styles.pinImg}
                unoptimized
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
