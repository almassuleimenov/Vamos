'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import styles from './Gallery.module.css';

const images = [
  { id: '01', src: '/1.jpg.webp', span: 'full' },
  { id: '02', src: '/2.jpg.webp', span: 'half' },
  { id: '03', src: '/3.jpg.webp', span: 'half' },
  { id: '04', src: '/4.jpg.webp', span: 'offset' },
  { id: '05', src: '/5.jpg.webp', span: 'full' },
];

const dict = {
  ru: { alt: 'Рендер VAMOS', fullscreenAlt: 'Полноэкранный рендер VAMOS', close: 'Закрыть' },
  kz: { alt: 'VAMOS рендері', fullscreenAlt: 'VAMOS толық экранды рендері', close: 'Жабу' },
  en: { alt: 'VAMOS Render', fullscreenAlt: 'VAMOS Fullscreen Render', close: 'Close' },
} as const;

type Lang = keyof typeof dict;

interface GalleryProps {
  lang: string;
}

const modalSpring = { type: 'spring', mass: 1, stiffness: 180, damping: 24 } as any;
const customEase = [0.16, 1, 0.3, 1] as any;

/* --- Магнитная кнопка закрытия --- */
function MagneticClose({
  onClick,
  label,
  disabled,
}: {
  onClick: () => void;
  label: string;
  disabled: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const iconX = useMotionValue(0);
  const iconY = useMotionValue(0);

  const config = { stiffness: 250, damping: 20, mass: 0.6 };
  const sx = useSpring(x, config);
  const sy = useSpring(y, config);
  const six = useSpring(iconX, { stiffness: 300, damping: 22, mass: 0.4 });
  const siy = useSpring(iconY, { stiffness: 300, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (disabled) return;

    // Магнит только на устройствах с настоящей мышью
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;

    const RADIUS = 140;
    const STRENGTH = 0.35;

    const handleMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < RADIUS) {
        const pull = 1 - dist / RADIUS;
        x.set(dx * STRENGTH);
        y.set(dy * STRENGTH);
        iconX.set(dx * STRENGTH * 0.4 * pull);
        iconY.set(dy * STRENGTH * 0.4 * pull);
      } else {
        x.set(0);
        y.set(0);
        iconX.set(0);
        iconY.set(0);
      }
    };

    window.addEventListener('pointermove', handleMove);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      x.set(0);
      y.set(0);
      iconX.set(0);
      iconY.set(0);
    };
  }, [disabled, x, y, iconX, iconY]);

  return (
    <motion.button
      ref={ref}
      type="button"
      className={styles.closeButton}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{ x: sx, y: sy }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.35, ease: customEase, delay: 0.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.span className={styles.closeIcon} style={{ x: six, y: siy }} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 5 L19 19 M19 5 L5 19" strokeLinecap="round" />
        </svg>
      </motion.span>
    </motion.button>
  );
}

export default function Gallery({ lang }: GalleryProps) {
  const t = dict[(lang as Lang)] ?? dict.ru;

  const [activeImage, setActiveImage] = useState<typeof images[0] | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const close = useCallback(() => {
    setActiveImage(null);
    // Возвращаем фокус на карточку, с которой открыли
    lastTriggerRef.current?.focus?.();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    },
    [close]
  );

  useEffect(() => {
    if (activeImage) {
      document.addEventListener('keydown', handleKeyDown);
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

  const open = (img: typeof images[0], el: HTMLElement) => {
    lastTriggerRef.current = el;
    setActiveImage(img);
  };

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
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <MagneticClose onClick={close} label={t.close} disabled={!!shouldReduceMotion} />

          <motion.img
            layoutId={shouldReduceMotion ? undefined : `gallery-img-${activeImage.id}`}
            src={activeImage.src}
            alt={t.fullscreenAlt}
            className={styles.lightboxImage}
            transition={modalSpring}
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
                onClick={(e) => open(img, e.currentTarget)}
                role="button"
                tabIndex={0}
                aria-label={`${t.alt} ${img.id}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    open(img, e.currentTarget);
                  }
                }}
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

      {isMounted && createPortal(lightboxContent, document.body)}
    </section>
  );
}