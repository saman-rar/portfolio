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
  const [isNavOffscreen, setIsNavOffscreen] = useState(false);
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

  // Observe when the original nav scrolls out of view
  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const offscreen = !entry.isIntersecting;
        setIsNavOffscreen(offscreen);
        onVisibilityChange?.(offscreen);
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
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

  // Only render on mobile/tablet when nav is off-screen
  if (!isNavOffscreen) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="flex items-center border-b border-foreground/[0.08] bg-foreground/[0.06] px-2 py-2 shadow-lg backdrop-blur-xl">
        {/* Scrollable section tabs */}
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 px-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => onSectionChange(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === s.id
                    ? 'text-foreground bg-foreground/10'
                    : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Three-dot dropdown for theme + language */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-foreground/10"
            aria-label="More options"
          >
            <MoreVertical className="h-4 w-4 text-foreground/70" />
          </button>

          {dropdownOpen && (
            <div
              className={`absolute ${locale === 'fa' ? 'left-0' : 'right-0'} top-full mt-1.5 min-w-[160px] rounded-xl border border-foreground/[0.08] bg-foreground/[0.06] p-1.5 shadow-xl backdrop-blur-xl`}
            >
              <button
                onClick={toggleTheme}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground/80 transition-colors hover:bg-foreground/10"
              >
                {theme === 'dark' ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
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
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-foreground/80 transition-colors hover:bg-foreground/10"
              >
                <span className="flex h-3.5 w-3.5 items-center justify-center text-[10px] font-bold">
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
