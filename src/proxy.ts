import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// An address without a language gets one: Arabic when the browser asks for
// Arabic first, English otherwise.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (/^\/(ar|en)(\/|$)/.test(pathname)) return;
  const locale = /^\s*ar\b/i.test(request.headers.get('accept-language') ?? '') ? 'ar' : 'en';
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|demos|fonts|img|thumbs|icon.svg|og.png|favicon.ico|sitemap.xml|robots.txt).*)'],
};
