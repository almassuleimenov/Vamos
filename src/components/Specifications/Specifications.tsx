'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './Specifications.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Структурируем сырые данные ТЭП
const KPIS = [
  { label: 'Общая площадь', value: '1 071.4', unit: 'м²' },
  { label: 'Сейсмичность', value: '9', unit: 'баллов' },
  { label: 'Офисные зоны', value: '611.3', unit: 'м²' },
  { label: 'Детейлинг', value: '263.2', unit: 'м²' },
];

const ENGINEERING_DATA = [
  { label: 'Площадь участка', value: '0.0663 га' },
  { label: 'Площадь застройки', value: '369.6 м²' },
  { label: 'Площадь озеленения', value: '64.6 м²' },
  { label: 'Паркинг (вне участка)', value: '5 мест' },
  { label: 'Строительный объем', value: '4 093.1 м³' },
  { label: 'Объем ниже 0.000', value: '1 016.7 м³' },
  { label: 'Объем выше 0.000', value: '3 076.4 м³' },
  { label: 'Расчетная темп. зимы', value: '-21°С' },
];

const FLOORS = [
  {
    id: 'basement',
    name: 'Подвал',
    area: '338.9',
    rooms: [
      { name: 'Общее помещение', area: '263.2' },
      { name: 'Техническое помещение', area: '37.8' },
      { name: 'Лифтовый холл', area: '11.8' },
      { name: 'Электрощитовая', area: '9.1' },
      { name: 'Лестница', area: '7.0' },
    ],
  },
  {
    id: 'floor-1',
    name: '1-й этаж',
    area: '338.8',
    rooms: [
      { name: 'Коммерческие помещения', area: '113.4, 84.0, 74.3' },
      { name: 'Коридор', area: '16.5' },
      { name: 'Лифтовый холл', area: '11.8' },
      { name: 'Лестница', area: '11.5' },
      { name: 'Санузел', area: '6.8' },
      { name: 'Тамбур', area: '4.5' },
    ],
  },
  {
    id: 'floor-2',
    name: '2-й этаж',
    area: '393.7',
    rooms: [
      { name: 'Офисные помещения', area: '138.8, 103.8, 85.0' },
      { name: 'Лифтовый холл', area: '17.0' },
      { name: 'Коридор', area: '16.5' },
      { name: 'Лестница', area: '11.8' },
      { name: 'Санузел', area: '6.8' },
    ],
  }
];

export default function Specifications() {
  const [activeFloor, setActiveFloor] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Анимация раскрытия секции при скролле
  useGSAP(() => {
    gsap.fromTo(
      `.${styles.revealTarget}`,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: sectionRef });

  // Резкая, техничная анимация при смене этажа
  const handleTabClick = (index: number) => {
    if (index === activeFloor) return;
    
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setActiveFloor(index);
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    });
  };

  return (
    <section className={styles.specifications} ref={sectionRef}>
      <div className={styles.container}>
        
        {/* Заголовок */}
        <header className={`${styles.header} ${styles.revealTarget}`}>
          <h2 className={styles.title}>Технико-экономические<br/>показатели</h2>
          <span className={styles.badge}>ТЭП // Спецификация</span>
        </header>

        {/* Level 1: Главные метрики (Рекламные) */}
        <div className={`${styles.kpiGrid} ${styles.revealTarget}`}>
          {KPIS.map((kpi, idx) => (
            <div key={idx} className={styles.kpiCard}>
              <div className={styles.kpiLabel}>{kpi.label}</div>
              <div className={styles.kpiValueGroup}>
                <span className={styles.kpiValue}>{kpi.value}</span>
                <span className={styles.kpiUnit}>{kpi.unit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Разделитель */}
        <div className={`${styles.divider} ${styles.revealTarget}`} />

        <div className={styles.lowerSection}>
          {/* Level 2: Инженерные данные (Леджер) */}
          <div className={`${styles.engineeringGrid} ${styles.revealTarget}`}>
            <h3 className={styles.subTitle}>Сводные данные</h3>
            <ul className={styles.ledgerList}>
              {ENGINEERING_DATA.map((item, idx) => (
                <li key={idx} className={styles.ledgerItem}>
                  <span className={styles.ledgerLabel}>{item.label}</span>
                  <span className={styles.ledgerValue}>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Level 3: Интерактивная экспликация */}
          <div className={`${styles.explicationArea} ${styles.revealTarget}`}>
            <h3 className={styles.subTitle}>Поэтажная экспликация</h3>
            
            <div className={styles.explicationSplit}>
              {/* Навигация (Tabs) */}
              <div className={styles.tabs} role="tablist">
                {FLOORS.map((floor, idx) => (
                  <button
                    key={floor.id}
                    role="tab"
                    aria-selected={activeFloor === idx}
                    className={`${styles.tab} ${activeFloor === idx ? styles.tabActive : ''}`}
                    onClick={() => handleTabClick(idx)}
                  >
                    <span className={styles.tabName}>{floor.name}</span>
                    <span className={styles.tabArea}>{floor.area} м²</span>
                  </button>
                ))}
              </div>

              {/* Контент активного этажа */}
              <div className={styles.tabContent} ref={contentRef}>
                <ul className={styles.roomList}>
                  {FLOORS[activeFloor].rooms.map((room, idx) => (
                    <li key={idx} className={styles.roomItem}>
                      <span className={styles.roomName}>{room.name}</span>
                      <div className={styles.roomAreaWrapper}>
                        <span className={styles.roomArea}>{room.area}</span>
                        <span className={styles.roomUnit}>м²</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}