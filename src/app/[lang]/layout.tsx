import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';
import SmoothScroll from '@/ui/SmoothScroll/SmoothScroll';
import '../globals.css';
import Preloader from '@/components/Preloader/Preloader';
import Navbar from '@/components/Navbar/Navbar';

// Основной гротеск: используем локальный вариативный woff2
const fontDisplay = localFont({
  src: '../fonts/Satoshi-Variable.woff2',
  variable: '--font-display',
  display: 'swap',
  weight: '300 900',
  style: 'normal',
});

// Моноширинный шрифт для ТЭП и цифр
const fontMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const locales = ['ru', 'kz', 'en'] as const;
type Locale = typeof locales[number];

const metaDict: Record<Locale, Metadata> = {
  ru: {
    title: 'VAMOS | Коммерческая недвижимость класса А',
    description:
      'Премиальные офисы и торговые площади на первой линии пр. Аль-Фараби, 75/2 в Алматы. Общая площадь: 1 071.4 м². Архитектурный проект.',
    keywords: [
      'VAMOS',
      'коммерческая недвижимость Алматы',
      'Аль-Фараби',
      'БЦ Vamos',
      'офисы класса А',
      'торговые площади',
      'аренда офиса Алматы',
    ],
  },
  kz: {
    title: 'VAMOS | А класты коммерциялық жылжымайтын мүлік',
    description:
      'Алматыдағы Әл-Фараби даңғылы, 75/2 бірінші желісіндегі премиум-класты кеңселер мен сауда алаңдары. Жалпы ауданы: 1 071.4 м². Сәулет жобасы.',
    keywords: [
      'VAMOS',
      'Алматыдағы коммерциялық жылжымайтын мүлік',
      'Әл-Фараби',
      'Vamos БО',
      'А класты кеңселер',
      'сауда алаңдары',
      'Алматыда кеңсе жалдау',
    ],
  },
  en: {
    title: 'VAMOS | Class A Commercial Real Estate',
    description:
      'Premium offices and retail spaces on the first line of Al-Farabi Ave, 75/2 in Almaty. Total area: 1,071.4 sq m. Architectural project.',
    keywords: [
      'VAMOS',
      'commercial real estate Almaty',
      'Al-Farabi',
      'Vamos Business Center',
      'Class A offices',
      'retail spaces',
      'office rental Almaty',
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = (locales as readonly string[]).includes(lang)
    ? (lang as Locale)
    : 'ru';

  return {
    ...metaDict[locale],
    authors: [{ name: 'VAMOS' }],
    robots: 'index, follow',
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const locale: Locale = (locales as readonly string[]).includes(lang)
    ? (lang as Locale)
    : 'ru';

  return (
    <html lang={locale}>
      <body
        className={`${fontDisplay.variable} ${fontMono.variable} antialiased`}
      >
        <Preloader />
        <Navbar lang={locale} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
