'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './Hero.module.css';

// Локальный словарь для компонента. 
// Использование \n позволяет гибко управлять переносами строк через <br />
const dictionaries = {
  ru: {
    title: 'VAMOS',
    subtitle: 'Отдельно стоящее здание класса А на первой линии\nпроспекта Аль-Фараби. Продажа единым лотом.',
  },
  kz: {
    title: 'VAMOS',
    subtitle: 'Әл-Фараби даңғылының бірінші желісіндегі А класты\nғимарат. Біртұтас лотпен сатылады.',
  },
  en: {
    title: 'VAMOS',
    subtitle: 'Class A standalone building on the first line\nof Al-Farabi Avenue. Sold as a single asset.',
  },
};

type Locale = keyof typeof dictionaries;

interface HeroProps {
  lang: string;
}

const customEasing = [0.16, 1, 0.3, 1] as const;

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
};

export default function Hero({ lang }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const dict = dictionaries[lang as Locale] || dictionaries.ru;

  const textVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }
    : maskRevealVariants;

  // Разбиваем подзаголовок по переносу строки для сохранения структуры с <br />
  const [subtitleLine1, subtitleLine2] = dict.subtitle.split('\n');

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
            <motion.h1 variants={textVariants as any} className={styles.title}>
              {dict.title}
            </motion.h1>
          </div>

          <motion.div
            className={styles.divider}
            variants={dividerVariants as any}
            style={{ originX: 0 }}
          />

          <div className={styles.mask}>
            <motion.p variants={textVariants as any} className={styles.subtitle}>
              {subtitleLine1}
              {subtitleLine2 && (
                <>
                  <br />
                  {subtitleLine2}
                </>
              )}
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
          initial={{ scale: shouldReduceMotion ? 1 : 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: customEasing }}
        >
          <source src="/Hero.mp4" type="video/mp4" />
        </motion.video>
        <div className={styles.mediaOverlay} />
      </div>
    </section>
  );
}