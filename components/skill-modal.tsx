'use client';

import { projects, techs } from '@/lib/portfolio-data';
import { ChevronLeft, ChevronRight, ExternalLink, Eye, X } from 'lucide-react';
import { useState } from 'react';

interface SkillModalProps {
  skill: (typeof techs)[0];
  isOpen: boolean;
  onClose: () => void;
  locale?: 'en' | 'fa';
}

export default function SkillModal({
  skill,
  isOpen,
  onClose,
  locale = 'en',
}: SkillModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const filteredProjects = projects.filter((project) =>
    skill.projects.includes(project.title),
  );

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
          className='absolute top-4 end-4 md:top-6 md:end-6 rtl:left-4 rtl:md:right6 w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center z-10'
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
          {locale === 'en'
            ? skill.description_en
            : skill.description_fa ||
              `I have extensive experience with ${skill.name}, bringing professional expertise to every project.`}
        </p>

        {/* Filter Buttons */}
        {filteredProjects.length > 0 && (
          <>
            {/* Carousel */}
            {filteredProjects.length > 0 && (
              <div className='space-y-6'>
                {/* Project Card - same hover pattern as PortfolioCard */}
                <div className='group relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 aspect-3/2'>
                  <div className='aspect-4/3 overflow-hidden bg-background'>
                    <img
                      src={
                        filteredProjects[currentSlide]?.image ||
                        '/placeholder.svg'
                      }
                      alt={filteredProjects[currentSlide]?.title}
                      className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                  </div>

                  <div className='absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-6'>
                    <h3 className='text-lg md:text-xl font-bold text-foreground mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                      {filteredProjects[currentSlide]?.title}
                    </h3>

                    {/* Action Buttons */}
                    <div className='flex gap-2 md:gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75'>
                      {filteredProjects[currentSlide]?.liveUrl && (
                        <a
                          href={filteredProjects[currentSlide]?.liveUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-accent text-accent-foreground rounded-lg text-xs md:text-sm font-medium hover:opacity-90 transition-opacity'
                        >
                          <Eye className='w-3.5 h-3.5 md:w-4 md:h-4' />
                          Preview
                        </a>
                      )}
                      <a
                        href={filteredProjects[currentSlide]?.githubUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-secondary border border-border text-foreground rounded-lg text-xs md:text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors'
                      >
                        <ExternalLink className='w-3.5 h-3.5 md:w-4 md:h-4' />
                        Visit
                      </a>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className='absolute top-3 right-3 md:top-4 md:right-4 px-2.5 md:px-3 py-1 md:py-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-xs font-medium text-accent capitalize'>
                    {filteredProjects[currentSlide]?.tag}
                  </div>
                </div>

                {/* Carousel Controls */}
                {filteredProjects.length > 1 && (
                  <div dir='ltr' className='relative'>
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
