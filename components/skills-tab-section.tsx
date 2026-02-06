'use client';

import { useEffect, useState } from 'react';
import { Prisma } from '@/lib/generated/prisma/client';
import Button from './button';
import SkillCard from './skill-card';
import SkillModal from './skill-modal';
import { cn } from '@/lib/utils';

type Skill = Prisma.SkillGetPayload<{
  include: { category: true; projects: true };
}>;

type Category = Prisma.CategoryGetPayload<{
  include: { projects: { include: { techs: true; categories: true } } };
}>;

export function SkillsTabSection({ locale }: { locale: 'en' | 'fa' }) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetch(`/api/categories`)
      .then((res) => res.json())
      .then((data: Category[]) => console.log(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/skills?category=${activeFilter}`)
      .then((res) => res.json())
      .then((data: Skill[]) => setSkills(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, [activeFilter]);

  return (
    <>
      <div className='space-y-8 md:space-y-10 min-h-[54vh]'>
        <div>
          <div className='flex justify-between mb-4'>
            <h2 className='text-2xl md:text-3xl font-bold text-foreground'>
              {locale === 'en' ? 'Skills' : 'مهارت ها'}
            </h2>
            <Button href={`/${locale}/techs`}>
              {locale === 'en' ? 'All Techs' : 'نمایش همه'}
            </Button>
          </div>
          <div
            className={cn('h-1 bg-accent rounded-full mb-6', {
              'w-18': locale === 'en',
              'w-27': locale === 'fa',
            })}
          />
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
              onClick={() => setActiveFilter(category.name)}
              className={`px-4 md:px-5  py-3 md:py-4 rounded-xl text-xs md:text-sm font-medium capitalize transition-all text-nowrap ${
                activeFilter === category.name
                  ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4'>
          {skills.map((skill, index) => {
            const isLast = index === skills.length - 1;
            const isOdd = skills.length % 2 === 1;

            console.log(isLast, isOdd);
            return (
              <SkillCard
                locale={locale}
                skill={skill}
                isOddOrLast={isLast && isOdd}
                setSelectedSkill={setSelectedSkill}
              />
            );
          })}
        </div>
      </div>

      {selectedSkill && (
        <SkillModal
          locale={locale}
          skill={selectedSkill}
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </>
  );
}
