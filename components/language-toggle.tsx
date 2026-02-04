'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface LanguageToggleProps {
  locale: string;
}

export function LanguageToggle({ locale }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const section = useSearchParams().get('section');

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
    <button
      onClick={toggleLanguage}
      className='w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg font-semibold text-sm'
      aria-label='Toggle language'
      title={locale === 'en' ? 'Switch to Persian' : 'Switch to English'}
    >
      {locale === 'en' ? 'FA' : 'EN'}
    </button>
  );
}
