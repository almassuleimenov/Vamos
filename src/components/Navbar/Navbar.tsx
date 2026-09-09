'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './Navbar.module.css';

const locales = ['ru', 'kz', 'en'] as const;
type Locale = typeof locales[number];

const dict = {
  ru: {
    navLinks: [
      { label: 'О проекте', href: '#about' },
      { label: 'Галерея', href: '#gallery' },
      { label: 'Локация', href: '#location' },
      { label: 'Контакты', href: '#contacts' },
    ],
    toggleMenu: 'Открыть меню',
  },
  kz: {
    navLinks: [
      { label: 'Жоба туралы', href: '#about' },
      { label: 'Галерея', href: '#gallery' },
      { label: 'Орналасуы', href: '#location' },
      { label: 'Байланыстар', href: '#contacts' },
    ],
    toggleMenu: 'Мәзірді ашу',
  },
  en: {
    navLinks: [
      { label: 'About', href: '#about' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Location', href: '#location' },
      { label: 'Contacts', href: '#contacts' },
    ],
    toggleMenu: 'Toggle menu',
  },
} as const;

type Lang = keyof typeof dict;

interface NavbarProps {
  lang: string;
}

// Физика пружины для интерфейсных элементов
const springConfig = { type: 'spring', mass: 0.8, stiffness: 250, damping: 25 } as any;
// Кинематографичная кривая
const customEase = [0.16, 1, 0.3, 1];

// Заменяет текущий локаль-сегмент пути на новый, сохраняя остальную часть URL
function buildLocalePath(pathname: string, newLocale: Locale) {
  const rest = pathname.replace(/^\/(ru|kz|en)(\/|$)/, '/');
  const suffix = rest === '/' ? '' : rest;
  return `/${newLocale}${suffix}`;
}

export default function Navbar({ lang }: NavbarProps) {
  const t = dict[(lang as Lang)] ?? dict.ru;
  const activeLocale: Locale = (locales as readonly string[]).includes(lang) ? (lang as Locale) : 'ru';

  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === activeLocale) return;
    router.push(buildLocalePath(pathname, newLocale));
  };

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
  } as any;

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <div className={styles.grid}>

            {/* Логотип */}
            <div className={styles.logoCol}>
              <Link href={`/${activeLocale}`} className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
                WAMOS
              </Link>
            </div>

            {/* Десктопная навигация */}
            <nav className={styles.navCol}>
              {t.navLinks.map((link) => (
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
                  {activeLocale.toUpperCase()}
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
                      {locales.filter((l) => l !== activeLocale).map((locale) => (
                        <button
                          key={locale}
                          className={styles.langOption}
                          onClick={() => { switchLocale(locale); setIsLangOpen(false); }}
                        >
                          {locale.toUpperCase()}
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
                aria-label={t.toggleMenu}
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
                {t.navLinks.map((link) => (
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
                  {locales.map((locale) => (
                    <button
                      key={locale}
                      className={`${styles.mobileLangBtn} ${activeLocale === locale ? styles.mobileLangActive : ''}`}
                      onClick={() => { switchLocale(locale); setIsMobileMenuOpen(false); }}
                    >
                      {locale.toUpperCase()}
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