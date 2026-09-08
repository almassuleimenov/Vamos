'use client';

import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // Держим прелоадер 2 секунды (время на чтение и отработку стартовой анимации), затем уводим
    const exitTimer = setTimeout(() => {
      setIsLoaded(true);
      
      // Ждем завершения CSS-транзиции ухода (1.2s), затем полностью удаляем из DOM
      setTimeout(() => setIsUnmounted(true), 1200);
    }, 2000);

    return () => clearTimeout(exitTimer);
  }, []);

  if (isUnmounted) return null;

  return (
    <div className={`${styles.preloader} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.textWrapper}>
        <span className={styles.text}>WAMOS</span>
      </div>
    </div>
  );
}