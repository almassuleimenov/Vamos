import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';
import SmoothScroll from '@/ui/SmoothScroll/SmoothScroll';
import './globals.css';

// Основной гротеск: используем локальный вариативный woff2
const fontDisplay = localFont({
  src: './fonts/Satoshi-Variable.woff2',
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

export const metadata: Metadata = {
  title: 'Институт Коммуникации | Коммерческая недвижимость',
  description:
    'Премиальное 2-этажное коммерческое здание с подвалом на пр. Аль-Фараби, 75/2. Площадь: 1071.4 м². Архитектурный проект.',
  keywords: [
    'коммерческая недвижимость',
    'Аль-Фараби',
    'БЦ',
    'Институт коммуникации',
    'Алматы',
  ],
  authors: [{ name: 'IC' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${fontDisplay.variable} ${fontMono.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}