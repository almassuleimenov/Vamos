'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.container}>
        
        {/* Главный блок: 12-колоночная сетка */}
        <div className={styles.mainGrid}>
          
          {/* Колонка 1: Бренд и Контакты (1-4) */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>WAMOS</div>
            <address className={styles.contacts}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Отдел аренды и продаж</span>
                <a href="tel:+77270000000" className={styles.contactLink}>+7 (727) 000-00-00</a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Мессенджер</span>
                <a href="https://wa.me/77270000000" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  WhatsApp
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email</span>
                <a href="mailto:sales@wamos.kz" className={styles.contactLink}>sales@wamos.kz</a>
              </div>
            </address>
          </div>

          {/* Колонка 2: Локация (5-7) */}
          <div className={styles.addressCol}>
            <span className={styles.colTitle}>Локация</span>
            <p className={styles.addressText}>
              г. Алматы,<br />
              Бостандыкский район,<br />
              пр. Аль-Фараби, уч. 75/2
            </p>
          </div>

          {/* Колонка 3: Дисклеймеры (8-13) */}
          <div className={styles.legalCol}>
            <span className={styles.colTitle}>Юридическая информация</span>
            <div className={styles.disclaimers}>
              <p>Строительство ведется в строгом соответствии с градостроительными регламентами г. Алматы.</p>
              <p>Полный пакет проектной и разрешительной документации предоставляется по запросу в отделе продаж.</p>
              <p>Любая информация и визуализации на сайте носят информационный характер и не являются публичной офертой.</p>
            </div>
          </div>

        </div>

        {/* Нижний бар: Копирайт и Политика */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            <span className={styles.mono}>© 2026</span> Бизнес-центр Wamos. Все права защищены.
          </div>
          <div className={styles.policy}>
            <Link href="/privacy-policy" className={styles.policyLink}>
              Политика конфиденциальности
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}