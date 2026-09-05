'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
} as any;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function About() {
  return (
    <section id="architecture" className={styles.about}>
      <div className={styles.grid}>
        
        {/* Left Column: Concept & Philosophy */}
        <motion.div 
          className={styles.concept}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerContainer}
        >
          <motion.h2 className={styles.heading} variants={fadeUpVariant}>
            Архитектурная интеграция
          </motion.h2>
          
          <motion.div className={styles.textBlock} variants={fadeUpVariant}>
            <p>
              Проект представляет собой коммерческое здание, которое легко вписывается в окружающую среду, подчеркивая уникальность местности[cite: 6]. 
            </p>
            <p>
              Форма, пропорции и выбор облицовочных решений продиктованы стремлением создать не просто рабочее пространство, а функциональный узел на проспекте Аль-Фараби.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column: Engineering Specs (Semantic Description List) */}
        <motion.div 
          className={styles.specs}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={staggerContainer}
        >
          <motion.div className={styles.specHeader} variants={fadeUpVariant}>
            <span className={styles.monoTitle}>SPECIFICATION // REV.01</span>
          </motion.div>

          <motion.dl className={styles.specList} variants={staggerContainer}>
            
            <motion.div className={styles.specItem} variants={fadeUpVariant}>
              <dt className={styles.specTerm}>Фасадная система</dt>
              <dd className={styles.specDesc}>
                Алюминиевая витражная система, композитные панели и гранит[cite: 6]. Современные энергоэффективные материалы на подвесной системе[cite: 6].
              </dd>
            </motion.div>

            <motion.div className={styles.specItem} variants={fadeUpVariant}>
              <dt className={styles.specTerm}>Несущий каркас</dt>
              <dd className={styles.specDesc}>
                Монолитный железобетон[cite: 6]. Фундамент плитный[cite: 6]. Перекрытия — монолитная ж/б плита[cite: 6].
              </dd>
            </motion.div>

            <motion.div className={styles.specItem} variants={fadeUpVariant}>
              <dt className={styles.specTerm}>Стеновое заполнение</dt>
              <dd className={styles.specDesc}>
                Газоблок толщиной 200мм с утеплением минераловатными плитами[cite: 6].
              </dd>
            </motion.div>

            <motion.div className={styles.specItem} variants={fadeUpVariant}>
              <dt className={styles.specTerm}>Безопасность</dt>
              <dd className={styles.specDesc}>
                Расчетная сейсмичность площадки строительства 9 баллов[cite: 6].
              </dd>
            </motion.div>

          </motion.dl>
        </motion.div>

      </div>
    </section>
  );
}