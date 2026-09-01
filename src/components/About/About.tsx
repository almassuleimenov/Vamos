'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './About.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SPECIFICATIONS = [
  { label: 'Общая площадь', value: '1071.4', unit: 'м²' },
  { label: 'Этажность', value: '2', unit: '+ подвал' },
  { label: 'Офисные зоны', value: '611.3', unit: 'м²' },
  { label: 'Детейлинг', value: '263.2', unit: 'м²' },
  { label: 'Паркинг', value: '5', unit: 'мест' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // Анимация линий-разделителей (эффект черчения)
    linesRef.current.forEach((line) => {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none', // Линейно, так как привязано к скроллу
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 1, // Вязкий, плавный скраб
          },
        }
      );
    });

    // Анимация появления данных (выплывают из-под линии)
    rowsRef.current.forEach((row) => {
      const value = row.querySelector(`.${styles.valueGroup}`);
      const label = row.querySelector(`.${styles.label}`);

      gsap.fromTo(
        [value, label],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          },
        }
      );
    });
  }, { scope: sectionRef });

  const addToLinesRef = (el: HTMLDivElement | null) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el);
    }
  };

  const addToRowsRef = (el: HTMLDivElement | null) => {
    if (el && !rowsRef.current.includes(el)) {
      rowsRef.current.push(el);
    }
  };

  return (
    <section className={styles.about} ref={sectionRef} id="specifications">
      <div className={styles.container}>
        
        {/* Левая колонка со sticky-заголовком */}
        <div className={styles.stickyColumn}>
          <h2 className={styles.sectionTitle}>
            Технико-экономические<br />
            показатели
          </h2>
          <div className={styles.indicator}>
            <span className={styles.dot}></span>
            Архитектурный проект
          </div>
        </div>

        {/* Правая колонка с данными */}
        <div className={styles.dataColumn}>
          {SPECIFICATIONS.map((spec, index) => (
            <div className={styles.rowWrapper} key={index}>
              {/* Линия-разделитель */}
              <div 
                className={styles.divider} 
                ref={addToLinesRef}
              />
              
              <div className={styles.rowContent} ref={addToRowsRef}>
                <span className={styles.label}>{spec.label}</span>
                <div className={styles.valueGroup}>
                  <span className={styles.value}>{spec.value}</span>
                  <span className={styles.unit}>{spec.unit}</span>
                </div>
              </div>
            </div>
          ))}
          {/* Финальная линия, чтобы закрыть блок */}
          <div className={styles.divider} ref={addToLinesRef} />
        </div>

      </div>
    </section>
  );
}