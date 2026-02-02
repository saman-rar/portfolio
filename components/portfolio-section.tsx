'use client';

import { useEffect, useState } from 'react';
import { Prisma } from '@/lib/generated/prisma/client';
import ProtfolioCard from './portfolio-card';
import Button from './button';

type Category = Prisma.CategoryGetPayload<{
  include: { projects: { include: { techs: true; categories: true } } };
}>;

type Project = Prisma.ProjectGetPayload<{
  include: { techs: true; categories: true };
}>;

export function PortfolioSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');

  useEffect(() => {
    fetch(`/api/projects`)
      .then((res) => res.json())
      .then((data: Project[]) => setAllProjects(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/categories`)
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  const filteredProjects: Project[] =
    activeFilter === 'all' ? allProjects : activeFilter.projects;

  return (
    <div className='space-y-6 md:space-y-8 min-h-[54vh]'>
      <div>
        <div className='flex justify-between mb-4'>
          <h2 className='text-2xl md:text-3xl font-bold text-foreground'>
            Portfolio
          </h2>
          <Button href='/en/projects'>All Projects</Button>
        </div>
        <div className='w-30 h-1 bg-accent rounded-full mb-6' />
      </div>

      {/* Filter Buttons */}
      <div className='pb-3 flex overflow-x-auto gap-2 md:gap-3'>
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 md:px-5  py-3 md:py-4 rounded-xl text-xs md:text-sm font-medium capitalize transition-all text-nowrap ${
            activeFilter === 'all'
              ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
              : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
          }`}
        >
          {'All'}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category)}
            className={`px-4 md:px-5  py-3 md:py-4 rounded-xl text-xs md:text-sm font-medium capitalize transition-all text-nowrap ${
              activeFilter === category
                ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
            }`}
          >
            {category.name}
          </button>
        ))}
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
