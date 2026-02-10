import { FloatingPill } from '@/components/floating-pill';
import type React from 'react';

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = (await params) || 'en';

  return (
    <>
      <FloatingPill locale={locale} />
      {children}
    </>
  );
}
