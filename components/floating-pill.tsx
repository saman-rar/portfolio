'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FloatingPillProps {
  locale: string;
  hidden?: boolean;
}

export function FloatingPill({ locale, hidden = false }: FloatingPillProps) {
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
      className={`fixed xl:absolute top-2 end-2 lg:top-4 lg:end-4 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible && !hidden
          ? 'translate-y-0 opacity-100'
          : '-translate-y-[calc(100%+2rem)] opacity-0 pointer-events-none'
      }`}
    >
      <div className='flex items-center gap-1 rounded-full bg-card border border-border dark:border-white/12 px-1.5 py-1.5 shadow-lg dark:shadow-white/5'>
        <button
          onClick={toggleTheme}
          className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-accent text-accent dark:text-white hover:text-accent-foreground'
          aria-label='Toggle theme'
        >
          {theme === 'dark' ? (
            <Sun className='h-4 w-4' />
          ) : (
            <Moon className='h-4 w-4' />
          )}
        </button>

        <div className='h-5 w-px bg-border' />

        <button
          onClick={toggleLanguage}
          className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xs font-semibold dark:text-white text-accent transition-colors hover:bg-accent hover:text-accent-foreground'
          aria-label='Toggle language'
          title={locale === 'en' ? 'Switch to Persian' : 'Switch to English'}
        >
          {locale === 'en' ? 'FA' : 'EN'}
        </button>
      </div>
    </div>
  );
}
