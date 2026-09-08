'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Gallery.module.css';

const images = [
  { id: '01', src: '/IMG_5080.JPG.jpeg', span: 'full' },
  { id: '02', src: '/IMG_5076.JPG.jpeg', span: 'half' },
  { id: '03', src: '/IMG_5077.JPG.jpeg', span: 'half' },
  { id: '04', src: '/IMG_5078.JPG.jpeg', span: 'offset' },
  { id: '05', src: '/IMG_5079.JPG.jpeg', span: 'full' },
];

export default function Gallery() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Закрытие лайтбокса по Escape (важно для доступности и удобства)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setActiveImage(null);
  }, []);

  useEffect(() => {
    if (activeImage) {
      document.addEventListener('keydown', handleKeyDown);
      // Блокируем скролл на странице, пока открыт лайтбокс
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

  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.container}>
        <div className={styles.grid}>
          {images.map((img) => (
            <div 
              key={img.id} 
              className={`${styles.item} ${styles[img.span]}`}
              onClick={() => setActiveImage(img.src)}
            >
              <div className={styles.meta}>
                <span className={styles.number}>{img.id}</span>
              </div>
              <div className={styles.imageWrapper}>
                <img 
                  src={img.src} 
                  alt={`WAMOS Render ${img.id}`} 
                  className={styles.image} 
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <div 
        className={`${styles.lightbox} ${activeImage ? styles.lightboxActive : ''}`}
        onClick={() => setActiveImage(null)}
      >
        {activeImage && (
          <img 
            src={activeImage} 
            alt="WAMOS Fullscreen Render" 
            className={styles.lightboxImage} 
          />
        )}
      </div>
    </section>
  );
}