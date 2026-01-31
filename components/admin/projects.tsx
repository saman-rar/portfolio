'use client';

import { useEffect, useState } from 'react';
import { Edit, ExternalLink, Eye, Trash, X } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';
import { Prisma } from '@/lib/generated/prisma/client';
import Link from 'next/link';

interface ProjectsSectionProps {
  data?: typeof portfolioData;
}

// type Skill =Prisma.CategoryGetPayload<{
//       include: { projects: { include: { techs: true } } };
//     }>;

type Category = Prisma.CategoryGetPayload<{
  include: { projects: { include: { techs: true; categories: true } } };
}>;

type Project = Prisma.ProjectGetPayload<{
  include: { techs: true; categories: true };
}>;

export function ProjectsSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');
  const [removingProject, setRemovingProject] = useState<Project | null>(null);

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
    <>
      <div className='space-y-6 md:space-y-8 min-h-[54vh]'>
        <div>
          <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
            Projects
          </h2>
          <div className='w-30 h-1 bg-accent rounded-full mb-6' />
        </div>

        {/* Filter Buttons */}
        <div className='pb-3 flex overflow-x-auto gap-2 md:gap-3'>
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
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className='group relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/10'
            >
              <div className='aspect-4/3 overflow-hidden bg-background'>
                <img
                  src={project.image || '/placeholder.svg'}
                  alt={project.title}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
              </div>

              <div className='absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-6'>
                <h3 className='text-lg md:text-xl font-bold text-foreground mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                  {project.title}
                </h3>

                {/* Action Buttons */}
                <div className='flex gap-2 md:gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75'>
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className='flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-accent text-accent-foreground rounded-lg text-xs md:text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer'
                  >
                    <Edit className='w-3.5 h-3.5 md:w-4 md:h-4' />
                    Edit
                  </Link>
                  <button
                    onClick={() => setRemovingProject(project)}
                    className='flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-secondary border border-border text-foreground rounded-lg text-xs md:text-sm font-medium hover:bg-destructive hover:text-accent-foreground hover:border-destructive-foreground transition-colors cursor-pointer'
                  >
                    <Trash className='w-3.5 h-3.5 md:w-4 md:h-4' />
                    remove
                  </button>
                </div>
              </div>

              {/* Category Badge - Always visible */}
              <div className='absolute top-3 right-3 md:top-4 md:right-4 px-2.5 md:px-3 py-1 md:py-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-xs font-medium text-accent capitalize'>
                {project.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {removingProject && (
        <RemoveModal
          project={removingProject}
          isOpen={!!removingProject}
          onClose={() => setRemovingProject(null)}
        />
      )}
    </>
  );
}

interface RemoveModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

function RemoveModal({ project, isOpen, onClose }: RemoveModalProps) {
  if (!isOpen) return null;

  const removeHandler = () => {
    fetch(`/api/projects/${project.id}/remove`)
      .then(() => onClose())
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
      <div
        className='relative aspect-video max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border p-6 md:p-8 animate-in fade-in zoom-in-95'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 md:top-6 md:right-6 rtl:left-4 rtl:md:right6 w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center z-10'
          aria-label='Close modal'
        >
          <X className='w-5 h-5' />
        </button>

        {/* Title */}
        <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
          Are You Sure?
        </h2>
        <div className='w-55 h-1 bg-accent rounded-full mb-6' />

        {/* Description */}
        <p className='text-base md:text-lg mb-1 leading-relaxed'>
          {`Removing ${project.title}`}
        </p>
        <p className='text-base md:text-base text-muted-foreground leading-relaxed'>
          {`Are you sure you want to remove the ${project.title} project permanently?`}
        </p>
        <p className='text-base md:text-base text-muted-foreground mb-8 leading-relaxed'>
          This action cannot be undone.
        </p>
        <div className='grid grid-cols-2 gap-3'>
          <button
            onClick={onClose}
            className='bg-accent py-2 rounded-md cursor-pointer transition-all duration-100 ease-in-out hover:bg-accent/80'
          >
            Cancel
          </button>
          <button
            onClick={removeHandler}
            className='bg-secondary py-2 rounded-md cursor-pointer transition-all duration-100 ease-in-out hover:bg-destructive'
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
