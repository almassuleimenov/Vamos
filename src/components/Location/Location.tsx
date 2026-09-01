'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './Location.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  useGSAP(() => {
    // Параллакс: текстовый блок движется чуть быстрее, чем сама секция
    gsap.fromTo(
      textRef.current,
      { y: 50 },
      {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Плавное появление карты
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, scale: 0.98 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section className={styles.location} ref={sectionRef} id="location">
      <div className={styles.container}>
        
        {/* Типографический блок, наезжающий на карту */}
        <div className={styles.textBlock} ref={textRef}>
          <span className={styles.label}>Локация</span>
          <h2 className={styles.title}>
            Аль-Фараби, <br />
            75/2
          </h2>
          <p className={styles.description}>
            Стратегическая ось деловой активности. 
            Прямой доступ к главным транспортным артериям и премиальному окружению.
          </p>
        </div>

        {/* Контейнер карты */}
        <div 
          className={styles.mapWrapper} 
          ref={mapRef}
          onMouseLeave={() => setIsMapInteractive(false)}
        >
          {/* Интерактивный оверлей для защиты скролла */}
          {!isMapInteractive && (
            <div 
              className={styles.mapOverlay} 
              onClick={() => setIsMapInteractive(true)}
              role="button"
              tabIndex={0}
              aria-label="Активировать карту"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsMapInteractive(true);
                }
              }}
            >
              <span className={styles.overlayText}>Нажмите для взаимодействия</span>
            </div>
          )}
          
          <iframe 
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aada5da585ebbb52d3fa1f5891ed2c2bd36e31f458c17ca3e374b11a4efb8a3b9&amp;source=constructor" 
            width="100%" 
            height="100%" 
            frameBorder="0"
            className={styles.iframe}
            title="Карта расположения объекта на Аль-Фараби 75/2"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
}