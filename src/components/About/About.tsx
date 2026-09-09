'use client';

import { motion, useReducedMotion } from 'framer-motion';
import styles from './About.module.css';

const dictionaries = {
  ru: {
    titles: {
      metrics: 'Ключевые показатели',
      engineering: 'Архитектура и инженерия',
    },
    metrics: [
      { value: '1 071.4', unit: 'м²', label: 'Общая площадь здания' },
      { value: '611.3', unit: 'м²', label: 'Офисные и торговые пространства' },
      { value: '263.2', unit: 'м²', label: 'Цоколь (паркинг / детейлинг)' },
      { value: '3.9', unit: 'м', label: 'Высота потолков (1-2 этажи)' },
      { value: '9', unit: 'баллов', label: 'Расчетная сейсмостойкость' },
      { value: '0.0664', unit: 'га', label: 'Участок в частной собственности' },
    ],
    engineering: [
      { term: 'Фасад', desc: 'Навесной вентилируемый с минераловатным утеплением. RAL 7035, RAL 7012.' },
      { term: 'Цоколь', desc: 'Натуральный гранит. RAL 7038.' },
      { term: 'Остекление', desc: 'Алюминиевая витражная система, двухкамерные энергосберегающие стеклопакеты в пол.' },
      { term: 'Конструктив', desc: 'Монолитный железобетонный каркас, монолитная фундаментная плита, газоблок 200 мм.' },
      { term: 'Лифт', desc: 'Пассажирский лифт, связывающий все 3 уровня.' },
    ],
  },
  kz: {
    titles: {
      metrics: 'Негізгі көрсеткіштер',
      engineering: 'Сәулет және инженерия',
    },
    metrics: [
      { value: '1 071.4', unit: 'м²', label: 'Ғимараттың жалпы ауданы' },
      { value: '611.3', unit: 'м²', label: 'Кеңсе және сауда кеңістіктері' },
      { value: '263.2', unit: 'м²', label: 'Жертөле (паркинг / детейлинг)' },
      { value: '3.9', unit: 'м', label: 'Төбе биіктігі (1-2 қабаттар)' },
      { value: '9', unit: 'балл', label: 'Есептік сейсмикалық төзімділік' },
      { value: '0.0664', unit: 'га', label: 'Жер учаскесі жеке меншікте' },
    ],
    engineering: [
      { term: 'Қасбет', desc: 'Минералды мақтамен жылытылған аспалы желдетілетін. RAL 7035, RAL 7012.' },
      { term: 'Жертөле', desc: 'Табиғи гранит. RAL 7038.' },
      { term: 'Шынылау', desc: 'Алюминий витраж жүйесі, еденге дейінгі екі камералы энергия үнемдейтін шыныпакеттер.' },
      { term: 'Конструктив', desc: 'Монолитті темірбетон қаңқа, монолитті іргетас тақтасы, газблок 200 мм.' },
      { term: 'Лифт', desc: 'Барлық 3 деңгейді байланыстыратын жолаушылар лифті.' },
    ],
  },
  en: {
    titles: {
      metrics: 'Key Metrics',
      engineering: 'Architecture & Engineering',
    },
    metrics: [
      { value: '1 071.4', unit: 'm²', label: 'Total building area' },
      { value: '611.3', unit: 'm²', label: 'Office and retail spaces' },
      { value: '263.2', unit: 'm²', label: 'Basement (parking / detailing)' },
      { value: '3.9', unit: 'm', label: 'Ceiling height (1st-2nd floors)' },
      { value: '9', unit: 'points', label: 'Design seismic resistance' },
      { value: '0.0664', unit: 'ha', label: 'Privately owned land plot' },
    ],
    engineering: [
      { term: 'Facade', desc: 'Ventilated curtain wall with mineral wool insulation. RAL 7035, RAL 7012.' },
      { term: 'Plinth', desc: 'Natural granite. RAL 7038.' },
      { term: 'Glazing', desc: 'Aluminum curtain wall system, floor-to-ceiling double-glazed energy-saving units.' },
      { term: 'Structure', desc: 'Monolithic reinforced concrete frame, monolithic foundation slab, 200mm aerated concrete block.' },
      { term: 'Elevator', desc: 'Passenger elevator connecting all 3 levels.' },
    ],
  },
};

type Locale = keyof typeof dictionaries;

interface AboutProps {
  lang: string;
}

// Общая кривая для дорогого, плавного скольжения
const customEase = [0.16, 1, 0.3, 1] as const;

export default function About({ lang }: AboutProps) {
  const shouldReduceMotion = useReducedMotion();
  const dict = dictionaries[lang as Locale] || dictionaries.ru;

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
  };

  // Анимация архитектурных засечек (GPU-friendly scaleX вместо width)
  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: { 
      scaleX: 1, 
      opacity: 1,
      transition: { duration: 1.2, ease: customEase } 
    },
  };

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
              {dict.titles.metrics}
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
              {dict.metrics.map((item, idx) => (
                <motion.div key={idx} className={styles.metricItem} variants={itemVariants as any}>
                  {/* Линия-засечка */}
                  <motion.div 
                    className={styles.metricTick} 
                    variants={lineVariants as any}
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
              {dict.titles.engineering}
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
              {dict.engineering.map((item, idx) => (
                <motion.div key={idx} className={styles.engineeringRow} variants={itemVariants as any}>
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