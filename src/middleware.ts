import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ru', 'kz', 'en'];
const defaultLocale = 'ru';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Ранний возврат для API-роутов. Middleware не должен трогать бэкенд.
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Если языка нет, перенаправляем на дефолтный (ru)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // 2. Добавлен 'api' в регулярное выражение игнорирования
  matcher: ['/((?!api|_next|photos|ama2|ama3|.*\\..*).*)'],
};