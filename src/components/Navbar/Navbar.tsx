'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'О проекте', href: '#about' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Локация', href: '#location' },
  { label: 'Контакты', href: '#contacts' },
];

const languages = ['RU', 'KZ', 'EN'];

// Физика пружины для интерфейсных элементов
const springConfig = { type: 'spring', mass: 0.8, stiffness: 250, damping: 25 } as any;
// Кинематографичная кривая
const customEase = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('RU');
  
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  const menuVariants = {
    closed: { 
      clipPath: 'inset(0% 0% 100% 0%)',
      transition: { duration: 0.6, ease: customEase }
    },
    open: { 
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 0.8, ease: customEase, staggerChildren: 0.05, delayChildren: 0.1 }
    }
  } as any;

  const itemVariants = {
    closed: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    open: { opacity: 1, y: 0, transition: springConfig }
  }as any;

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <div className={styles.grid}>
            
            {/* Логотип */}
            <div className={styles.logoCol}>
              <Link href="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
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

            {/* Правый блок (Языки + Бургер) */}
            <div className={styles.actionCol}>
              
              {/* Языковой селектор (Desktop) */}
              <div 
                className={styles.langWrapper} 
                onMouseEnter={() => setIsLangOpen(true)}
                onMouseLeave={() => setIsLangOpen(false)}
              >
                <button className={styles.langTrigger} aria-expanded={isLangOpen}>
                  {activeLang}
                  <svg viewBox="0 0 12 12" className={`${styles.chevron} ${isLangOpen ? styles.chevronUp : ''}`}>
                    <path d="M2.5 4.5L6 8L9.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                  </svg>
                </button>
                
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div 
                      className={styles.langPopover}
                      initial={{ opacity: 0, scale: 0.96, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -4 }}
                      transition={springConfig}
                    >
                      {languages.filter(l => l !== activeLang).map(lang => (
                        <button 
                          key={lang} 
                          className={styles.langOption}
                          onClick={() => { setActiveLang(lang); setIsLangOpen(false); }}
                        >
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Бургер (Мобильный) */}
              <button 
                className={`${styles.burgerBtn} ${isMobileMenuOpen ? styles.burgerActive : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className={styles.burgerLine} />
                <span className={styles.burgerLine} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={styles.mobileOverlay}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className={styles.mobileContainer}>
              <motion.nav className={styles.mobileNav}>
                {navLinks.map((link) => (
                  <div key={link.href} className={styles.mobileMask}>
                    <motion.div variants={itemVariants}>
                      <Link 
                        href={link.href} 
                        className={styles.mobileNavLink}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </motion.nav>
              
              <motion.div className={styles.mobileFooter} variants={itemVariants}>
                <div className={styles.mobileLangToggle}>
                  {languages.map(lang => (
                    <button 
                      key={lang}
                      className={`${styles.mobileLangBtn} ${activeLang === lang ? styles.mobileLangActive : ''}`}
                      onClick={() => setActiveLang(lang)}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <a href="mailto:sales@wamos.kz" className={styles.mobileEmail}>sales@wamos.kz</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}