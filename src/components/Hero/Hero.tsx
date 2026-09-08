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
      {/* Левая панель: Архитектурная сетка и контент */}
      <div className={styles.content}>
        <div className={styles.textWrap}>
          <h1 className={styles.title}>WAMOS</h1>
          <div className={styles.divider} />
          <p className={styles.subtitle}>
            Офисы класса А и торговые площади на первой линии<br />
            проспекта Аль-Фараби в Алматы
          </p>
        </div>
      </div>

      {/* Правая панель: Видео */}
      <div className={styles.media}>
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
        {/* Деликатный внутренний контур для идеального стыка */}
        <div className={styles.mediaOverlay} />
      </div>
    </section>
  );
}