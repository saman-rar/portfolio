import { contactData } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

interface ContactSectionProps {
  data?: typeof contactData;
  locale: 'en' | 'fa';
}

export function ContactSection({
  data = contactData,
  locale,
}: ContactSectionProps) {
  return (
    <div className='space-y-6 md:space-y-8'>
      <div>
        <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
          {locale === 'en' ? 'Contact' : 'اطلاعات تماس'}
        </h2>
        <div
          className={cn('h-1 bg-accent rounded-full mb-6', {
            'w-26.5': locale === 'en',
            'w-41': locale === 'fa',
          })}
        />
      </div>

      <div className='grid grid-cols-1 gap-3'>
        {data.map((d) => (
          <a
            href={d.href}
            target='_blank'
            className='flex items-center group gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group'
          >
            <div className='w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors'>
              <d.Icon className='w-5 h-5 md:w-6 md:h-6 text-accent' />
            </div>
            <div>
              <h3 className='text-xs md:text-sm font-medium text-muted-foreground mb-1 group-hover:text-white'>
                {locale === 'en' ? d.enLabel : d.faLabel}
              </h3>
              <span
                dir='ltr'
                className='text-sm md:text-base text-foreground group-hover:text-accent transition-colors font-medium'
              >
                {d.title}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
