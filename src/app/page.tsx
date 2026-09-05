import Hero from '@/components/Hero/Hero';
import styles from './page.module.css';
import About from '@/components/About/About';
import Gallery from '@/components/Gallery/Gallery';
import Location from '@/components/Location/Location';
import Footer from '@/components/Footer/Footer';


export default function Home() {
  return (
    <main className={styles.main}>
      <Hero/>
      <About/>
      <Gallery/>
      <Location/>
      <Footer/>
      
      
      
    
    </main>
  );
}