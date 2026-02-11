'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Moon, Sun, MoreVertical } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Section {
  id: string;
  label: string;
}

interface MobileStickyNavProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  locale: string;
  navRef: React.RefObject<HTMLElement | null>;
  onVisibilityChange?: (isNavOffscreen: boolean) => void;
}

export function MobileStickyNav({
  sections,
  activeSection,
  onSectionChange,
  locale,
  navRef,
  onVisibilityChange,
}: MobileStickyNavProps) {
  const [isScrolledPastNav, setIsScrolledPastNav] = useState(false);
  const [visible, setVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const section = useSearchParams().get('section');

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Observe when user scrolls PAST the original nav (not just off-screen)
  // We use IntersectionObserver with rootMargin so that "not intersecting"
  // combined with a check on boundingClientRect tells us the nav is above viewport.
  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.boundingClientRect.bottom < 0 means the nav has been
        // scrolled above the top of the viewport (user scrolled past it).
        // If the nav is off-screen because the user hasn't reached it yet,
        // boundingClientRect.top will be positive/large, so we ignore that.
        const scrolledPast =
          !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        setIsScrolledPastNav(scrolledPast);
        onVisibilityChange?.(scrolledPast);
      },
      { threshold: 0, rootMargin: '0px' },
    );

    observer.observe(navEl);
    return () => observer.disconnect();
  }, [navRef, onVisibilityChange]);

  // Scroll-based show/hide
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 10) {
          setVisible(true);
        } else if (currentScrollY > lastScrollY.current + 5) {
          setVisible(false);
          setDropdownOpen(false);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdownOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    setDropdownOpen(false);
  };

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fa' : 'en';
    if (section) {
      router.push(`/${newLocale}?section=${section}`);
    } else {
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
      router.push(newPath);
    }
    setDropdownOpen(false);
  };

  // Only render on mobile/tablet when user has scrolled past the nav
  if (!isScrolledPastNav) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className='flex items-center border-b border-white/15 bg-card px-2 py-1.5 shadow-lg shadow-black/40'>
        {/* Scrollable section tabs */}
        <div className='flex-1 overflow-x-auto scrollbar-hide'>
          <div className='flex items-center gap-1 px-1'>
            {sections.map((s, idx) => (
              <button
                key={`section-${s.id}-${idx}`}
                onClick={() => onSectionChange(s.id)}
                className={`p-3 rounded-lg text-xs font-medium capitalize transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === s.id
                    ? 'bg-accent text-accent-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Three-dot dropdown for theme + language */}
        <div className='relative shrink-0' ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className='flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground'
            aria-label='More options'
          >
            <MoreVertical className='h-4 w-4 text-foreground hover:text-white' />
          </button>

          {dropdownOpen && (
            <div
              className={`absolute ${locale === 'fa' ? 'left-0' : 'right-0'} top-full mt-1.5 min-w-[160px] rounded-xl border border-border bg-card p-1.5 shadow-xl`}
            >
              <button
                onClick={toggleTheme}
                className='flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
              >
                {theme === 'dark' ? (
                  <Sun className='h-3.5 w-3.5 text-accent' />
                ) : (
                  <Moon className='h-3.5 w-3.5 text-accent' />
                )}
                {locale === 'en'
                  ? theme === 'dark'
                    ? 'Light Mode'
                    : 'Dark Mode'
                  : theme === 'dark'
                    ? 'حالت روشن'
                    : 'حالت تاریک'}
              </button>
              <button
                onClick={toggleLanguage}
                className='flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
              >
                <span className='flex h-3.5 w-3.5 items-center justify-center text-[10px] font-bold'>
                  {locale === 'en' ? 'FA' : 'EN'}
                </span>
                {locale === 'en' ? 'Persian' : 'English'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
