import { PenTool, Code, Smartphone, Zap } from 'lucide-react';
import { aboutData } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

const iconMap = {
  Code,
  Zap,
  Smartphone,
  PenTool,
};

interface AboutSectionProps {
  data?: typeof aboutData;
  locale: string;
}

export function AboutSection({ data = aboutData, locale }: AboutSectionProps) {
  return (
    <div className='space-y-8 md:space-y-10'>
      {/* About Me */}
      <div>
        <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
          {locale === 'en' ? 'About me' : 'درباره من'}
        </h2>
        <div
          className={cn('h-1 bg-accent rounded-full mb-6', {
            'w-33': locale === 'en',
            'w-26': locale === 'fa',
          })}
        />
        <div className='space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed'>
          {data.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      {/* What I'm Doing */}
      <div>
        <h3 className='text-xl md:text-2xl font-bold text-foreground mb-6'>
          {locale === 'en' ? "What I'm Doing" : 'کارهایی که انجام میدهم'}
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4'>
          {data.services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className='flex gap-3 md:gap-4 p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors'
              >
                <div className='w-10 h-10 md:w-12 md:h-12 shrink-0'>
                  <IconComponent
                    className='w-full h-full text-accent'
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h4 className='text-base md:text-lg font-semibold text-foreground mb-2'>
                    {service.title}
                  </h4>
                  <p className='text-xs md:text-sm text-muted-foreground leading-relaxed'>
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
