import type { Metadata } from 'next';
import { Playfair_Display, Manrope } from 'next/font/google';
import SmoothScroll from '@/ui/SmoothScroll/SmoothScroll';
import './globals.css';

// Display шрифт для заголовков (монументальный сериф)
const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-display',
  display: 'swap',
});

// Body шрифт заменен на Manrope: строгая геометрия, идеальная поддержка кириллицы
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Институт Коммуникаций | Аль-Фараби 75/2',
  description: 'Премиальное коммерческое пространство. Офисы и детейлинг.',
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="ru" 
      className={`${playfair.variable} ${manrope.variable}`}
    >
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}