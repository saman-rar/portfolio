import { BlogArticlePage } from '@/components/blog-section';
import { FloatingNav } from '@/components/FloatingNav';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';

const articleSlug = 'react-vs-angular-vs-vue';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'fa' }>;
}) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'fa') return notFound();

  const content = await readFile(path.join(process.cwd(), 'content', `${articleSlug}.md`), 'utf8');

  return (
    <div dir={locale === 'en' ? 'ltr' : 'rtl'} className='min-h-screen bg-background p-3 pt-12 sm:p-4 md:p-6 md:pt-12 lg:p-12'>
      <FloatingNav href={`/${locale}/blog`} locale={locale} title={locale === 'en' ? 'Blog' : 'وبلاگ'} />
      <div className='mx-auto max-w-7xl'>
        <main className='overflow-hidden rounded-xl border border-border bg-card md:rounded-2xl'>
          <BlogArticlePage article={{ slug: articleSlug, title: 'React یا Angular یا Vue؟', content }} />
        </main>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: 'en' | 'fa' }> }) {
  const { locale } = await params;
  return {
    title: locale === 'fa' ? 'وبلاگ | مقایسه فریم‌ورک‌های فرانت‌اند' : 'Blog | Frontend framework comparison',
  };
}
