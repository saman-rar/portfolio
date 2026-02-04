'use client';

import { Github, Linkedin, Mail, Phone, Send } from 'lucide-react';
import { contactData } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

interface ContactSectionProps {
  data?: typeof contactData;
  locale: string;
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

      <a
        href={`mailto:${data.email}`}
        target='_blank'
        className='grid grid-cols-1 gap-3'
      >
        <div className='flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group'>
          <div className='w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors'>
            <Mail className='w-5 h-5 md:w-6 md:h-6 text-accent' />
          </div>
          <div className='min-w-0'>
            <h3 className='text-xs md:text-sm font-medium text-muted-foreground mb-1'>
              Email
            </h3>
            <a
              href={`mailto:${data.email}`}
              className='text-sm md:text-base text-foreground hover:text-accent transition-colors font-medium truncate block'
            >
              {data.email}
            </a>
          </div>
        </div>

        <a
          href={`tel:${data.phone.replace(/\s/g, '')}`}
          target='_blank'
          className='flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group'
        >
          <div className='w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors'>
            <Phone className='w-5 h-5 md:w-6 md:h-6 text-accent' />
          </div>
          <div>
            <h3 className='text-xs md:text-sm font-medium text-muted-foreground mb-1'>
              Phone
            </h3>
            <a
              href={`tel:${data.phone.replace(/\s/g, '')}`}
              className='text-sm md:text-base text-foreground hover:text-accent transition-colors font-medium'
            >
              {data.phone}
            </a>
          </div>
        </a>

        <a
          href={data.github.link}
          target='_blank'
          className='flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group'
        >
          <div className='w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors'>
            <Github className='w-5 h-5 md:w-6 md:h-6 text-accent' />
          </div>
          <div>
            <h3 className='text-xs md:text-sm font-medium text-muted-foreground mb-1'>
              Github
            </h3>
            <a
              href={data.github.link}
              className='text-sm md:text-base text-foreground hover:text-accent transition-colors font-medium'
            >
              {data.github.name}
            </a>
          </div>
        </a>

        <a
          href={data.linkedin.link}
          target='_blank'
          className='flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group'
        >
          <div className='w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors'>
            <Linkedin className='w-5 h-5 md:w-6 md:h-6 text-accent' />
          </div>
          <div>
            <h3 className='text-xs md:text-sm font-medium text-muted-foreground mb-1'>
              Linkedin
            </h3>
            <a
              href={data.linkedin.link}
              className='text-sm md:text-base text-foreground hover:text-accent transition-colors font-medium'
            >
              {data.linkedin.name}
            </a>
          </div>
        </a>

        <a
          href={`https://t.me/${data.telegram}`}
          target='_blank'
          className='flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors group'
        >
          <div className='w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors'>
            <Send className='w-5 h-5 md:w-6 md:h-6 text-accent' />
          </div>
          <div>
            <h3 className='text-xs md:text-sm font-medium text-muted-foreground mb-1'>
              Telegram
            </h3>
            <a
              href={`https://t.me/${data.telegram}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm md:text-base text-foreground hover:text-accent transition-colors font-medium'
            >
              {data.telegram}
            </a>
          </div>
        </a>
      </a>
    </div>
  );
}
