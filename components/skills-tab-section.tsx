'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Eye } from 'lucide-react';
import { resumeData, portfolioData } from '@/lib/portfolio-data';

interface SkillsTabSectionProps {
  data?: typeof resumeData;
}

interface SkillModalProps {
  skill: (typeof resumeData.skills)[0] & {
    description?: string;
    projects?: (typeof portfolioData.projects)[0][];
  };
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
}

function SkillModal({ skill, isOpen, onClose, categories }: SkillModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');

  if (!isOpen) return null;

  const filteredProjects =
    activeFilter === 'all'
      ? skill.projects || []
      : (skill.projects || []).filter((p) => p.category === activeFilter);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
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
          className='absolute top-4 left-4 md:top-6 md:left-6 w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center z-10'
          aria-label='Close modal'
        >
          <X className='w-5 h-5' />
        </button>

        {/* Title */}
        <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4 pl-12'>
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
            <div className='flex flex-wrap gap-2 md:gap-3 mb-6'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveFilter(category);
                    setCurrentSlide(0);
                  }}
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-medium capitalize transition-all ${
                    activeFilter === category
                      ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                      : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Carousel */}
            {filteredProjects.length > 0 && (
              <div className='space-y-6'>
                {/* Project Card */}
                <div
                  onClick={() =>
                    window.open(
                      filteredProjects[currentSlide]?.liveUrl,
                      '_blank'
                    )
                  }
                  className='relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden cursor-pointer group'
                >
                  <div className='aspect-[16/9] overflow-hidden bg-background relative'>
                    <img
                      src={
                        filteredProjects[currentSlide]?.image ||
                        '/placeholder.svg'
                      }
                      alt={filteredProjects[currentSlide]?.title}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  </div>

                  <div className='absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/20 opacity-0 hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-6'>
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

                  {/* Category Badge */}
                  <div className='absolute top-3 left-3 md:top-4 md:left-4 px-2.5 md:px-3 py-1 md:py-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-xs font-medium text-accent capitalize'>
                    {filteredProjects[currentSlide]?.category}
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

export function SkillsTabSection({ data = resumeData }: SkillsTabSectionProps) {
  const [selectedSkill, setSelectedSkill] = useState<
    | ((typeof resumeData.skills)[0] & {
        description?: string;
        projects?: (typeof portfolioData.projects)[0][];
      })
    | null
  >(null);

  // Create enriched skills with project associations
  const enrichedSkills = data.skills.map((skill) => ({
    ...skill,
    description: `Specialized in ${skill.name} with a strong focus on creating high-quality, maintainable solutions. I have delivered multiple projects showcasing expertise in this domain.`,
    projects: portfolioData.projects.slice(0, 4), // Demo: assign some projects to each skill
  }));

  return (
    <>
      <div className='space-y-8 md:space-y-10'>
        <div>
          <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
            My Skills
          </h2>
          <div className='w-31 h-1 bg-accent rounded-full mb-6' />
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4'>
          {enrichedSkills.map((skill, index) => (
            <div
              key={index}
              onClick={() => setSelectedSkill(skill)}
              className='cursor-pointer group p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all'
            >
              <div className='flex justify-between mb-4 items-center'>
                <span className='text-sm md:text-base font-semibold text-foreground group-hover:text-accent transition-colors'>
                  {skill.name}
                </span>
                <span className='text-xs md:text-sm text-muted-foreground group-hover:text-accent transition-colors font-medium'>
                  {skill.level}%
                </span>
              </div>
              <div className='h-2 bg-background rounded-full overflow-hidden'>
                <div
                  className='h-full bg-accent rounded-full transition-all duration-1000 ease-out'
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          categories={portfolioData.categories}
        />
      )}
    </>
  );
}
