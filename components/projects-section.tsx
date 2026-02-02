import { Project } from '@/lib/db';
import { ProjectCard } from './project-card';
import Button from './button';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className='mx-auto max-w-7xl p-6 lg:px-8 min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-160px)]'>
      <div className='flex justify-between items-center mb-12'>
        <h2 className='text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
          Projects
        </h2>
        <Button href='/en/?section=portfolio'>Home</Button>
      </div>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            image={project.image}
            description={project.description}
            tags={project.techs.map((tech) => tech.name)}
            title={project.title}
          />
        ))}
      </div>
    </section>
  );
}
