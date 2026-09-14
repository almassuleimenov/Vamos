'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Footer.module.css';

const dict = {
  ru: {
    contacts: [
      { label: 'Отдел продаж', val: '+7 (700) 711 17 71', href: 'tel:+77007111771', external: false },
      { label: 'Мессенджер', val: 'WhatsApp', href: 'https://wa.me/77007111771', external: true },
      { label: 'Instagram', val: '@vamos.alm', href: 'https://www.instagram.com/vamos.alm?stkn=MWN2c2IzeTN0aDJkbg==', external: true },
    ],
    locationTitle: 'Локация',
    addressLines: ['г. Алматы,', 'Бостандыкский район,', 'пр. Аль-Фараби, уч. 75/2'],
    legalTitle: 'Юридическая информация',
    disclaimers: [
      'Строительство ведется в строгом соответствии с градостроительными регламентами г. Алматы.',
      'Полный пакет проектной и разрешительной документации предоставляется по запросу в отделе продаж.',
      'Любая информация и визуализации на сайте носят информационный характер и не являются публичной офертой.',
    ],
    copyright: 'Vamos. Все права защищены.',
    policy: 'Политика конфиденциальности',
  },
  kz: {
    contacts: [
      { label: 'Сату бөлімі', val: '+7 (700) 711 17 71', href: 'tel:+77007111771', external: false },
      { label: 'Мессенджер', val: 'WhatsApp', href: 'https://wa.me/77007111771', external: true },
      { label: 'Instagram', val: '@vamos.alm', href: 'https://www.instagram.com/vamos.alm?stkn=MWN2c2IzeTN0aDJkbg==', external: true },
    ],
    locationTitle: 'Орналасуы',
    addressLines: ['Алматы қ.,', 'Бостандық ауданы,', 'Әл-Фараби даңғ., 75/2 учаскесі'],
    legalTitle: 'Заңды ақпарат',
    disclaimers: [
      'Құрылыс Алматы қаласының қала құрылысы регламенттеріне сәйкес жүргізілуде.',
      'Жобалық және рұқсат беру құжаттамасының толық пакеті сату бөліміне сұрау салу арқылы беріледі.',
      'Сайттағы кез келген ақпарат пен визуализациялар анықтамалық сипатта болып табылады және жария оферта болып саналмайды.',
    ],
    copyright: 'Vamos. Барлық құқықтар қорғалған.',
    policy: 'Құпиялылық саясаты',
  },
  en: {
    contacts: [
      { label: 'Sales Department', val: '+7 (700) 711 17 71', href: 'tel:+77007111771', external: false },
      { label: 'Messenger', val: 'WhatsApp', href: 'https://wa.me/77007111771', external: true },
      { label: 'Instagram', val: '@vamos.alm', href: 'https://www.instagram.com/vamos.alm?stkn=MWN2c2IzeTN0aDJkbg==', external: true },
    ],
    locationTitle: 'Location',
    addressLines: ['Almaty,', 'Bostandyk District,', 'Al-Farabi Ave, plot 75/2'],
    legalTitle: 'Legal Information',
    disclaimers: [
      'Construction is carried out in strict compliance with the urban planning regulations of Almaty.',
      'The full package of design and permitting documentation is available on request from the sales department.',
      'Any information and visualizations on the website are for reference only and do not constitute a public offer.',
    ],
    copyright: 'Vamos. All rights reserved.',
    policy: 'Privacy Policy',
  },
} as const;

type Lang = keyof typeof dict;

interface FooterProps {
  lang: string;
}

// Кинематографичная кривая (резкий старт, очень плавное торможение)
const customEase = [0.16, 1, 0.3, 1] as any;

export default function Footer({ lang }: FooterProps) {
  const t = dict[(lang as Lang)] ?? dict.ru;

  const shouldReduceMotion = useReducedMotion();

  // Контейнер для каскада
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  // Эффект Mask Reveal для заголовков
  const maskVariants = {
    hidden: { y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: 1.2, ease: customEase },
    },
  } as any;

  // Деликатное появление для списков и текста
  const fadeVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: customEase },
    },
  } as any;

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.container}>

        {/* Главный блок: Расширенная 12-колоночная сетка */}
        <motion.div
          className={styles.mainGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >

          {/* Колонка 1: Бренд и Контакты (1-4) */}
          <div className={styles.brandCol}>
            <div className={styles.mask}>
              <motion.div variants={maskVariants} className={styles.logo}>VAMOS</motion.div>
            </div>

            <address className={styles.contacts}>
              {t.contacts.map((contact, i) => (
                <motion.div key={i} variants={fadeVariants} className={styles.contactItem}>
                  <span className={styles.contactLabel}>{contact.label}</span>
                  <a
                    href={contact.href}
                    target={contact.external ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    {contact.val}
                  </a>
                </motion.div>
              ))}
            </address>
          </div>

          {/* Колонка 2: Локация (5-8) */}
          <div className={styles.addressCol}>
            <div className={styles.mask}>
              <motion.span variants={maskVariants} className={styles.colTitle}>{t.locationTitle}</motion.span>
            </div>
            <motion.p variants={fadeVariants} className={styles.addressText}>
              {t.addressLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t.addressLines.length - 1 && <br />}
                </span>
              ))}
            </motion.p>
          </div>

          {/* Колонка 3: Дисклеймеры (9-13) */}
          <div className={styles.legalCol}>
            <div className={styles.mask}>
              <motion.span variants={maskVariants} className={styles.colTitle}>{t.legalTitle}</motion.span>
            </div>
            <div className={styles.disclaimers}>
              {t.disclaimers.map((text, i) => (
                <motion.p key={i} variants={fadeVariants}>{text}</motion.p>
              ))}
            </div>
          </div>

        </motion.div>

        {/* Нижний бар: Копирайт и Политика */}
        <motion.div
          className={styles.bottomBar}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: customEase, delay: 0.4 }}
        >
          <div className={styles.copyright}>
            <span className={styles.mono}>© 2026</span> {t.copyright}
          </div>
          <div className={styles.policy}>
            <Link href={`/${lang}/privacy-policy`} className={styles.policyLink}>
              {t.policy}
            </Link>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}