'use client';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Eye } from 'lucide-react';
import { resumeData, portfolioData } from '@/lib/portfolio-data';
import { Prisma } from '@/lib/generated/prisma/client';

interface SkillModalProps {
  skill: Skill;
  isOpen: boolean;
  onClose: () => void;
}

function SkillModal({ skill, isOpen, onClose }: SkillModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  if (!isOpen) return null;

  const filteredProjects = skill.projects;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length,
    );
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
      <div
        className='relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border p-6 md:p-8 animate-in fade-in zoom-in-95'
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
          {skill.name}
        </h2>
        <div className='w-16 h-1 bg-accent rounded-full mb-6' />

        {/* Description */}
        <p className='text-base md:text-lg text-muted-foreground mb-8 leading-relaxed'>
          {skill.description ||
            `I have extensive experience with ${skill.name}, bringing professional expertise to every project.`}
        </p>

        {/* Filter Buttons */}
        {filteredProjects.length > 0 && (
          <>
            {/* Carousel */}
            {filteredProjects.length > 0 && (
              <div className='space-y-6'>
                {/* Project Card */}
                <div
                  onClick={() =>
                    window.open(
                      filteredProjects[currentSlide]?.liveUrl,
                      '_blank',
                    )
                  }
                  className='relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden cursor-pointer group'
                >
                  <div className='aspect-video overflow-hidden bg-background relative'>
                    <img
                      src={
                        filteredProjects[currentSlide]?.image ||
                        '/placeholder.svg'
                      }
                      alt={filteredProjects[currentSlide]?.title}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  </div>

                  <div className='absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/20 opacity-0 hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-6'>
                    <h3 className='text-xl md:text-2xl font-bold text-foreground mb-4'>
                      {filteredProjects[currentSlide]?.title}
                    </h3>

                    <p className='text-sm md:text-base text-muted-foreground mb-4'>
                      {filteredProjects[currentSlide]?.description}
                    </p>

                    {/* Action Buttons */}
                    <div className='flex gap-2 md:gap-3'>
                      <a
                        href={filteredProjects[currentSlide]?.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-accent text-accent-foreground rounded-lg text-xs md:text-sm font-medium hover:opacity-90 transition-opacity'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Eye className='w-3.5 h-3.5 md:w-4 md:h-4' />
                        Preview
                      </a>
                      <a
                        href={filteredProjects[currentSlide]?.githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-secondary border border-border text-foreground rounded-lg text-xs md:text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors'
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className='w-3.5 h-3.5 md:w-4 md:h-4' />
                        Visit
                      </a>
                    </div>
                  </div>
                </div>

                {/* Carousel Controls */}
                {filteredProjects.length > 1 && (
                  <div className='relative'>
                    <div className='flex items-center justify-between'>
                      <button
                        onClick={prevSlide}
                        className='w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center absolute start-0'
                        aria-label='Previous slide'
                      >
                        <ChevronRight className='w-5 h-5 md:w-6 md:h-6' />
                      </button>

                      <div className='text-sm md:text-base text-muted-foreground flex justify-center flex-1'>
                        {currentSlide + 1} / {filteredProjects.length}
                      </div>

                      <button
                        onClick={nextSlide}
                        className='w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center absolute end-0'
                        aria-label='Next slide'
                      >
                        <ChevronLeft className='w-5 h-5 md:w-6 md:h-6' />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

type Skill = Prisma.SkillGetPayload<{
  include: { category: true; projects: true };
}>;

type Category = Prisma.CategoryGetPayload<{
  include: { projects: { include: { techs: true; categories: true } } };
}>;

export function SkillsTabSection() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetch(`/api/categories`)
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch((error) => {
        throw new Error();
      });
  }, []);

  useEffect(() => {
    fetch(`/api/skills/${activeFilter}`)
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
          <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
            My Skills
          </h2>
          <div className='w-31 h-1 bg-accent rounded-full mb-6' />
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
            return (
              <div
                key={index}
                onClick={() => setSelectedSkill(skill)}
                className={`cursor-pointer group p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all ${isOdd && isLast ? 'col-span-2' : null}`}
              >
                <div className='flex justify-between mb-4 items-center'>
                  <span className='text-sm md:text-base font-semibold text-foreground group-hover:text-accent transition-colors'>
                    {skill.name}
                  </span>
                  <span className='text-xs md:text-sm text-muted-foreground group-hover:text-accent transition-colors font-medium'>
                    {skill.yearsOfExperience === '+0'
                      ? 'Learning'
                      : `${skill.yearsOfExperience} years`}
                  </span>
                </div>
                <div className='h-2 bg-background rounded-full overflow-hidden'>
                  <div
                    className='h-full bg-accent rounded-full transition-all duration-1000 ease-out'
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </>
  );
}
