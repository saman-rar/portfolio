'use client';

import { useState } from 'react';
import TechCard from './tech-card';
import Button from './button';
import SkillModal from './skill-modal';
import { techs as allTechs } from '@/lib/portfolio-data';

type Skill = (typeof allTechs)[0];

interface TechSectionProps {
  techs: typeof allTechs;
  locale: 'en' | 'fa';
}

export function TechSection({ techs, locale }: TechSectionProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <>
      <section className='mx-auto max-w-7xl p-6 lg:px-8'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {techs.map((tech) => (
            <TechCard
              locale={locale}
              yearsOfExperience={tech.yearsOfExperience}
              key={tech.name}
              icon={tech.icon}
              description={
                locale === 'en' ? tech.description_en : tech.description_fa
              }
              category={tech.category}
              name={tech.name}
              onClick={() => setSelectedSkill(tech)}
            />
          ))}
        </div>
      </section>

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
