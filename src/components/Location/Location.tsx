'use client';

import React from 'react';
import styles from './Location.module.css';

export default function Location() {
  return (
    <section id="location" className={styles.location}>
      <header className={styles.header}>
        <h2 className={styles.heading}>Интеграция в городскую среду</h2>
      </header>

      <div className={styles.grid}>
        {/* Блок аналитики и данных */}
        <div className={styles.infoBlock}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>GEO ZONE</span>
            <span className={styles.metaValue}>ALMATY // BOSTANDYK</span>
          </div>
          
          <address className={styles.address}>
            г. Алматы, Бостандыкский район, <br />
            проспект Аль-Фараби, участок 75/2[cite: 1, 6, 7]
          </address>

          <div className={styles.infrastructure}>
            <h3 className={styles.infraTitle}>Локационные преимущества</h3>
            <ul className={styles.infraList}>
              <li className={styles.infraItem}>
                <span className={styles.infraDot} aria-hidden="true" />
                Первая линия проспекта Аль-Фараби
              </li>
              <li className={styles.infraItem}>
                <span className={styles.infraDot} aria-hidden="true" />
                Прямой доступ к главному деловому кластеру
              </li>
              <li className={styles.infraItem}>
                <span className={styles.infraDot} aria-hidden="true" />
                Высокий транзитный и пешеходный трафик
              </li>
            </ul>
          </div>
        </div>

        {/* Чистая интерактивная зона (Соблюдено правило "ничего не налаживать") */}
        <div className={styles.mapContainer}>
          <iframe 
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aada5da585ebbb52d3fa1f5891ed2c2bd36e31f458c17ca3e374b11a4efb8a3b9&amp;source=constructor" 
            title="Расположение Института коммуникации на карте"
            className={styles.mapIframe}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}