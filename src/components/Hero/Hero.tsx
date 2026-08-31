import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image
          src="/photos/2.jpeg"
          alt="Институт коммуникации"
          fill
          priority
          quality={90}
          className={styles.image}
          sizes="100vw"
        />
        {/* Оверлей для затемнения и текстуры */}
        <div className={styles.overlay} />
      </div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>Институт коммуникации</h1>
      </div>
    </section>
  );
}