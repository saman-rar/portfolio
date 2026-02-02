'use client';

import { use, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { ProjectsSection } from '@/components/admin/projects';
import { SkillsSection } from '@/components/admin/skills';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function Home({
  searchParams,
}: {
  searchParams: { section: string };
}) {
  //@ts-expect-error
  const paramsSection = use(searchParams).section;
  const [activeSection, setActiveSection] = useState(
    paramsSection || 'projects',
  );

  const sections = [
    { id: 'projects', label: 'projects' },
    { id: 'skills', label: 'skills' },
  ];

  return (
    <div className='min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12'>
      <div className='fixed top-2 right-2 md:top-3 md:right-3 z-50 flex flex-col gap-3'>
        <ThemeToggle />
        <button
          onClick={() => signOut()}
          className='w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg text-accent cursor-pointer'
        >
          <LogOut />
        </button>
      </div>

      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col lg:flex-row-reverse gap-3 sm:gap-4 md:gap-6'>
          {/* Main Content */}
          <main className='flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden'>
            {/* Navigation */}
            <nav className='flex gap-1 sm:gap-2 md:gap-4 p-3 sm:p-4 md:p-6 border-b border-border overflow-x-auto scrollbar-hide'>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
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
              {activeSection === 'projects' && <ProjectsSection />}
              {activeSection === 'skills' && <SkillsSection />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
