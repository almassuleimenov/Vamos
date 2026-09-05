'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from './CtaForm.module.css';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function CtaForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Обращаемся к нашему безопасному внутреннему API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Ошибка сервера при обработке запроса');

      setStatus('success');
      setFormData({ name: '', company: '', phone: '', message: '' });
      
      // Возврат в исходное состояние через 5 секунд
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className={styles.ctaSection}>
      <div className={styles.grid}>
        
        {/* Информационный блок */}
        <div className={styles.infoBlock}>
          <div className={styles.metaRow}>
            <span className={styles.monoBadge}>REQ_FORM // 01</span>
          </div>
          <h2 className={styles.heading}>Инициация диалога</h2>
          <p className={styles.description}>
            Оставьте параметры вашего запроса. Управляющая компания свяжется с вами для предоставления закрытой финансовой модели и графика реализации объекта.
          </p>
          <div className={styles.legalMeta}>
            <span className={styles.legalText}>
              Отправляя форму, вы подтверждаете согласие с протоколом обработки данных.
            </span>
          </div>
        </div>

        {/* Форма */}
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>Представитель / ФИО *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={styles.input}
                placeholder="Иванов Иван"
                value={formData.name}
                onChange={handleChange}
                disabled={status === 'loading' || status === 'success'}
              />
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="company" className={styles.label}>Организация</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className={styles.input}
                  placeholder="Название компании"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="phone" className={styles.label}>Контактный номер *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={styles.input}
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>Предмет запроса</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className={styles.textarea}
                placeholder="Укажите интересующую площадь или цель обращения..."
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading' || status === 'success'}
              />
            </div>

            <div className={styles.submitWrapper}>
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={status === 'loading' || status === 'success'}
                data-status={status}
              >
                <AnimatePresence mode="wait">
                  {status === 'idle' && (
                    <motion.span key="idle" className={styles.btnContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      ОТПРАВИТЬ ЗАПРОС <Send size={16} strokeWidth={1.5} />
                    </motion.span>
                  )}
                  {status === 'loading' && (
                    <motion.span key="loading" className={styles.btnContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      ОБРАБОТКА...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <motion.span key="success" className={styles.btnContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      ЗАПРОС ПРИНЯТ <CheckCircle2 size={16} strokeWidth={1.5} />
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" className={styles.btnContent} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      ОШИБКА СЕТИ <AlertCircle size={16} strokeWidth={1.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
            
          </form>
        </div>

      </div>
    </section>
  );
}