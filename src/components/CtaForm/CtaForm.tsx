'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './CtaForm.module.css';

// Кинематографичная кривая для входов
const customEase = [0.16, 1, 0.3, 1] as any;
// Упругая пружина для интерактивных элементов (кнопки)
const tapSpring = { type: 'spring', mass: 0.8, stiffness: 250, damping: 25 } as any;

export default function CtaForm() {
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
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
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
      transition: { duration: 1.2, ease: customEase } 
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
                Обсудить проект
              </motion.h2>
            </div>
            <div className={styles.mask}>
              <motion.p variants={textVariants} className={styles.subtitle}>
                Оставьте контактные данные, и мы свяжемся с вами для организации 
                приватного показа здания и обсуждения коммерческих условий.
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
                  <h3 className={styles.successTitle}>Запрос принят</h3>
                  <p className={styles.successText}>Наш представитель свяжется с вами в ближайшее время.</p>
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
                    <label htmlFor="name" className={styles.label}>Имя</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.input}
                      placeholder="Ваше имя"
                      required
                      disabled={isSubmitting}
                    />
                    {/* GPU-анимированная линия фокуса */}
                    <div className={styles.inputFocusLine} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.label}>Телефон</label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={styles.input}
                      placeholder="+7 (___) ___-__-__"
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
                    {isSubmitting ? 'Отправка...' : 'Забронировать просмотр'}
                  </motion.button>
                  
                  <p className={styles.disclaimer}>
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
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