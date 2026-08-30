import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';

// Настройка гротеска для наборного текста
const manrope = Manrope({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Аль-Фараби 75/2 | Премиальное коммерческое пространство',
  description: 'Эксклюзивные офисные и коммерческие площади в центре Алматы.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // В будущем здесь lang="ru" будет меняться динамически через i18n
    <html lang="ru" className={manrope.variable}>
      <body>
        {/* Здесь позже добавим Header и CustomCursor (если нужен) */}
        {children}
        {/* Здесь позже добавим Footer */}
      </body>
    </html>
  );
}