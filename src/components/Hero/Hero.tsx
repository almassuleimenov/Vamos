'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './Hero.module.css';

// Кастомная кривая для кинематографичного, дорогого входа
const customEasing = [0.16, 1, 0.3, 1] as any;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const maskRevealVariants = {
  hidden: { y: '100%' },
  show: {
    y: '0%',
    transition: { duration: 1.2, ease: customEasing },
  },
};

const dividerVariants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.2, ease: customEasing },
  },
} as any;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Если пользователь отключил анимации в ОС, отдаем деликатный fade вместо сдвигов
  const textVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }
    : maskRevealVariants as any;

  return (
    <section className={styles.hero}>
      {/* Левая панель: Архитектурная сетка и контент */}
      <div className={styles.content}>
        <motion.div
          className={styles.textWrap}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <div className={styles.mask}>
            <motion.h1 variants={textVariants} className={styles.title}>
              WAMOS
            </motion.h1>
          </div>

          <motion.div
            className={styles.divider}
            variants={dividerVariants}
            style={{ originX: 0 }}
          />

          <div className={styles.mask}>
            <motion.p variants={textVariants} className={styles.subtitle}>
              Офисы класса А и торговые площади на первой линии
              <br />
              проспекта Аль-Фараби в Алматы
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Правая панель: Видео */}
      <div className={styles.media}>
        <motion.video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.webp"
          className={styles.video}
          // Видео плавно скейлится из 1.12 в 1.0 (никаких scale(0) или scale(1.5))
          initial={{ scale: shouldReduceMotion ? 1 : 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: customEasing }}
        >
          <source src="/Hero.mp4" type="video/mp4" />
        </motion.video>
        {/* Деликатный внутренний контур для идеального стыка */}
        <div className={styles.mediaOverlay} />
      </div>
    </section>
  );
}