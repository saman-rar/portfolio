import type React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const vazirmatn = localFont({
  src: [
    {
      path: '../public/fonts/Vazir-Thin.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Vazir-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Vazir.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Vazir-Medium.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Vazir-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});
export const metadata: Metadata = {
  title: 'Saman Faraji - Front-Stack Developer',
  description:
    'Portfolio of Saman Faraji, a Front-End Developer specializing in modern web technologies',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon.png',
        media: '(prefers-color-scheme: dark)',
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
  const locale = await params?.locale;
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
