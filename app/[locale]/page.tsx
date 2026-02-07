'use client';

import { use, useState } from 'react';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { AboutSection } from '@/components/about-section';
import { ResumeSection } from '@/components/resume-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { SkillsTabSection } from '@/components/skills-tab-section';
import { ContactSection } from '@/components/contact-section-new';
import {
  profileData,
  aboutData,
  faAboutData,
  educationData,
  faEducationData,
} from '@/lib/portfolio-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface LocalePageProps {
  params: { locale: 'en' | 'fa' };
  searchParams: { section: string };
}

export default function Home({ params, searchParams }: LocalePageProps) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(
    //@ts-expect-error
    use(searchParams).section || 'about',
  );
  //@ts-expect-error
  const { locale } = use(params);

  if (locale !== 'en' && locale !== 'fa') {
    return notFound();
  }

  // Use English or Persian data based on locale
  const translations =
    locale === 'en' ? getEnglishTranslations() : getPerisanTranslations();

  const changeTabHandler = (section: string) => {
    setActiveSection(section);
    router.replace(`/en?section=${section}`);
  };

  return (
    <div
      dir={locale === 'en' ? 'ltr' : 'rtl'}
      className='min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12'
    >
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col lg:flex-row-reverse gap-3 sm:gap-4 md:gap-6'>
          {/* Main Content */}
          <main className='flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden order-1 lg:order-0'>
            {/* Navigation */}
            <nav className='flex justify-center md:justify-start gap-1 sm:gap-2 md:gap-4 p-3 sm:p-4 md:p-6 border-b border-border overflow-x-auto scrollbar-hide'>
              {translations.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => changeTabHandler(section.id)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap shrink-0 ${
                    activeSection === section.id
                      ? 'text-foreground bg-accent/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>

            <div className='p-4 sm:p-5 md:p-6 lg:p-8'>
              {activeSection === 'about' && (
                <AboutSection
                  data={locale === 'en' ? aboutData : faAboutData}
                  locale={locale}
                />
              )}
              {activeSection === 'education' && (
                <ResumeSection
                  data={locale === 'en' ? educationData : faEducationData}
                  locale={locale}
                />
              )}
              {activeSection === 'portfolio' && (
                <PortfolioSection locale={locale} />
              )}
              {activeSection === 'skills' && (
                <SkillsTabSection locale={locale} />
              )}
              {activeSection === 'contact' && (
                <ContactSection locale={locale} />
              )}
            </div>
          </main>
          <ProfileSidebar data={profileData} locale={locale} />
        </div>
      </div>
    </div>
  );
}

function getEnglishTranslations() {
  return {
    sections: [
      { id: 'about', label: 'about' },
      { id: 'education', label: 'Education' },
      { id: 'portfolio', label: 'portfolio' },
      { id: 'skills', label: 'skills' },
      { id: 'contact', label: 'contact' },
    ],
  };
}

function getPerisanTranslations() {
  return {
    sections: [
      { id: 'about', label: 'درباره من' },
      { id: 'education', label: 'تحصیلات' },
      { id: 'portfolio', label: 'پروژه ها' },
      { id: 'skills', label: 'مهارت ها' },
      { id: 'contact', label: 'تماس' },
    ],
  };
}
