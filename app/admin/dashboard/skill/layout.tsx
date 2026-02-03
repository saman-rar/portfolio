import type React from 'react';
import type { Metadata } from 'next';
import { ThemeToggle } from '@/components/theme-toggle';

export const metadata: Metadata = {
  title: 'Saman Faraji - Skills',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12'>
      <div className='fixed top-2 right-2 md:top-3 md:right-3 z-50 flex flex-col gap-3'>
        <ThemeToggle />
      </div>

      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col lg:flex-row-reverse gap-3 sm:gap-4 md:gap-6'>
          {/* Main Content */}
          <main className='flex-1 rounded-xl md:rounded-2xl overflow-hidden'>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
