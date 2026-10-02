'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { other, type Locale } from '@/lib/i18n';

/** The same page in the other language. */
export function LangSwitch({ locale, label, short }: { locale: Locale; label: string; short: string }) {
  const path = usePathname() ?? `/${locale}`;
  const target = other(locale);
  const href = path.replace(/^\/(ar|en)(?=\/|$)/, `/${target}`);
  return (
    <Link className="lang" href={href} hrefLang={target} lang={target} aria-label={label} title={label}>
      {short}
    </Link>
  );
}
