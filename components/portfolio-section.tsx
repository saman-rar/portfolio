'use client';

import { useState } from 'react';
import ProtfolioCard from './portfolio-card';
import Button from './button';
import { categories } from '@/lib/portfolio-data';

export function PortfolioSection({ locale }: { locale: string }) {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const category = categories.find((c) => c.name === activeFilter);

  const filteredProjects = category ? category.projects : [];

  return (
    <div className='space-y-6 md:space-y-8 min-h-[54vh]'>
      <div>
        <div className='flex justify-between mb-4'>
          <h2 className='text-2xl md:text-3xl font-bold text-foreground'>
            {locale === 'en' ? 'Portfolio' : 'پروژه ها'}
          </h2>
          <Button href={`/${locale}/projects`}>
            {locale === 'en' ? 'All Projects' : 'نمایش همه'}
          </Button>
        </div>
        <div className='w-30 h-1 bg-accent rounded-full mb-6' />
      </div>

      {/* Filter Buttons */}
      <div className='pb-3 flex overflow-x-auto gap-2 md:gap-3'>
        <button
          onClick={() => setActiveFilter('All')}
          className={`px-4 md:px-5  py-3 md:py-4 rounded-xl text-xs md:text-sm font-medium capitalize transition-all text-nowrap ${
            activeFilter === 'All'
              ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
              : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveFilter('Front-End')}
          className={`px-4 md:px-5  py-3 md:py-4 rounded-xl text-xs md:text-sm font-medium capitalize transition-all text-nowrap ${
            activeFilter === 'Front-End'
              ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
              : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
          }`}
        >
          Front-End
        </button>
        <button
          onClick={() => setActiveFilter('Back-End')}
          className={`px-4 md:px-5  py-3 md:py-4 rounded-xl text-xs md:text-sm font-medium capitalize transition-all text-nowrap ${
            activeFilter === 'Back-End'
              ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
              : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
          }`}
        >
          Back-End
        </button>
      </div>

      <div
        className={
          filteredProjects.length === 1
            ? 'flex xl:px-15'
            : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'
        }
      >
        {filteredProjects.map((project) => (
          <ProtfolioCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
