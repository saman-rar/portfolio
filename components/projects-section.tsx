import { ProjectCard } from './project-card';
import Button from './button';
import { projects } from '@/lib/portfolio-data';

interface ProjectsSectionProps {
  projects: typeof projects;
  locale: 'en' | 'fa';
}

export function ProjectsSection({ projects, locale }: ProjectsSectionProps) {
  return (
    <section className='mx-auto max-w-7xl p-6 lg:px-8 min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-160px)]'>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            image={project.image}
            description={project.description}
            tags={project.techs}
            title={project.title}
          />
        ))}
      </div>
    </section>
  );
}
