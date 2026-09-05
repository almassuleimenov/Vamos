'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Gallery.module.css';

const renders = [
  {
    id: '01',
    src: '/IMG_5076.JPG.jpeg',
    title: 'ПЕРСПЕКТИВА // ЮГО-ВОСТОК',
    desc: 'Интеграция в ландшафт пр. Аль-Фараби'
  },
  {
    id: '02',
    src: '/IMG_5077.JPG.jpeg',
    title: 'ФАСАДНАЯ СИСТЕМА // ДЕТАЛЬ',
    desc: 'Алюминиевые витражи и гранитная облицовка'
  },
  {
    id: '03',
    src: '/IMG_5078.JPG.jpeg',
    title: 'ВХОДНАЯ ГРУППА',
    desc: 'Организация пешеходного потока'
  },
  {
    id: '04',
    src: '/IMG_5079.JPG.jpeg',
    title: 'ПАРКИНГ И ТРАНЗИТ // СЕВЕР',
    desc: 'Въездная зона и технический доступ'
  },
  {
    id: '05',
    src: '/IMG_5080.JPG.jpeg',
    title: 'ЭКСТЕРЬЕР // ВЕЧЕРНИЙ СВЕТ',
    desc: 'Сценарий архитектурного освещения'
  }
];

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Простая проверка на мобилку для отключения тяжелого параллакса
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
  });

  // Для 5 слайдов двигаем контейнер так, чтобы последний слайд оказался в поле зрения.
  // Используем CSS calc() в стилях для точного позиционирования.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section className={styles.galleryWrapper} ref={trackRef}>
      <div className={styles.stickyContainer}>
        
        {/* Информационный overlay */}
        <header className={styles.galleryHeader}>
          <h2 className={styles.heading}>Визуализация объекта</h2>
          <div className={styles.meta}>
            <span className={styles.metaLabel}>СТАТУС</span>
            <span className={styles.metaValue}>RENDERED // 2026</span>
          </div>
        </header>

        {/* 
          На десктопе используем framer-motion для привязки к скроллу.
          На мобилках отдаем управление нативному overflow-x (через CSS).
        */}
        <motion.div 
          className={styles.slider} 
          style={isMobile ? {} : { x }}
        >
          {renders.map((item) => (
            <figure key={item.id} className={styles.slide}>
              <div className={styles.imageBox}>
                <Image
                  src={item.src}
                  alt={`Рендер ${item.title}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 70vw"
                  className={styles.image}
                  priority={item.id === '01'} // Грузим первую сразу
                />
              </div>
              <figcaption className={styles.caption}>
                <div className={styles.captionTop}>
                  <span className={styles.slideId}>{item.id}</span>
                  <span className={styles.slideTitle}>{item.title}</span>
                </div>
                <p className={styles.slideDesc}>{item.desc}</p>
              </figcaption>
            </figure>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}