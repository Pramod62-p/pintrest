"use client";

import Image from "next/image";
import styles from "./profile.module.css";

const savedPins = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Mountain Sunrise",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    title: "Modern Living",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
    title: "Pizza Mood",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    title: "Dream House",
  },
];

export default function ProfilePage() {
  return (
    <div className={styles.profilePage}>
      <div className={styles.cover}></div>

      <div className={styles.profileHeader}>
        <Image
          src="https://i.pravatar.cc/300?img=47"
          alt="Profile"
          width={140}
          height={140}
          className={styles.avatar}
          unoptimized
        />

        <h1 className={styles.name}>Aria Williams</h1>

        <p className={styles.username}>@aria</p>

        <p className={styles.bio}>
          Travel enthusiast, designer and collector of ideas.
        </p>

        <div className={styles.stats}>
          <div>
            <strong>1.8K</strong>
            <span>Pins</span>
          </div>

          <div>
            <strong>12.5K</strong>
            <span>Followers</span>
          </div>

          <div>
            <strong>520</strong>
            <span>Following</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button>Edit Profile</button>
          <button>Share</button>
        </div>
      </div>

      <section className={styles.section}>
        <h2>Saved Pins</h2>

        <div className={styles.grid}>
          {savedPins.map((pin) => (
            <div key={pin.id} className={styles.card}>
              <Image
                src={pin.image}
                alt={pin.title}
                width={500}
                height={700}
                className={styles.pinImage}
                unoptimized
              />

              <div className={styles.pinTitle}>
                {pin.title}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
