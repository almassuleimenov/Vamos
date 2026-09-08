'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'О проекте', href: '#about' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Локация', href: '#location' },
  { label: 'Контакты', href: '#contacts' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокировка скролла при открытом мобильном меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <div className={styles.grid}>
            
            {/* Логотип */}
            <div className={styles.logoCol}>
              <Link href="/" className={styles.logo} onClick={handleLinkClick}>
                WAMOS
              </Link>
            </div>

            {/* Десктопная навигация */}
            <nav className={styles.navCol}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Правый блок (Контакты / Действие) */}
            <div className={styles.actionCol}>
              <a href="tel:+77270000000" className={styles.phoneLink}>
                +7 (727) 000-00-00
              </a>
              {/* Кнопка бургера (Мобильный) */}
              <button 
                className={`${styles.burgerBtn} ${isMobileMenuOpen ? styles.burgerActive : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Мобильное меню (Полноэкранное) */}
      <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileContainer}>
          <nav className={styles.mobileNav}>
            {navLinks.map((link, idx) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={styles.mobileNavLink}
                onClick={handleLinkClick}
                style={{ transitionDelay: `${idx * 0.1}s` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className={styles.mobileFooter}>
            <span className={styles.mobileFooterLabel}>Отдел аренды</span>
            <a href="tel:+77270000000" className={styles.mobilePhone}>+7 (727) 000-00-00</a>
            <a href="mailto:sales@wamos.kz" className={styles.mobileEmail}>sales@wamos.kz</a>
          </div>
        </div>
      </div>
    </>
  );
}