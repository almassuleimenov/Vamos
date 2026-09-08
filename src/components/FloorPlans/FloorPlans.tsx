'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './FloorPlans.module.css';

// Кинематографичная кривая
const customEase = [0.16, 1, 0.3, 1];

export default function FloorPlans() {
  const shouldReduceMotion = useReducedMotion();

  // Контейнер для каскадного появления элементов левой колонки
  const infoVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Mask Reveal для текста
  const textVariants = {
    hidden: { y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 },
    show: { 
      y: '0%', 
      opacity: 1,
      transition: { duration: 1.2, ease: customEase } 
    },
  } as any;

  // GPU-оптимизированное появление линии
  const dividerVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: { 
      scaleX: 1, 
      opacity: 1,
      transition: { duration: 1.2, ease: customEase } 
    },
  } as any;

  // Появление правой колонки с легким смещением
  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: customEase, delay: 0.2 } 
    },
  } as any;

  return (
    <section className={styles.plans} id="plans">
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Левая колонка: Описание */}
          <motion.div 
            className={styles.infoCol}
            variants={infoVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className={styles.mask}>
              <motion.h2 variants={textVariants} className={styles.title}>
                Поэтажные планы
              </motion.h2>
            </div>
            
            <motion.div variants={dividerVariants} className={styles.divider} />
            
            <div className={styles.mask}>
              <motion.p variants={textVariants} className={styles.desc}>
                Подробные архитектурные планировки, экспликация помещений, 
                разрезы и схемы инженерных узлов для вашей команды проектировщиков.
              </motion.p>
            </div>
          </motion.div>

          {/* Правая колонка: Штамп скачивания */}
          <motion.div 
            className={styles.downloadCol}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <a 
              href="/document.pdf" 
              download="WAMOS_Архитектурный_Проект.pdf"
              className={styles.blueprintCard}
            >
              {/* Верхняя часть карточки с метаданными */}
              <div className={styles.cardHeader}>
                <div className={styles.metaCell}>
                  <span className={styles.metaLabel}>Документ</span>
                  <span className={styles.metaValue}>WAMOS_FLOOR_PLANS</span>
                </div>
                <div className={styles.metaCell}>
                  <span className={styles.metaLabel}>Формат</span>
                  <span className={styles.metaValue}>PDF (Вектор)</span>
                </div>
              </div>

              {/* Нижняя часть карточки с призывом */}
              <div className={styles.cardBody}>
                <span className={styles.actionText}>Скачать документацию</span>
                <div className={styles.iconWrapper}>
                  {/* Основная иконка */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.arrowIcon}>
                    <line x1="12" y1="3" x2="12" y2="19" strokeWidth="1.5" strokeLinecap="square" />
                    <polyline points="5 12 12 19 19 12" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                  {/* Иконка, которая прилетает сверху при ховере */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.arrowIconHover}>
                    <line x1="12" y1="3" x2="12" y2="19" strokeWidth="1.5" strokeLinecap="square" />
                    <polyline points="5 12 12 19 19 12" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                </div>
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}