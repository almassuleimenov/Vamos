'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './Preloader.module.css';

// Кинематографичные кривые (Apple / Awwwards стиль)
const revealEase = [0.16, 1, 0.3, 1]; // Резкий старт, долгое скольжение
const exitEase = [0.76, 0, 0.24, 1];  // Монументальный Expo In-Out для шторки

const word = 'VAMOS';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Фаза загрузки/эмоции длится 2.2 секунды
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  // Варианты для фоновой шторки
  const panelVariants = {
    initial: { y: '0%' },
    exit: { 
      y: '-100%', 
      transition: { duration: 1.2, ease: exitEase, delay: 0.2 } 
    }
  } as any;

  // Варианты для контейнера слова (микро-стаггер и дыхание)
  const wordVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: shouldReduceMotion ? 1 : 1.05, 
      transition: { duration: 3, ease: 'linear' } 
    },
    exit: { 
      y: shouldReduceMotion ? 0 : 40, 
      opacity: 0, 
      transition: { duration: 0.6, ease: revealEase } 
    }
  } as any;

  // Варианты для каждой буквы (Mask Reveal)
  const letterVariants = {
    initial: { y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 },
    animate: { 
      y: '0%', 
      opacity: 1, 
      transition: { duration: 1.2, ease: revealEase } 
    }
  } as any;

  return (
    <AnimatePresence onExitComplete={() => setIsMounted(false)}>
      {isLoading && (
        <motion.div
          className={styles.preloader}
          variants={panelVariants}
          initial="initial"
          exit="exit"
        >
          <motion.div 
            className={styles.wordContainer}
            variants={wordVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {word.split('').map((letter, index) => (
              // Маска для каждой буквы
              <span key={index} className={styles.letterMask}>
                <motion.span 
                  className={styles.letter}
                  variants={letterVariants}
                  // Создаем каскадную волну появления
                  transition={{ delay: index * 0.08 }} 
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}