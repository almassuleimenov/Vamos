'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.css';

// Регистрируем плагин GSAP (лучше вынести в общий утилитный файл, но для компонента оставляем здесь)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Эффект "тяжелого камня" — медленное всплытие слов с маской
    tl.fromTo(
      '.reveal-text',
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.8, stagger: 0.1, delay: 0.2 }
    )
    .fromTo(
      `.${styles.subtitle}`,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      '-=1.2'
    )
    .fromTo(
      `.${styles.cta}`,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      '-=1.0'
    );
  }, { scope: sectionRef });

  const handleScrollToForm = () => {
    // В будущем здесь будет GSAP scrollTo или Lenis scrollTo до формы
    console.log('Scroll to contact form');
  };

  return (
    <section className={styles.hero} ref={sectionRef}>
      {/* 
        Здесь в будущем будет компонент <FacadeRender /> или <Image /> 
        с position: absolute и z-index: 0 
      */}
      
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