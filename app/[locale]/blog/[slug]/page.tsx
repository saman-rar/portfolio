import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { BlogArticlePage } from '@/components/blog-section';
import { FloatingNav } from '@/components/FloatingNav';
import BlogPage from '../page';
import BlogDetailPage from '@/components/blog-page';

const articleSlug = 'react-vs-angular-vs-vue';

export default async function BlogArticleRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if ((locale !== 'en' && locale !== 'fa') || slug !== articleSlug) notFound();

  const content = await readFile(
    path.join(process.cwd(), 'content', `${articleSlug}.md`),
    'utf8',
  );

  return (
    <div
      dir={locale === 'en' ? 'ltr' : 'rtl'}
      className='min-h-screen bg-background p-3 pt-12 sm:p-4 md:p-6 md:pt-12 lg:p-12'
    >
      <FloatingNav
        href={`/${locale}/blog/${articleSlug}`}
        locale={locale}
        title={locale === 'en' ? 'Blog' : 'وبلاگ'}
      />
      <div className='mx-auto max-w-7xl'>
        <main className='overflow-hidden rounded-xl border border-border bg-card md:rounded-2xl'>
          <BlogDetailPage />
        </main>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if ((locale !== 'en' && locale !== 'fa') || slug !== articleSlug) return {};
  return {
    title:
      locale === 'fa'
        ? 'React یا Angular یا Vue؟ | وبلاگ'
        : 'React, Angular, or Vue? | Blog',
    description:
      locale === 'fa'
        ? 'راهنمای انتخاب فریم‌ورک فرانت‌اند برای برنامه‌نویسان JavaScript.'
        : 'A practical guide to choosing a frontend framework.',
  };
}
