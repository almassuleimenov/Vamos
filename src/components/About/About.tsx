'use client';

import { motion, useReducedMotion } from 'framer-motion';
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

// Общая кривая для дорогого, плавного скольжения
const customEase = [0.16, 1, 0.3, 1] as any;

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  // Контейнер управляет ритмом дочерних элементов (stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  // Элементы появляются со смещением (если не включен Reduce Motion)
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 24 
    },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: customEase } 
    },
  } as any;

  // Анимация архитектурных засечек (GPU-friendly scaleX вместо width)
  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: { 
      scaleX: 1, 
      opacity: 1,
      transition: { duration: 1.2, ease: customEase } 
    },
  } as any;

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        
        {/* Блок цифр (Метрики) */}
        <div className={styles.gridRow}>
          <div className={styles.titleCol}>
            <motion.h2 
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, ease: customEase }}
            >
              Ключевые показатели
            </motion.h2>
          </div>
          
          <div className={styles.contentCol}>
            <motion.div 
              className={styles.metricsGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10%' }}
            >
              {metrics.map((item, idx) => (
                <motion.div key={idx} className={styles.metricItem} variants={itemVariants}>
                  {/* Линия-засечка */}
                  <motion.div 
                    className={styles.metricTick} 
                    variants={lineVariants}
                  />
                  <div className={styles.metricMarker}>+</div>
                  <div className={styles.metricValue}>
                    {item.value} <span className={styles.metricUnit}>{item.unit}</span>
                  </div>
                  <div className={styles.metricLabel}>{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Блок архитектуры (Инженерия) */}
        <div className={styles.gridRow}>
          <div className={styles.titleCol}>
            <motion.h2 
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, ease: customEase }}
            >
              Архитектура и инженерия
            </motion.h2>
          </div>
          
          <div className={styles.contentCol}>
            <motion.dl 
              className={styles.engineeringList}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10%' }}
            >
              {engineering.map((item, idx) => (
                <motion.div key={idx} className={styles.engineeringRow} variants={itemVariants}>
                  <dt className={styles.engineeringTerm}>{item.term}</dt>
                  <dd className={styles.engineeringDesc}>{item.desc}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>

      </div>
    </section>
  );
}