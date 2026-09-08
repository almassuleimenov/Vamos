'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Gallery.module.css';

const images = [
  {
    src: '/IMG_5076.JPG.jpeg',
    alt: 'Главный фасад с открытой террасой и витражами',
    caption: 'ФАСАД И ВИТРАЖИ / 1 ЭТАЖ',
    layout: 'hero', // Большое изображение
  },
  {
    src: '/IMG_5077.JPG.jpeg',
    alt: 'Угловой вид с коммерческими витринами',
    caption: 'РИТЕЙЛ ЗОНА / УГЛОВОЙ ВИД',
    layout: 'square', 
  },
  {
    src: '/IMG_5078.JPG.jpeg',
    alt: 'Вид с высоты птичьего полета на плоскую кровлю',
    caption: 'ЭКСПЛУАТИРУЕМАЯ КРОВЛЯ / +11.700',
    layout: 'square',
  },
  {
    src: '/IMG_5079.JPG.jpeg',
    alt: 'Входная группа со стороны пешеходной зоны',
    caption: 'ВХОДНАЯ ГРУППА / БЛАГОУСТРОЙСТВО',
    layout: 'landscape',
  },
  {
    src: '/IMG_5080.JPG.jpeg',
    alt: 'Детали архитектурного фасада здания',
    caption: 'АРХИТЕКТУРНЫЕ ДЕТАЛИ',
    layout: 'landscape',
  },
];

export default function Gallery() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.gallery} ${isVisible ? styles.visible : ''}`} id="gallery">
      <div className={styles.container}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>Экстерьер и детали</h2>
          <p className={styles.subtitle}>Визуализация архитектурного решения</p>
        </div>

        <div className={styles.grid}>
          {images.map((img, idx) => (
            <figure 
              key={idx} 
              className={`${styles.figure} ${styles[img.layout]}`}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                  priority={img.layout === 'hero'}
                />
                <div className={styles.overlay} />
              </div>
              <figcaption className={styles.caption}>
                <span>{String(idx + 1).padStart(2, '0')}</span>
                <span>{img.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        
      </div>
    </section>
  );
}