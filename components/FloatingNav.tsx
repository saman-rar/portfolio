'use client';

import { Globe, Globe2, Home, Moon, Sun } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface FloatingNavProps {
  locale: string;
  hidden?: boolean;
  title: string;
  href: string;
}

export function FloatingNav({
  locale,
  hidden = false,
  title,
  href,
}: FloatingNavProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const router = useRouter();
  const pathname = usePathname();
  const section = useSearchParams().get('section');

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Scroll-based visibility
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 10) {
          // At the very top, always show
          setVisible(true);
        } else if (currentScrollY > lastScrollY.current) {
          // Scrolling down - hide
          setVisible(false);
        } else {
          // Scrolling up - show
          setVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fa' : 'en';
    if (section) {
      router.push(`/${newLocale}?section=${section}`, { scroll: false });
    } else {
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPath, { scroll: false });
    }
  };

  return (
    <div
      className={`fixed top-3 md:top-5 right-0 left-0 max-w-7xl md:px-15 lg:px-20 px-8 mx-auto z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible && !hidden
          ? 'translate-y-0'
          : '-translate-y-[calc(100%+2rem)] pointer-events-none'
      }`}
    >
      <div
        className={`flex items-center justify-between rounded-full bg-background/70 dark:bg-background/50 border border-border dark:border-white/12 px-7 lg:px-10 py-2 lg:py-3 shadow-md dark:shadow-white/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1) ${visible && !hidden ? 'backdrop-blur-sm opacity-100' : 'backdrop-blur-0 opacity-0'}`}
      >
        <Link
          href={href}
          className='text-xl md:text-2xl font-semibold text-accent dark:text-white'
        >
          {title}
        </Link>
        <div className='flex items-center gap-1 md:gap-1.5 lg:gap-1.75'>
          <button
            onClick={toggleLanguage}
            className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:text-accent'
            aria-label='Toggle theme'
          >
            <Globe className='h-4 w-4 md:h-5 md:w-5' />
          </button>

          <div className='h-5 w-px bg-foreground' />

          <button
            onClick={toggleTheme}
            className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:text-accent'
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? (
              <Sun className='h-4 w-4 md:h-5 md:w-5' />
            ) : (
              <Moon className='h-4 w-4 md:h-5 md:w-5' />
            )}
          </button>

          <div className='h-5 w-px bg-foreground' />

          <Link
            href={`/${locale}?section=${title === 'Techs' || title === 'ابزار ها' ? 'skills' : 'portfolio'}`}
            className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:text-accent'
            aria-label='Toggle theme'
          >
            <Home className='h-4 w-4 md:h-5 md:w-5' />
          </Link>
        </div>
      </div>
    </div>
  );
}
