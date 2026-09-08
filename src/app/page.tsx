import Hero from '@/components/Hero/Hero';
import styles from './page.module.css';
import About from '@/components/About/About';
import Gallery from '@/components/Gallery/Gallery';
import Location from '@/components/Location/Location';
import Footer from '@/components/Footer/Footer';
import CtaForm from '@/components/CtaForm/CtaForm';
import { FloatingSocials } from '@/components/FloatingSocials/FloatingSocials';


export default function Home() {
  return (
    <main className={styles.main}>
      <Hero/>
      <About/>
      {/* FLoorPlans */}
      <Gallery/>
      <Location/>
      <CtaForm/>
      <Footer/>



       <FloatingSocials />

    </main>
  );
}