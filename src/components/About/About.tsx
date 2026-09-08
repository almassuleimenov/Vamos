'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

const metrics = [
  { value: '1 071.4', unit: 'м²', label: 'Общая площадь здания' },
  { value: '611.3', unit: 'м²', label: 'Офисные и торговые пространства' },
  { value: '263.2', unit: 'м²', label: 'Цоколь (паркинг / детейлинг)' },
  { value: '3.9', unit: 'м', label: 'Высота потолков (1-2 этажи)' },
  { value: '9', unit: 'баллов', label: 'Расчетная сейсмостойкость' },
  { value: '0.0664', unit: 'га', label: 'Участок в частной собственности' },
];

const engineering = [
  { term: 'Фасад', desc: 'Навесной вентилируемый с минераловатным утеплением. RAL 7035, RAL 7012.' },
  { term: 'Цоколь', desc: 'Натуральный гранит. RAL 7038.' },
  { term: 'Остекление', desc: 'Алюминиевая витражная система, двухкамерные энергосберегающие стеклопакеты в пол.' },
  { term: 'Конструктив', desc: 'Монолитный железобетонный каркас, монолитная фундаментная плита, газоблок 200 мм.' },
  { term: 'Лифт', desc: 'Пассажирский лифт, связывающий все 3 уровня.' },
];

export default function About() {
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
      className={`${styles.about} ${isVisible ? styles.visible : ''}`}
      id="about"
    >
      <div className={styles.container}>
        
        {/* Блок цифр (Метрики) */}
        <div className={styles.metricsGroup}>
          <h2 className={styles.sectionTitle}>Ключевые показатели</h2>
          <div className={styles.metricsGrid}>
            {metrics.map((item, idx) => (
              <div key={idx} className={styles.metricItem}>
                <div className={styles.metricValue}>
                  {item.value} <span className={styles.metricUnit}>{item.unit}</span>
                </div>
                <div className={styles.metricLabel}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Блок архитектуры (Инженерия) */}
        <div className={styles.engineeringGroup}>
          <h2 className={styles.sectionTitle}>Архитектура и инженерия</h2>
          <dl className={styles.engineeringList}>
            {engineering.map((item, idx) => (
              <div key={idx} className={styles.engineeringRow}>
                <dt className={styles.engineeringTerm}>{item.term}</dt>
                <dd className={styles.engineeringDesc}>{item.desc}</dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  );
}