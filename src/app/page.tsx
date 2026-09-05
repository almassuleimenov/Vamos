import Hero from '@/components/Hero/Hero';
import styles from './page.module.css';
import About from '@/components/About/About';
import Gallery from '@/components/Gallery/Gallery';


export default function Home() {
  return (
    <main className={styles.main}>
      <Hero/>
      <About/>
      <Gallery/>
      
      
      
    
    </main>
  );
}