'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Video Layer */}
      <div className={styles.videoWrapper}>
        <video 
          className={styles.video}
          autoPlay 
          loop 
          muted 
          playsInline
          poster="/video-poster.jpg" // Заглушка, если видео грузится
        >
          <source src="/Hero.mp4" type="video/mp4" />
        </video>
        {/* Деликатный градиент только по краям для смягчения интерфейса, центр чистый */}
        <div className={styles.videoScrim} aria-hidden="true" />
      </div>

      {/* Structural Content Block */}
      <div className={styles.contentGrid}>
        <motion.div 
          className={styles.textBlock}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.eyebrow}>
            <span className={styles.monoLabel}>REF: 352403</span>
            <span className={styles.monoLabel}>АЛЬ-ФАРАБИ, 75/2</span>
          </div>

          <h1 className={styles.title}>
            Институт<br />
            Коммуникации
          </h1>

          <p className={styles.greeting}>
            Премиальное коммерческое пространство, формирующее новый архитектурный стандарт Алматы. 
            Проект разработан с фокусом на энергоэффективность и интеграцию в окружающий ландшафт.
          </p>

          <motion.a 
            href="#architecture" 
            className={styles.scrollAction}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className={styles.scrollText}>Исследовать проект</span>
            <ArrowDownRight size={20} strokeWidth={1.5} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}