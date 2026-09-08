'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import styles from './CtaForm.module.css';

export default function CtaForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Плавное появление секции
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Жесткая маска для телефона +7 (___) ___-__-__
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Оставляем только цифры
    const numbers = input.replace(/\D/g, '');
    
    if (!numbers) {
      setPhone('');
      return;
    }

    // Автоматически подставляем 7, если вводят 8 или 9
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
    if (phone.length < 18) return; // Простейшая валидация длины маски
    
    setIsSubmitting(true);
    // Имитация отправки данных
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <section 
      ref={sectionRef}
      className={`${styles.cta} ${isVisible ? styles.visible : ''}`} 
      id="contacts"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Левая колонка: Текст и призыв */}
          <div className={styles.textCol}>
            <h2 className={styles.title}>Обсудить проект</h2>
            <p className={styles.subtitle}>
              Оставьте контактные данные, и мы свяжемся с вами для организации приватного показа здания и обсуждения коммерческих условий.
            </p>
          </div>

          {/* Правая колонка: Форма */}
          <div className={styles.formCol}>
            {isSuccess ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>+</div>
                <h3 className={styles.successTitle}>Запрос принят</h3>
                <p className={styles.successText}>Наш представитель свяжется с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                
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
                </div>

                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isSubmitting || phone.length < 18}
                >
                  {isSubmitting ? 'Отправка...' : 'Забронировать просмотр'}
                </button>
                
                <p className={styles.disclaimer}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}