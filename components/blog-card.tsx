import Image from 'next/image';
import CoverImage from '../public/blogs/frontend-frameworks/cover.jpg';
import Button from './button';
import Link from 'next/link';

export const BlogCard = ({ locale }: { locale: 'en' | 'fa' }) => {
  const isEnglish = locale === 'en';
  return (
    <article className='rounded-xl border border-border bg-secondary/20 overflow-hidden'>
      <div className='relative w-full aspect-video'>
        <Image
          src={CoverImage}
          alt='front-end frameworks'
          fill
          className='object-cover'
        />
      </div>
      <div className='p-8 lg:p-10'>
        <h3 className='text-lg font-semibold text-foreground md:text-xl'>
          {isEnglish
            ? 'React, Angular, or Vue? A guide to choosing a frontend framework'
            : 'React یا Angular یا Vue؟ راهنمای انتخاب فریم‌ورک فرانت‌اند'}
        </h3>
        <p className='mt-3 text-sm leading-7 text-muted-foreground md:text-base'>
          {isEnglish
            ? 'A practical comparison of the ideas, syntax, and ecosystems behind today’s leading frontend tools.'
            : 'مقایسه‌ای کاربردی از مفاهیم، سینتکس و اکوسیستم ابزارهای محبوب توسعه فرانت‌اند.'}
        </p>
      </div>
    </article>
  );
};
