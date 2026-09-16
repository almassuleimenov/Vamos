'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './CtaForm.module.css';

// 1. ДОБАВЛЕНО: Декларация для TypeScript, чтобы он не ругался на window.fbq
declare global {
  interface Window {
    fbq: any;
  }
}

const dict = {
  ru: {
    title: 'Обсудить покупку',
    subtitle:
      'Оставьте контактные данные для организации приватного показа и обсуждения условий покупки здания целиком.',
    nameLabel: 'Имя',
    namePlaceholder: 'Ваше имя',
    phoneLabel: 'Телефон',
    phonePlaceholder: '+7 (___) ___-__-__',
    submit: 'Забронировать просмотр',
    submitting: 'Отправка...',
    disclaimer: 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.',
    successTitle: 'Запрос принят',
    successText: 'Наш представитель свяжется с вами в ближайшее время.',
  },
  kz: {
    title: 'Сатып алуды талқылау',
    subtitle:
      'Жеке көрсетілімді ұйымдастыру және ғимаратты толығымен сатып алу шарттарын талқылау үшін байланыс деректеріңізді қалдырыңыз.',
    nameLabel: 'Аты',
    namePlaceholder: 'Атыңыз',
    phoneLabel: 'Телефон',
    phonePlaceholder: '+7 (___) ___-__-__',
    submit: 'Көрсетілімге жазылу',
    submitting: 'Жіберілуде...',
    disclaimer: 'Батырманы басу арқылы сіз құпиялылық саясатымен келісесіз.',
    successTitle: 'Сұраныс қабылданды',
    successText: 'Біздің өкіліміз жақын арада сізбен хабарласады.',
  },
  en: {
    title: 'Discuss purchase',
    subtitle:
      'Leave your contact details to arrange a private viewing and discuss the terms for purchasing the entire building.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    phoneLabel: 'Phone',
    phonePlaceholder: '+7 (___) ___-__-__',
    submit: 'Book a viewing',
    submitting: 'Sending...',
    disclaimer: 'By clicking the button, you agree to the privacy policy.',
    successTitle: 'Request received',
    successText: 'Our representative will contact you shortly.',
  },
} as const;

type Lang = keyof typeof dict;

interface CtaFormProps {
  lang: string;
}

// Кинематографичная кривая для входов
const customEase = [0.16, 1, 0.3, 1] as any;
// Упругая пружина для интерактивных элементов (кнопки)
const tapSpring = { type: 'spring', mass: 0.8, stiffness: 250, damping: 25 } as any;

export default function CtaForm({ lang }: CtaFormProps) {
  const t = dict[(lang as Lang)] ?? dict.ru;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  // Жесткая маска для телефона +7 (___) ___-__-__
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numbers = input.replace(/\D/g, '');

    if (!numbers) {
      setPhone('');
      return;
    }

    let phoneValue = numbers;
    if (['7', '8', '9'].includes(phoneValue[0])) {
      if (phoneValue[0] === '8' || phoneValue[0] === '9') {
        phoneValue = '7' + (phoneValue[0] === '9' ? '9' + phoneValue.slice(1) : phoneValue.slice(1));
      }

      let formatted = '+7';
      if (phoneValue.length > 1) formatted += ' (' + phoneValue.substring(1, 4);
      if (phoneValue.length >= 5) formatted += ') ' + phoneValue.substring(4, 7);
      if (phoneValue.length >= 8) formatted += '-' + phoneValue.substring(7, 9);
      if (phoneValue.length >= 10) formatted += '-' + phoneValue.substring(9, 11);

      setPhone(formatted);
    } else {
      setPhone('+' + numbers);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (phone.length < 18) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      });

      if (!res.ok) {
        // Читаем реальную ошибку от Next.js
        const errorData = await res.json().catch(() => ({}));
        console.error('💥 Детали ошибки от сервера:', errorData);
        throw new Error(`Бэкенд вернул ${res.status}: ${errorData.error || 'Неизвестная ошибка'}`);
      }
      
      // 2. ДОБАВЛЕНО: Триггер Meta Pixel после успешного ответа сервера
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead');
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Ошибка при отправке:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Варианты для контейнера (каскад)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  // Mask Reveal для типографики
  const textVariants = {
    hidden: { y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 },
    show: {
      y: '0%',
      opacity: 1,
      transition: { duration: 1.2, ease: customEase },
    },
  } as any;

  // Варианты для смены состояний формы (Form <-> Success)
  const formStateVariants = {
    initial: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: customEase } },
    exit: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, y: -10, transition: { duration: 0.4, ease: 'easeOut' } },
  } as any;

  return (
    <section className={styles.cta} id="contacts">
      <div className={styles.container}>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >

          {/* Левая колонка: Текст */}
          <div className={styles.textCol}>
            <div className={styles.mask}>
              <motion.h2 variants={textVariants} className={styles.title}>
                {t.title}
              </motion.h2>
            </div>
            <div className={styles.mask}>
              <motion.p variants={textVariants} className={styles.subtitle}>
                {t.subtitle}
              </motion.p>
            </div>
          </div>

          {/* Правая колонка: Форма */}
          <motion.div
            className={styles.formCol}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: customEase, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  className={styles.successState}
                  variants={formStateVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className={styles.successIcon}>+</div>
                  <h3 className={styles.successTitle}>{t.successTitle}</h3>
                  <p className={styles.successText}>{t.successText}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className={styles.form}
                  variants={formStateVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >

                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>{t.nameLabel}</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.input}
                      placeholder={t.namePlaceholder}
                      required
                      disabled={isSubmitting}
                    />
                    {/* GPU-анимированная линия фокуса */}
                    <div className={styles.inputFocusLine} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.label}>{t.phoneLabel}</label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={styles.input}
                      placeholder={t.phonePlaceholder}
                      required
                      disabled={isSubmitting}
                    />
                    <div className={styles.inputFocusLine} />
                  </div>

                  <motion.button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting || phone.length < 18}
                    whileTap={isSubmitting || phone.length < 18 ? {} : { scale: 0.97 }}
                    transition={tapSpring}
                  >
                    {isSubmitting ? t.submitting : t.submit}
                  </motion.button>

                  <p className={styles.disclaimer}>
                    {t.disclaimer}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}