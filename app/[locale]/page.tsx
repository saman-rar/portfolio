'use client';

import { useState } from 'react';
import { ProfileSidebar } from '@/components/profile-sidebar';
import { AboutSection } from '@/components/about-section';
import { ResumeSection } from '@/components/resume-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { SkillsTabSection } from '@/components/skills-tab-section';
import { ContactSection } from '@/components/contact-section-new';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import {
  profileData,
  aboutData,
  resumeData,
  portfolioData,
  contactData,
} from '@/lib/portfolio-data';

interface LocalePageProps {
  params: { locale: string };
}

export default function Home({ params }: LocalePageProps) {
  const [activeSection, setActiveSection] = useState('about');
  const locale = params.locale || 'en';

  // Use English or Persian data based on locale
  const translations =
    locale === 'fa' ? getPerisanTranslations() : getEnglishTranslations();

  return (
    <div className='min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12'>
      <div className='fixed top-4 left-4 md:top-6 md:left-6 z-50 flex flex-col gap-3'>
        <ThemeToggle />
        <LanguageToggle locale={locale} />
      </div>

      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col lg:flex-row-reverse gap-3 sm:gap-4 md:gap-6'>
          <ProfileSidebar data={profileData} locale={locale} />

          {/* Main Content */}
          <main className='flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden'>
            {/* Navigation */}
            <nav className='flex gap-1 sm:gap-2 md:gap-4 p-3 sm:p-4 md:p-6 border-b border-border overflow-x-auto scrollbar-hide'>
              {translations.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize transition-colors whitespace-nowrap flex-shrink-0 ${
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
              {activeSection === 'about' && <AboutSection data={aboutData} />}
              {activeSection === 'resume' && (
                <ResumeSection data={resumeData} />
              )}
              {activeSection === 'portfolio' && (
                <PortfolioSection data={portfolioData} />
              )}
              {activeSection === 'skills' && (
                <SkillsTabSection data={resumeData} />
              )}
              {activeSection === 'contact' && (
                <ContactSection data={contactData} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function getEnglishTranslations() {
  return {
    sections: [
      { id: 'about', label: 'about' },
      { id: 'resume', label: 'resume' },
      { id: 'portfolio', label: 'portfolio' },
      { id: 'skills', label: 'skills' },
      { id: 'contact', label: 'contact' },
    ],
  };
}

function getPerisanTranslations() {
  return {
    sections: [
      { id: 'about', label: '' },
      { id: 'resume', label: '' },
      { id: 'portfolio', label: '' },
      { id: 'skills', label: '' },
      { id: 'contact', label: '' },
    ],
  };
}
