import Hero from '@/components/Hero/Hero';
import styles from './page.module.css';
import About from '@/components/About/About';
import Gallery from '@/components/Gallery/Gallery';
import Location from '@/components/Location/Location';
import Footer from '@/components/Footer/Footer';
import CtaForm from '@/components/CtaForm/CtaForm';
import { FloatingSocials } from '@/components/FloatingSocials/FloatingSocials';
import FloorPlans from '@/components/FloorPlans/FloorPlans';

interface PageProps {
  params: {
    lang: string;
  };
}

export default function Home({ params: { lang } }: PageProps) {
  return (
    <main className={styles.main}>
      <Hero lang={lang} />
      <About lang={lang} />
      <FloorPlans lang={lang} />
      <Gallery lang={lang} />
      <Location lang={lang} />
      <CtaForm lang={lang} />
      <Footer lang={lang} />

      <FloatingSocials lang={lang} />
    </main>
  );
}