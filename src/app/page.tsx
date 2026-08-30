import styles from './page.module.css';
// Импорты компонентов (пока закомментированы, раскомментируешь при создании)
// import Hero from '@/components/Hero/Hero';
// import Specs from '@/components/Specs/Specs';
// import FloorPlans from '@/components/FloorPlans/FloorPlans';
// import Location from '@/components/Location/Location';
// import ContactForm from '@/components/ContactForm/ContactForm';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Каждая секция будет принимать в себя данные из словарей (i18n), 
        когда прикрутим локализацию. Пока просто собираем структуру.
      */}
      
      {/* <Hero /> */}
      {/* <Specs /> */}
      {/* <FloorPlans /> */}
      {/* <Location /> */}
      {/* <ContactForm /> */}
      
      <div className={styles.tempPlaceholder}>
        <h1>Al-Farabi 75/2</h1>
        <p>Компоненты загружаются...</p>
      </div>
    </main>
  );
}