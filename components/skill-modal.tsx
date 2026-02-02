'use client';

import { SkillGetPayload } from '@/lib/generated/prisma/models';
import { ChevronLeft, ChevronRight, ExternalLink, Eye, X } from 'lucide-react';
import { useState } from 'react';

type Skill = SkillGetPayload<{
  include: { category: true; projects: true };
}>;

interface SkillModalProps {
  skill: Skill;
  isOpen: boolean;
  onClose: () => void;
}

export default function SkillModal({
  skill,
  isOpen,
  onClose,
}: SkillModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

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
        <div className='w-full h-1 bg-accent rounded-full mb-6' />

        {/* Description */}
        <p className='text-base md:text-lg text-muted-foreground mb-8 leading-relaxed'>
          {skill.description_en ||
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
                        <ChevronLeft className='w-5 h-5 md:w-6 md:h-6' />
                      </button>

                      <div className='text-sm md:text-base text-muted-foreground flex justify-center flex-1'>
                        {currentSlide + 1} / {filteredProjects.length}
                      </div>

                      <button
                        onClick={nextSlide}
                        className='w-10 h-10 md:w-12 md:h-12 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center absolute end-0'
                        aria-label='Next slide'
                      >
                        <ChevronRight className='w-5 h-5 md:w-6 md:h-6' />
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
