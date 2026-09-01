import Hero from '@/components/Hero/Hero';
import styles from './page.module.css';
import About from '@/components/About/About';
import Specifications from '@/components/Specifications/Specifications';
import FloorPlans from '@/components/FloorPlans/FloorPlans';


export default function Home() {
  return (
    <main className={styles.main}>
      <Hero/>
      <About/>
      <Specifications/>
      <FloorPlans/>
      
      
    
    </main>
  );
}