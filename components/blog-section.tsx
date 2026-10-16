'use client';

import { BlogCard } from './blog-card';
import Button from './button';

export type BlogArticle = {
  slug: string;
  title: string;
  content: string;
};

export function BlogSection({ locale }: { locale: 'en' | 'fa' }) {
  const isEnglish = locale === 'en';

  return (
    <section
      className='min-h-[54vh] space-y-8 md:space-y-10'
      aria-labelledby='blog-heading'
    >
      <div>
        <div className='mb-4 flex items-center justify-between gap-4'>
          <h2
            id='blog-heading'
            className='text-2xl font-bold text-foreground md:text-3xl'
          >
            {isEnglish ? 'Blog' : 'وبلاگ'}
          </h2>
          <Button href={`/${locale}/blog`}>
            {isEnglish ? 'All Posts' : 'خواندن همه'}
          </Button>
        </div>
        <div className='mb-6 h-1 w-16 rounded-full bg-accent' />
        <p className='max-w-2xl text-sm leading-7 text-muted-foreground md:text-base'>
          {isEnglish
            ? 'Thoughts, tutorials, and notes about building for the web.'
            : 'یادداشت‌ها و آموزش‌هایی درباره ساختن برای وب.'}
        </p>
      </div>

      <BlogCard locale={locale} />
    </section>
  );
}

export default BlogSection;

export function BlogArticleList({ articles }: { articles: BlogArticle[] }) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {articles.map((article) => (
        <article key={article.slug}>{article.title}</article>
      ))}
    </div>
  );
}

export function BlogEmptyState({ locale }: { locale: 'en' | 'fa' }) {
  return (
    <section
      className='flex min-h-[calc(100vh-160px)] items-center justify-center p-6 text-center'
      aria-labelledby='blog-page-heading'
    >
      <div className='max-w-lg'>
        <h1
          id='blog-page-heading'
          className='text-2xl font-bold text-foreground md:text-3xl'
        >
          {locale === 'en' ? 'Blog' : 'وبلاگ'}
        </h1>
        <div className='mx-auto mb-6 mt-4 h-1 w-16 rounded-full bg-accent' />
        <p className='text-sm leading-7 text-muted-foreground md:text-base'>
          {locale === 'en'
            ? 'No articles have been published yet.'
            : 'هنوز مقاله‌ای منتشر نشده است.'}
        </p>
      </div>
    </section>
  );
}
