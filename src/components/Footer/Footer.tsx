'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        
        {/* Столбец 1: Локация */}
        <div className={styles.column}>
          <h3 className={styles.label}>ОБЪЕКТ</h3>
          <address className={styles.address}>
            г. Алматы, Бостандыкский район,<br />
            пр. Аль-Фараби, участок 75/2[cite: 1, 6, 7]
          </address>
          <a 
            href="https://yandex.kz/maps" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.link}
          >
            Открыть на карте <ArrowUpRight size={16} strokeWidth={1.5} />
          </a>
        </div>

        {/* Столбец 2: Участники проекта (из АПЗ и ЭП) */}
        <div className={styles.column}>
          <h3 className={styles.label}>ПРОЕКТНАЯ ГРУППА</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.itemRole}>Заказчик / Инвестор</span>
              <span className={styles.itemValue}>Рустамов Р. Б.[cite: 1, 3, 6]</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.itemRole}>Генеральный проектировщик</span>
              <span className={styles.itemValue}>ТОО "АГАПЭ"[cite: 6]</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.itemRole}>Главный архитектор</span>
              <span className={styles.itemValue}>Ералиев А. Т.[cite: 6]</span>
            </li>
          </ul>
        </div>

        {/* Столбец 3: Контакты */}
        <div className={styles.column}>
          <h3 className={styles.label}>КОНТАКТЫ ДЛЯ ИНВЕСТОРОВ</h3>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <a href="mailto:invest@institute-comm.kz" className={styles.linkHover}>
                invest@institute-comm.kz
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="tel:+77000000000" className={styles.linkHover}>
                +7 (700) 000-00-00
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Фундамент страницы */}
      <div className={styles.foundation}>
        <div className={styles.foundationMeta}>
          <span className={styles.monoText}>IC // COMMERCIAL REAL ESTATE</span>
          <span className={styles.monoText}>© 2026 ВСЕ ПРАВА ЗАЩИЩЕНЫ</span>
        </div>
        <div className={styles.massiveText} aria-hidden="true">
          AL-FARABI 75/2
        </div>
      </div>
    </footer>
  );
}