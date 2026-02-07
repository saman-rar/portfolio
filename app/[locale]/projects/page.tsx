import { ProjectsSection } from '@/components/projects-section';
import { projects } from '@/lib/portfolio-data';

const ProjectsPage = async ({
  params,
}: {
  params: { locale: 'en' | 'fa' };
}) => {
  const { locale } = (await params) || 'en';

  return (
    <div
      dir={locale === 'en' ? 'ltr' : 'rtl'}
      className='min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12'
    >
      <div className='mx-auto max-w-7xl'>
        <div className='flex flex-col lg:flex-row-reverse gap-3 sm:gap-4 md:gap-6'>
          <main className='flex-1 bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden'>
            <div className='p-4 sm:p-5 md:p-6 lg:p-8'>
              <ProjectsSection projects={projects} locale={locale} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default ProjectsPage;
