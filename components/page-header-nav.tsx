'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Moon, Sun, ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface PageHeaderNavProps {
  pageTitle: string;
  homePath: string;
  locale: string;
  homeRef: React.RefObject<HTMLElement | null>;
}

export function PageHeaderNav({
  pageTitle,
  homePath,
  locale,
  homeRef,
}: PageHeaderNavProps) {
  const [isScrolledPastHome, setIsScrolledPastHome] = useState(false);
  const [visible, setVisible] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const router = useRouter();
  const pathname = usePathname();

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Observe when user scrolls PAST the home button
  useEffect(() => {
    const homeEl = homeRef.current;
    if (!homeEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrolledPast =
          !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        setIsScrolledPastHome(scrolledPast);
      },
      { threshold: 0, rootMargin: '0px' },
    );

    observer.observe(homeEl);
    return () => observer.disconnect();
  }, [homeRef]);

  // Scroll-based show/hide
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 10) {
          setVisible(true);
        } else if (currentScrollY > lastScrollY.current + 5) {
          setVisible(false);
        } else if (currentScrollY < lastScrollY.current - 5) {
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
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  // Only render when user has scrolled past the home button
  if (!isScrolledPastHome) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className='flex items-center justify-between border-b border-white/15 bg-card px-4 py-2.5 shadow-lg shadow-black/40'>
        {/* Page Title */}
        <h1 className='text-lg font-bold text-foreground md:text-xl'>
          {pageTitle}
        </h1>

        {/* Center: Home Link */}
        <div className='flex-1 flex justify-center'>
          <Link
            href={homePath}
            className='flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors'
          >
            {locale === 'en' ? 'Home' : 'صفحه اصلی'}
            {locale === 'en' ? (
              <ArrowRight className='h-4 w-4' />
            ) : (
              <ArrowLeft className='h-4 w-4' />
            )}
          </Link>
        </div>

        {/* Right: Theme & Language Toggles */}
        <div className='flex items-center gap-1.5 shrink-0'>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground'
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? (
              <Sun className='h-4 w-4 text-accent' />
            ) : (
              <Moon className='h-4 w-4 text-accent' />
            )}
          </button>

          {/* Divider */}
          <div className='h-5 w-px bg-border' />

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xs font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
            aria-label='Toggle language'
          >
            {locale === 'en' ? 'FA' : 'EN'}
          </button>
        </div>
      </div>
    </div>
  );
}
