import { BlogEmptyState } from '@/components/blog-section';
import { FloatingNav } from '@/components/FloatingNav';
import { notFound } from 'next/navigation';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: 'en' | 'fa' }>;
}) {
  const { locale } = await params;

  if (locale !== 'en' && locale !== 'fa') {
    return notFound();
  }

  return (
    <div
      dir={locale === 'en' ? 'ltr' : 'rtl'}
      className='min-h-screen bg-background p-3 pt-12 sm:p-4 md:p-6 md:pt-12 lg:p-12'
    >
      <FloatingNav
        href={`/${locale}/blog`}
        locale={locale}
        title={locale === 'en' ? 'Blog' : 'وبلاگ'}
      />
      <div className='mx-auto max-w-7xl'>
        <main className='overflow-hidden rounded-xl border border-border bg-card md:rounded-2xl'>
          <BlogEmptyState locale={locale} />
        </main>
      </div>
    </div>
  );
}
