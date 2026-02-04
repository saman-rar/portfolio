'use client';

import { use, useEffect, useState } from 'react';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { AboutSection } from '@/components/about-section';
import { ResumeSection } from '@/components/resume-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { SkillsTabSection } from '@/components/skills-tab-section';
import { ContactSection } from '@/components/contact-section-new';
import { profileData, aboutData, resumeData } from '@/lib/portfolio-data';

interface LocalePageProps {
  params: { locale: string };
  searchParams: { section: string };
}

export default function Home({ params, searchParams }: LocalePageProps) {
  //@ts-expect-error
  const paramSection = use(searchParams).section;
  //@ts-expect-error
  const { locale } = use(params);
  const [activeSection, setActiveSection] = useState(paramSection || 'about');

  // Use English or Persian data based on locale
  const translations =
    locale === 'en' ? getEnglishTranslations() : getPerisanTranslations();

  return (
    <div
      dir={locale === 'en' ? 'ltr' : 'rtl'}
      className='min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12'
    >
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col lg:flex-row-reverse gap-3 sm:gap-4 md:gap-6'>
          {/* Main Content */}
          <main className='flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden'>
            {/* Navigation */}
            <nav className='flex gap-1 sm:gap-2 md:gap-4 p-3 sm:p-4 md:p-6 border-b border-border overflow-x-auto scrollbar-hide'>
              {translations.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                  }}
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
                <AboutSection data={aboutData} locale={locale} />
              )}
              {activeSection === 'education' && (
                <ResumeSection data={resumeData} />
              )}
              {activeSection === 'portfolio' && <PortfolioSection />}
              {activeSection === 'skills' && <SkillsTabSection />}
              {activeSection === 'contact' && <ContactSection />}
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
      { id: 'skills', label: 'مهارتها' },
      { id: 'contact', label: 'تماس' },
    ],
  };
}
