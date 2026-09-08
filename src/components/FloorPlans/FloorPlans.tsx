'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './FloorPlans.module.css';

export default function FloorPlans() {
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
      className={`${styles.plans} ${isVisible ? styles.visible : ''}`} 
      id="plans"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Левая колонка: Описание */}
          <div className={styles.infoCol}>
            <h2 className={styles.title}>Поэтажные планы</h2>
            <div className={styles.divider} />
            <p className={styles.desc}>
              Подробные архитектурные планировки, экспликация помещений, разрезы и схемы инженерных узлов для вашей команды проектировщиков.
            </p>
          </div>

          {/* Правая колонка: Штамп скачивания */}
          <div className={styles.downloadCol}>
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
                <div className={styles.metaCell}>
                  <span className={styles.metaLabel}>Размер</span>
                  <span className={styles.metaValue}>4.2 MB</span>
                </div>
              </div>

              {/* Нижняя часть карточки с призывом */}
              <div className={styles.cardBody}>
                <span className={styles.actionText}>Скачать документацию</span>
                <div className={styles.iconWrapper}>
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="square" 
                    strokeLinejoin="miter"
                    className={styles.arrowIcon}
                  >
                    <line x1="12" y1="3" x2="12" y2="19"></line>
                    <polyline points="5 12 12 19 19 12"></polyline>
                  </svg>
                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}