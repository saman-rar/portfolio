import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import type React from 'react';

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale = (await params.locale) || 'en';

  return (
    <>
      <div className='fixed top-2 right-2 md:top-3 md:right-3 z-50 flex flex-col gap-3'>
        <ThemeToggle />
        {/* <LanguageToggle locale={locale} /> */}
      </div>
      {children}
    </>
  );
}
