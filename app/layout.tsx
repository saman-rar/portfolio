import type React from 'react';
import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const vazirmatn = Vazirmatn({
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'John Doe - Full-Stack Developer',
  description:
    'Portfolio of John Doe, a Full-Stack Developer specializing in modern web technologies',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) {
  const locale = (await params?.locale) || 'en';
  const isRTL = locale === 'fa';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={`${vazirmatn.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
