'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        '.reveal-text',
        { yPercent: 110, rotate: 2, transformOrigin: 'left top' },
        { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.08, delay: 0.1 }
      )
      .fromTo(
        `.${styles.subtitle}`,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '<0.4' 
      )
      .fromTo(
        `.${styles.cta}`,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '<0.3' 
      );
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.to(['.reveal-text', `.${styles.subtitle}`, `.${styles.cta}`], {
        opacity: 1,
        y: 0,
        yPercent: 0,
        rotate: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const handleScrollToForm = () => {
    console.log('Scroll to contact form');
  };

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title} ref={titleRef}>
            <div className={styles.lineMask}>
              <span className="reveal-text">Институт</span>
            </div>
            <div className={styles.lineMask}>
              <span className="reveal-text">Коммуникаций</span>
            </div>
          </h1>
          
          <p className={styles.subtitle}>
            Премиальное коммерческое пространство на Аль-Фараби 75/2. 
            Архитектура, диктующая статус вашего бизнеса.
          </p>

          <button 
            type="button" 
            className={styles.cta}
            onClick={handleScrollToForm}
            aria-label="Связаться с отделом продаж"
          >
            <span className={styles.ctaLabel}>Связаться</span>
            <span className={styles.ctaIcon}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 13L13 1M13 1V11.4M13 1H2.6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}