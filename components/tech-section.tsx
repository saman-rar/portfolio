import { Skill } from '@/lib/db';
import TechCard from './tech-card';
import Button from './button';

interface TechSectionProps {
  techs: Skill[];
  locale: 'en' | 'fa';
}

export function TechSection({ techs, locale }: TechSectionProps) {
  return (
    <section className='mx-auto max-w-7xl p-6 lg:px-8'>
      <div className='flex justify-between items-center mb-12'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
          {locale === 'en' ? 'Techs' : 'ابزار ها'}
        </h2>
        <Button href={`/${locale}?section=skills`}>
          {locale === 'en' ? 'Home' : 'صفحه اصلی'}
        </Button>
      </div>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {techs.map((tech) => (
          <TechCard
            locale={locale}
            yearsOfExperience={tech.yearsOfExperience}
            key={tech.id}
            icon={tech.icon}
            description={
              locale === 'en' ? tech.description_en : tech.description_fa
            }
            category={tech.category.name}
            name={tech.name}
          />
        ))}
      </div>
    </section>
  );
}
