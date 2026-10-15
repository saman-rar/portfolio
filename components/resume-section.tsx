import { resumeData } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

interface ResumeSectionProps {
  data?: typeof resumeData;
  locale?: string;
}

export function ResumeSection({
  data = resumeData,
  locale = 'en',
}: ResumeSectionProps) {
  const isRTL = locale === 'fa';
  return (
    <div className='space-y-15 lg:space-y-20 min-h-[54vh]'>
      {/* Education */}
      <div className='space-y-8'>
        <div>
          <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
            {locale === 'en' ? 'Education' : 'تحصیلات'}
          </h2>
          <div
            className={cn('h-1 bg-accent rounded-full mb-6', {
              'w-32': locale === 'en',
              'w-28': locale === 'fa',
            })}
          />
        </div>

        <div>
          <div className='space-y-4'>
            {data.education.map((item, index) => (
              <div
                key={index}
                className={`relative pb-6 last:pb-0 ${
                  isRTL
                    ? 'pr-5 md:pr-6 border-r-2 border-border'
                    : 'pl-5 md:pl-6 border-l-2 border-border'
                }`}
              >
                <div
                  className={`absolute top-0 w-4 h-4 rounded-full bg-accent ${
                    isRTL ? '-right-2.25' : '-left-2.25'
                  }`}
                />
                <h4 className='text-base md:text-lg font-semibold text-foreground mb-2'>
                  {item.title}
                </h4>
                <p className='text-xs md:text-sm text-accent mb-2'>
                  {item.period}
                </p>
                <p className='text-xs md:text-sm text-muted-foreground leading-relaxed'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Works */}
      <div className='space-y-8'>
        <div>
          <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
            {locale === 'en' ? 'Work Experience' : 'تجربه کاری'}
          </h2>
          <div
            className={cn('h-1 bg-accent rounded-full mb-6', {
              'w-32': locale === 'en',
              'w-28': locale === 'fa',
            })}
          />
        </div>
        <div>
          <div className='space-y-4'>
            {data.works.map((item, index) => (
              <div
                key={index}
                className={`relative pb-6 last:pb-0 ${
                  isRTL
                    ? 'pr-5 md:pr-6 border-r-2 border-border'
                    : 'pl-5 md:pl-6 border-l-2 border-border'
                }`}
              >
                <div
                  className={`absolute top-0 w-4 h-4 rounded-full bg-accent ${
                    isRTL ? '-right-2.25' : '-left-2.25'
                  }`}
                />
                <h4 className='text-base md:text-lg font-semibold text-foreground mb-2'>
                  {item.title}
                </h4>
                <p className='text-xs md:text-sm text-accent mb-2'>
                  {item.period}
                </p>
                <p className='text-xs md:text-sm text-muted-foreground leading-relaxed'>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
