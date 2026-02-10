'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface FloatingPillProps {
  locale: string;
}

export function FloatingPill({ locale }: FloatingPillProps) {
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
      router.push(`/${newLocale}?section=${section}`);
    } else {
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPath);
    }
  };

  return (
    <div
      className={`fixed top-3 right-3 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-[calc(100%+2rem)] opacity-0'
      }`}
    >
      <div className="flex items-center gap-1 rounded-full border border-foreground/[0.08] bg-foreground/[0.06] px-1.5 py-1.5 shadow-lg backdrop-blur-xl">
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-foreground/10"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-foreground/80" />
          ) : (
            <Moon className="h-4 w-4 text-foreground/80" />
          )}
        </button>

        <div className="h-5 w-px bg-foreground/10" />

        <button
          onClick={toggleLanguage}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xs font-semibold text-foreground/80 transition-colors hover:bg-foreground/10"
          aria-label="Toggle language"
          title={locale === 'en' ? 'Switch to Persian' : 'Switch to English'}
        >
          {locale === 'en' ? 'FA' : 'EN'}
        </button>
      </div>
    </div>
  );
}
