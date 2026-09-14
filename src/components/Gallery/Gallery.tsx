'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './Gallery.module.css';

const images = [
  { id: '01', src: '/1.jpg.webp', span: 'full' },
  { id: '02', src: '/2.jpg.webp', span: 'half' },
  { id: '03', src: '/3.jpg.webp', span: 'half' },
  { id: '04', src: '/4.jpg.webp', span: 'offset' },
  { id: '05', src: '/5.jpg.webp', span: 'full' },
];

const dict = {
  ru: { alt: 'Рендер VAMOS', fullscreenAlt: 'Полноэкранный рендер VAMOS' },
  kz: { alt: 'VAMOS рендері', fullscreenAlt: 'VAMOS толық экранды рендері' },
  en: { alt: 'VAMOS Render', fullscreenAlt: 'VAMOS Fullscreen Render' },
} as const;

type Lang = keyof typeof dict;

interface GalleryProps {
  lang: string;
}

const modalSpring = { type: 'spring', mass: 1, stiffness: 180, damping: 24 } as any;
const customEase = [0.16, 1, 0.3, 1] as any;

export default function Gallery({ lang }: GalleryProps) {
  const t = dict[(lang as Lang)] ?? dict.ru;

  const [activeImage, setActiveImage] = useState<typeof images[0] | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Инициализация для Portals (Next.js SSR защита)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setActiveImage(null);
  }, []);

  useEffect(() => {
    if (activeImage) {
      document.addEventListener('keydown', handleKeyDown);
      // Блокировка скролла
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeImage, handleKeyDown]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.2, ease: customEase },
    },
  };

  const lightboxContent = (
    <AnimatePresence>
      {activeImage && (
        <motion.div
          className={styles.lightbox}
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={() => setActiveImage(null)}
        >
          <motion.img
            layoutId={shouldReduceMotion ? undefined : `gallery-img-${activeImage.id}`}
            src={activeImage.src}
            alt={t.fullscreenAlt}
            className={styles.lightboxImage}
            transition={modalSpring}
            // Предотвращение всплытия клика, если потребуется добавить контролы
            onClick={(e) => e.stopPropagation()} 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.container}>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
        >
          {images.map((img) => (
            <motion.div
              key={img.id}
              className={`${styles.item} ${styles[img.span]}`}
              variants={itemVariants}
            >
              <div className={styles.meta}>
                <div className={styles.numberMask}>
                  <motion.span
                    className={styles.number}
                    initial={{ y: '100%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: customEase, delay: 0.2 }}
                  >
                    {img.id}
                  </motion.span>
                </div>
                <motion.div
                  className={styles.metaLine}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: customEase, delay: 0.1 }}
                />
              </div>

              <div
                className={styles.imageWrapper}
                onClick={() => setActiveImage(img)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveImage(img)}
              >
                <motion.img
                  layoutId={shouldReduceMotion ? undefined : `gallery-img-${img.id}`}
                  src={img.src}
                  alt={`${t.alt} ${img.id}`}
                  className={styles.image}
                  loading="lazy"
                  style={{ opacity: activeImage?.id === img.id ? 0 : 1 }}
                  whileHover={!shouldReduceMotion ? { scale: 1.03 } : {}}
                  transition={{ duration: 0.6, ease: customEase }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Рендерим модальное окно через Portal в body */}
      {isMounted && createPortal(lightboxContent, document.body)}
    </section>
  );
}