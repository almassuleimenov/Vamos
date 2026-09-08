'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Location.module.css';

const advantages = [
  { time: '01', unit: 'мин', desc: 'Удобный выезд на главную магистраль — проспект Аль-Фараби' },
  { time: '04', unit: 'мин', desc: 'На авто до ТРЦ Mega Center Alma-Ata' },
  { time: '07', unit: 'мин', desc: 'До Esentai Mall и финансового кластера города' },
  { time: '—', unit: 'паркинг', desc: 'Места непосредственно у здания и комфортный подъезд спецтехники' },
];

export default function Location() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`${styles.location} ${isVisible ? styles.visible : ''}`} 
      id="location"
    >
      <div className={styles.grid}>
        
        {/* Левая колонка: Компактный контент */}
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>Локация</span>
            <h2 className={styles.title}>Аль-Фараби, 75/2</h2>
            <p className={styles.subtitle}>
              Первая линия. Стратегический доступ к ключевым точкам Алматы.
            </p>
          </div>

          <div className={styles.advantages}>
            {advantages.map((adv, idx) => (
              <div key={idx} className={styles.advantageItem}>
                <div className={styles.advMetric}>
                  <span className={styles.advTime}>{adv.time}</span>
                  <span className={styles.advUnit}>{adv.unit}</span>
                </div>
                <p className={styles.advDesc}>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Правая колонка: Карта без полей (Edge-to-Edge) */}
        <div className={styles.mapWrapper}>
          <iframe 
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aada5da585ebbb52d3fa1f5891ed2c2bd36e31f458c17ca3e374b11a4efb8a3b9&amp;source=constructor" 
            className={styles.iframe}
            title="Расположение WAMOS"
            loading="lazy"
          />
          <div className={styles.mapOverlay} />
        </div>

      </div>
    </section>
  );
}