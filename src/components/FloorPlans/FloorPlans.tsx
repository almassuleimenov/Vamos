'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './FloorPlans.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Габариты здания для viewBox SVG (20.7м на 16.5м -> умножаем на 10 для удобства координат)
const VIEWBOX = "0 0 207 165";

const STRUCTURE = [
  { label: 'Габариты в осях', value: '20.7 × 16.5 м' },
  { label: 'Высота здания', value: '11.7 м' },
  { label: 'Кровля', value: 'Плоская, уклон 2%' },
  { label: 'Вертикальная связь', value: 'Лифт + Лестница' },
];

const FLOORS = [
  {
    id: 'basement',
    name: 'Подвал',
    area: '338.9',
    // x, y, w, h подогнаны под пропорции для создания абстрактного чертежа
    rooms: [
      { id: 'b1', name: 'Детейлинг / Паркинг', area: '263.2', rect: { x: 0, y: 0, w: 160, h: 165 } },
      { id: 'b2', name: 'Техническое помещение', area: '37.8', rect: { x: 160, y: 0, w: 47, h: 65 } },
      { id: 'b3', name: 'Лифтовый холл', area: '11.8', rect: { x: 160, y: 65, w: 47, h: 40 } },
      { id: 'b4', name: 'Электрощитовая', area: '9.1', rect: { x: 160, y: 105, w: 47, h: 30 } },
      { id: 'b5', name: 'Лестница', area: '7.0', rect: { x: 160, y: 135, w: 47, h: 30 } },
    ]
  },
  {
    id: 'floor1',
    name: '1-й этаж',
    area: '338.8',
    rooms: [
      { id: 'f1-1', name: 'Коммерческое помещение №1', area: '113.4', rect: { x: 0, y: 0, w: 110, h: 80 } },
      { id: 'f1-2', name: 'Коммерческое помещение №2', area: '84.0', rect: { x: 110, y: 0, w: 50, h: 80 } },
      { id: 'f1-3', name: 'Коммерческое помещение №3', area: '74.3', rect: { x: 0, y: 80, w: 110, h: 85 } },
      { id: 'f1-c', name: 'Коридор / Ядро', area: '16.5', rect: { x: 110, y: 80, w: 50, h: 85 } },
      { id: 'f1-l', name: 'Лифт, Лестница, СУ, Тамбур', area: '34.6', rect: { x: 160, y: 0, w: 47, h: 165 } },
    ]
  },
  {
    id: 'floor2',
    name: '2-й этаж',
    area: '393.7',
    rooms: [
      { id: 'f2-1', name: 'Офисное помещение №1', area: '138.8', rect: { x: 0, y: 0, w: 120, h: 90 } },
      { id: 'f2-2', name: 'Офисное помещение №2', area: '103.8', rect: { x: 120, y: 0, w: 87, h: 90 } },
      { id: 'f2-3', name: 'Офисное помещение №3', area: '85.0', rect: { x: 0, y: 90, w: 120, h: 75 } },
      { id: 'f2-l', name: 'Коридор, Лифт, Лестница', area: '45.3', rect: { x: 120, y: 90, w: 87, h: 75 } },
    ]
  }
];

export default function FloorPlans() {
  const [activeFloorIdx, setActiveFloorIdx] = useState(0);
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const blueprintRef = useRef<SVGSVGElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      `.${styles.reveal}`,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );
  }, { scope: sectionRef });

  const handleFloorChange = (idx: number) => {
    if (idx === activeFloorIdx) return;
    
    // Плавная смена чертежа
    const tl = gsap.timeline();
    tl.to([blueprintRef.current, listRef.current], { 
      opacity: 0, 
      duration: 0.2, 
      ease: 'power2.in',
      onComplete: () => setActiveFloorIdx(idx)
    })
    .to([blueprintRef.current, listRef.current], { 
      opacity: 1, 
      duration: 0.3, 
      ease: 'power2.out' 
    });
  };

  const activeFloor = FLOORS[activeFloorIdx];

  return (
    <section className={styles.floorPlans} ref={sectionRef} id="planning">
      <div className={styles.container}>
        
        {/* Шапка с габаритами здания */}
        <header className={`${styles.header} ${styles.reveal}`}>
          <div className={styles.titleGroup}>
            <h2 className={styles.title}>Планировочные<br/>решения</h2>
            <p className={styles.subtitle}>Прямоугольная форма плана. Идеальная инсоляция.</p>
          </div>
          
          <div className={styles.structureData}>
            {STRUCTURE.map((item, i) => (
              <div key={i} className={styles.structureItem}>
                <span className={styles.structureLabel}>{item.label}</span>
                <span className={styles.structureValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </header>

        <div className={`${styles.workspace} ${styles.reveal}`}>
          
          {/* Интерактивный Чертёж (Blueprint) */}
          <div className={styles.visualColumn}>
            {/* Переключатель этажей */}
            <div className={styles.floorTabs}>
              {FLOORS.map((floor, idx) => (
                <button
                  key={floor.id}
                  className={`${styles.tab} ${idx === activeFloorIdx ? styles.tabActive : ''}`}
                  onClick={() => handleFloorChange(idx)}
                >
                  {floor.name}
                </button>
              ))}
            </div>

            <div className={styles.blueprintWrapper}>
              <svg 
                ref={blueprintRef}
                viewBox={VIEWBOX} 
                className={styles.blueprint}
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Внешний контур здания */}
                <rect x="0" y="0" width="207" height="165" className={styles.outline} />
                
                {/* Зоны */}
                {activeFloor.rooms.map((room) => {
                  const isHovered = hoveredRoomId === room.id;
                  return (
                    <g 
                      key={room.id}
                      onMouseEnter={() => setHoveredRoomId(room.id)}
                      onMouseLeave={() => setHoveredRoomId(null)}
                      className={styles.roomGroup}
                    >
                      <rect 
                        x={room.rect.x} 
                        y={room.rect.y} 
                        width={room.rect.w} 
                        height={room.rect.h} 
                        className={`${styles.roomRect} ${isHovered ? styles.roomRectActive : ''}`}
                      />
                      {/* Условное обозначение площади в центре зоны */}
                      <text 
                        x={room.rect.x + room.rect.w / 2} 
                        y={room.rect.y + room.rect.h / 2}
                        className={`${styles.roomText} ${isHovered ? styles.roomTextActive : ''}`}
                      >
                        {room.area}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Легенда (Список помещений) */}
          <div className={styles.dataColumn}>
            <div className={styles.dataHeader}>
              <h3 className={styles.floorName}>{activeFloor.name}</h3>
              <span className={styles.floorTotal}>{activeFloor.area} м²</span>
            </div>
            
            <ul className={styles.roomList} ref={listRef}>
              {activeFloor.rooms.map((room) => (
                <li 
                  key={room.id} 
                  className={`${styles.roomItem} ${hoveredRoomId === room.id ? styles.roomItemActive : ''}`}
                  onMouseEnter={() => setHoveredRoomId(room.id)}
                  onMouseLeave={() => setHoveredRoomId(null)}
                >
                  <span className={styles.roomItemName}>{room.name}</span>
                  <div className={styles.roomItemData}>
                    <span className={styles.roomItemArea}>{room.area}</span>
                    <span className={styles.roomItemUnit}>м²</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}