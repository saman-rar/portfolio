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

function inlineMarkdown(value: string) {
  return value.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className='rounded bg-muted px-1.5 py-0.5 text-[0.9em]'
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function BlogArticlePage({ article }: { article: BlogArticle }) {
  const lines = article.content.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }
    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push(
        <pre
          key={blocks.length}
          dir='ltr'
          className='overflow-x-auto rounded-xl bg-muted p-4 text-left text-sm leading-6'
        >
          <code data-language={language}>{code.join('\n')}</code>
        </pre>,
      );
      index += 1;
      continue;
    }
    if (line.startsWith('|')) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        const row = lines[index].trim();
        if (!/^\|\s*-/.test(row))
          rows.push(
            row
              .split('|')
              .slice(1, -1)
              .map((cell) => cell.trim()),
          );
        index += 1;
      }
      blocks.push(
        <div key={blocks.length} className='overflow-x-auto'>
          <table className='w-full min-w-[640px] border-collapse text-sm'>
            <thead>
              <tr>
                {rows[0]?.map((cell) => (
                  <th
                    key={cell}
                    className='border border-border bg-muted px-3 py-2 text-start font-semibold'
                  >
                    {inlineMarkdown(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className='border border-border px-3 py-2'
                    >
                      {inlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(
        <ul key={blocks.length} className='list-disc space-y-2 pe-6 ps-5'>
          {items.map((item) => (
            <li key={item}>{inlineMarkdown(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const Heading =
        heading[1].length === 1 ? 'h1' : heading[1].length === 2 ? 'h2' : 'h3';
      blocks.push(
        <Heading
          key={blocks.length}
          className={
            Heading === 'h1'
              ? 'text-2xl font-bold md:text-4xl'
              : Heading === 'h2'
                ? 'mt-8 text-xl font-bold md:text-2xl'
                : 'mt-6 text-lg font-bold md:text-xl'
          }
        >
          {inlineMarkdown(heading[2])}
        </Heading>,
      );
      index += 1;
      continue;
    }
    if (line === '---') {
      blocks.push(<hr key={blocks.length} className='border-border' />);
      index += 1;
      continue;
    }
    const paragraph: string[] = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^#{1,3}\s|^```|^\||^- |^---$/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(
      <p
        key={blocks.length}
        className='text-[1rem] leading-8 text-foreground/90'
      >
        {inlineMarkdown(paragraph.join(' '))}
      </p>,
    );
  }

  return (
    <article className='mx-auto flex max-w-4xl flex-col gap-5 p-6 md:p-10'>
      {blocks}
    </article>
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
