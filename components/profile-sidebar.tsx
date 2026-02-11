import { BookOpen, Calendar } from 'lucide-react';
import { profileData } from '@/lib/portfolio-data';
import Image from 'next/image';

interface ProfileSidebarProps {
  data?: typeof profileData;
  locale?: string;
}

export function ProfileSidebar({
  data = profileData,
  locale = 'en',
}: ProfileSidebarProps) {
  return (
    <aside className='w-full flex flex-col lg:w-80 bg-card rounded-2xl border border-border p-4 md:p-6 lg:sticky lg:top-8 lg:h-[calc(100vh-96px)]'>
      {/* Profile Image */}
      <div className='flex flex-col items-center'>
        <div className='relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6'>
          <div className='absolute inset-0 rounded-3xl from-accent/20 via-accent/5 to-transparent animate-pulse-slow' />
          <div className='absolute inset-0.5 rounded-3xl bg-secondary overflow-hidden'>
            <Image
              fill
              src={data.avatar || '/placeholder.svg'}
              alt={locale === 'en' ? data.enName : data.faName}
              className='w-full h-full object-cover'
            />
          </div>
        </div>

        <h1 className='text-xl md:text-2xl font-bold text-foreground mb-2'>
          {locale === 'en' ? data.enName : data.faName}
        </h1>
        <p className='text-xs md:text-sm text-muted-foreground bg-secondary px-3 md:px-4 py-1 rounded-lg'>
          {locale === 'en' ? data.enTitle : data.faTitle}
        </p>
      </div>

      {/* Divider */}
      <div className='h-px bg-border my-4 md:my-6' />

      {/* Contact Info */}
      <div className='grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4'>
        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0'>
            <Calendar className='w-5 h-5 text-accent' />
          </div>
          <div className='flex-1'>
            <p className='text-xs text-muted-foreground uppercase mb-1'>
              {locale === 'en' ? 'Birthday' : 'تاریخ تولد'}
            </p>
            <p className='text-sm text-foreground'>
              {locale === 'en' ? data.enBirthday : data.faBirthday}
            </p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0'>
            <BookOpen className='w-5 h-5 text-accent' />
          </div>
          <div className='flex-1'>
            <p className='text-xs text-muted-foreground uppercase mb-1'>
              {locale === 'en' ? 'Education' : 'تحصیلات'}
            </p>
            <p className='text-sm text-foreground'>
              {locale === 'en' ? data.enEducation : data.faEducation}
            </p>
          </div>
        </div>

        {data.options.map((option) => (
          <div className='flex items-start gap-3'>
            <div className='w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0'>
              <option.Icon className='w-5 h-5 text-accent' />
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-xs text-muted-foreground uppercase mb-1'>
                {locale === 'en' ? option.enLabel : option.faLabel}
              </p>
              <a
                href={option.href}
                className='text-sm text-foreground hover:text-accent transition-colors break-all'
              >
                {locale === 'fa'
                  ? option.title.replace('+98', '0')
                  : option.title}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className='flex items-center justify-center gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border'>
        {data.social.map((s) => (
          <a
            href={s.href}
            target='_blank'
            rel='noopener noreferrer'
            className='w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center'
            aria-label='GitHub'
          >
            <s.Icon className='w-5 h-5' />
          </a>
        ))}
      </div>
    </aside>
  );
}

const englishTranslations = {
  email: 'Email',
  phone: 'Phone',
  github: 'GitHub',
  linkedin: 'LinkedIn',
  telegram: 'Telegram',
  birthday: 'Birthday',
};
const persianTranslations = {
  email: 'ایمیل',
  phone: 'تلفن',
  github: 'گیتهاب',
  linkedin: 'لینکدین',
  telegram: 'تلگرام',
  birthday: 'تاریخ تولد',
};
