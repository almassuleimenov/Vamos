'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={`${styles.hero} ${isMounted ? styles.mounted : ''}`}>
      {/* Background Video */}
      <div className={styles.videoWrapper}>
        <div className={styles.overlay} />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.webp"
          className={styles.video}
        >
          <source src="/Hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>WAMOS</h1>
        <p className={styles.subtitle}>
          Офисы класса А и торговые площади на первой линии<br />
          проспекта Аль-Фараби в Алматы
        </p>
      </div>
    </section>
  );
}