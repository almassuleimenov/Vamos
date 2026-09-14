'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './Location.module.css';

const dict = {
  ru: {
    eyebrow: 'Локация',
    title: 'Аль-Фараби, 75/2',
    subtitle: 'Первая линия. Стратегический доступ к ключевым точкам Алматы.',
    mapTitle: 'Расположение VAMOS',
    advantages: [
      { time: '—', unit: 'доступ', desc: 'Прямой выезд на проспект Аль-Фараби' },
      { time: '03', unit: 'мин', desc: 'До комплекса Villa Dei Fiori' },
      { time: '04', unit: 'мин', desc: 'До Esentai Mall и финансового кластера' },
    ],
  },
  kz: {
    eyebrow: 'Орналасуы',
    title: 'Әл-Фараби, 75/2',
    subtitle: 'Бірінші желі. Алматының негізгі нүктелеріне стратегиялық қолжетімділік.',
    mapTitle: 'VAMOS орналасуы',
    advantages: [
      { time: '—', unit: 'бағыт', desc: 'Әл-Фараби даңғылына тікелей шығу' },
      { time: '03', unit: 'мин', desc: 'Villa Dei Fiori кешеніне дейін' },
      { time: '04', unit: 'мин', desc: 'Esentai Mall және қаланың қаржы кластеріне дейін' },
    ],
  },
  en: {
    eyebrow: 'Location',
    title: 'Al-Farabi, 75/2',
    subtitle: 'First line. Strategic access to Almaty’s key points.',
    mapTitle: 'VAMOS Location',
    advantages: [
      { time: '—', unit: 'access', desc: 'Direct exit to Al-Farabi Avenue' },
      { time: '03', unit: 'min', desc: 'To Villa Dei Fiori complex' },
      { time: '04', unit: 'min', desc: 'To Esentai Mall and the city’s financial cluster' },
    ],
  },
} as const;

type Lang = keyof typeof dict;

interface LocationProps {
  lang: string;
}

const customEase = [0.16, 1, 0.3, 1] as any;

export default function Location({ lang }: LocationProps) {
  const t = dict[(lang as Lang)] ?? dict.ru;
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const textVariants = {
    hidden: { y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: 1.2, ease: customEase },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: customEase },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 1.2, ease: customEase },
    },
  };

  return (
    <section className={styles.location} id="location">
      <div className={styles.grid}>

        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className={styles.header}>
            <div className={styles.mask}>
              <motion.span variants={textVariants} className={styles.eyebrow}>
                {t.eyebrow}
              </motion.span>
            </div>
            <div className={styles.mask}>
              <motion.h2 variants={textVariants} className={styles.title}>
                {t.title}
              </motion.h2>
            </div>
            <div className={styles.mask}>
              <motion.p variants={textVariants} className={styles.subtitle}>
                {t.subtitle}
              </motion.p>
            </div>
          </div>

          <div className={styles.advantages}>
            <motion.div variants={lineVariants} className={styles.advBorderTop} />

            {t.advantages.map((adv, idx) => (
              <motion.div key={idx} variants={itemVariants} className={styles.advantageItem}>
                <div className={styles.advMetric}>
                  <span className={styles.advTime}>{adv.time}</span>
                  <span className={styles.advUnit}>{adv.unit}</span>
                </div>
                <p className={styles.advDesc}>{adv.desc}</p>
                <motion.div variants={lineVariants} className={styles.advBorderBottom} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className={styles.mapContainer}>
          <motion.div
            className={styles.mapWrapper}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: customEase, delay: 0.2 }}
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Aada5da585ebbb52d3fa1f5891ed2c2bd36e31f458c17ca3e374b11a4efb8a3b9&amp;source=constructor"
              className={styles.iframe}
              title={t.mapTitle}
              loading="lazy"
            />
            <div className={styles.mapOverlay} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}