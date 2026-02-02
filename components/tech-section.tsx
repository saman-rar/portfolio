import { Skill } from '@/lib/db';
import TechCard from './tech-card';
import Button from './button';

export function TechSection({ techs }: { techs: Skill[] }) {
  return (
    <section className='mx-auto max-w-7xl p-6 lg:px-8'>
      <div className='flex justify-between items-center mb-12'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
          Techs
        </h2>
        <Button href='/en?section=skills'>Home</Button>
      </div>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {techs.map((tech) => (
          <TechCard
            yearsOfExperience={tech.yearsOfExperience}
            key={tech.id}
            icon={tech.icon}
            description={tech.description_en}
            category={tech.category.name}
            name={tech.name}
          />
        ))}
      </div>
    </section>
  );
}
