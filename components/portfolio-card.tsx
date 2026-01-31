import { Prisma } from '@/lib/generated/prisma/client';
import { ExternalLink, Eye } from 'lucide-react';

const ProtfolioCard = ({
  project,
}: {
  project: {
    image: string;
    title: string;
    liveUrl: string;
    githubUrl: string;
    tag: string;
  };
}) => {
  return (
    <div className='group relative bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 aspect-3/2'>
      <div className='aspect-4/3 overflow-hidden bg-background'>
        <img
          src={project.image || '/placeholder.svg'}
          alt={project.title}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
        />
      </div>

      <div className='absolute inset-0 bg-linear-to-t from-background via-background/90 to-background/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-6'>
        <h3 className='text-lg md:text-xl font-bold text-foreground mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
          {project.title}
        </h3>

        {/* Action Buttons */}
        <div className='flex gap-2 md:gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75'>
          <a
            href={project.liveUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-accent text-accent-foreground rounded-lg text-xs md:text-sm font-medium hover:opacity-90 transition-opacity'
          >
            <Eye className='w-3.5 h-3.5 md:w-4 md:h-4' />
            Preview
          </a>
          <a
            href={project.githubUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-secondary border border-border text-foreground rounded-lg text-xs md:text-sm font-medium hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors'
          >
            <ExternalLink className='w-3.5 h-3.5 md:w-4 md:h-4' />
            Visit
          </a>
        </div>
      </div>

      {/* Category Badge - Always visible */}
      <div className='absolute top-3 right-3 md:top-4 md:right-4 px-2.5 md:px-3 py-1 md:py-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-lg text-xs font-medium text-accent capitalize'>
        {project.tag}
      </div>
    </div>
  );
};
export default ProtfolioCard;
