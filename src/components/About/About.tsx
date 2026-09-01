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
  const dataColumnRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Предотвращение jarring change: разделители чертятся только при прокрутке
    // в обоих режимах (нормальный и reduced-motion), т.к. это spatial explanation.
    const dividers = gsap.utils.toArray<HTMLElement>(`.${styles.divider}`);
    dividers.forEach((divider) => {
      gsap.fromTo(
        divider,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none', // linear для scrub
          scrollTrigger: {
            trigger: divider,
            start: 'top 95%',
            end: 'top 80%',
            scrub: true,
          },
        }
      );
    });

    // Анимация входа данных
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const rows = gsap.utils.toArray<HTMLElement>(`.${styles.rowContent}`);
      
      rows.forEach((row) => {
        const label = row.querySelector(`.${styles.label}`);
        const valueGroup = row.querySelector(`.${styles.valueGroup}`);
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            // Не откатываем назад при обратном скролле (брендовое появление)
          },
        });

        // Появление: y(100%) из-под линии с легким snap-back в конце.
        // Цель: Delight/Preventing a jarring change.
        tl.fromTo(
          [label, valueGroup],
          { translateY: '100%', opacity: 0 },
          {
            translateY: '0%',
            opacity: 1,
            duration: 0.7,
            stagger: 0.04, // Плотный стаггер внутри строки
            ease: 'back.out(1.1)', // Легкий отскок для ощущения "встало на место"
          }
        );
      });
    });

    // Мягкий фейд для reduced motion
    mm.add("(prefers-reduced-motion: reduce)", () => {
       gsap.fromTo(
        `.${styles.rowContent}`,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: dataColumnRef.current,
            start: 'top 80%',
          }
        }
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section className={styles.about} ref={sectionRef} id="specifications">
      <div className={styles.container}>
        
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

        <div className={styles.dataColumn} ref={dataColumnRef}>
          {SPECIFICATIONS.map((spec, index) => (
            <div className={styles.rowWrapper} key={index}>
              <div className={styles.divider} />
              
              <div className={styles.rowContent}>
                <span className={styles.label}>{spec.label}</span>
                <div className={styles.valueGroup}>
                  <span className={styles.value}>{spec.value}</span>
                  <span className={styles.unit}>{spec.unit}</span>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.divider} />
        </div>

      </div>
    </section>
  );
}