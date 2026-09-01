import Hero from '@/components/Hero/Hero';
import styles from './page.module.css';
import About from '@/components/About/About';


export default function Home() {
  return (
    <main className={styles.main}>
      <Hero/>
      <About/>
      
      
    
    </main>
  );
}