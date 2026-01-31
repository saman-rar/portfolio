'use client';

import { SubmitEvent, useEffect, useState } from 'react';
import { Prisma } from '@/lib/generated/prisma/client';
import { ProjectCard } from '../project-card';
import ImageUpload from './image-upload';
import CuisineSelector from './selector';
import { CheckCircle, Loader2, X } from 'lucide-react';
import ProtfolioCard from '../portfolio-card';
import Image from 'next/image';

type Category = Prisma.CategoryGetPayload<{
  include: { projects: { include: { techs: true; categories: true } } };
}>;

type Project = Prisma.ProjectGetPayload<{
  include: { techs: true; categories: true };
}>;

type Skill = Prisma.SkillGetPayload<{
  include: { category: true; projects: true };
}>;

export function EditForm({ id }: { id?: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [techs, setTechs] = useState<string[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [liveUrl, setLiveUrl] = useState<string | undefined>(undefined);
  const [github, setGithub] = useState<string | undefined>(undefined);
  const [tag, setTag] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/projects/${id}`)
        .then((res) => res.json())
        .then((data: Project) => {
          setProject(data);
          setSelectedTechs(data.techs.map((tech) => tech.name));
          setSelectedCategories(
            data.categories.map((category) => category.name),
          );
          setLiveUrl(data.liveUrl);
          setGithub(data.githubUrl);
          setTag(data.tag);
          setDescription(data.description);
          setTitle(data.title);
        })
        .catch((error) => {
          throw new Error(error);
        });
    }

    fetch('/api/skills')
      .then((res) => res.json())
      .then((data: Skill[]) => setTechs(data.map((tech) => tech.name)))
      .catch((error) => {
        throw new Error(error);
      });

    fetch('/api/categories')
      .then((res) => res.json())
      .then((data: Category[]) =>
        setCategories(data.map((category) => category.name)),
      );
  }, []);

  useEffect(() => {
    if (image?.type?.startsWith('image/')) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    return () => setPreviewUrl(null);
  }, [image]);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className='space-y-5'>
        <LivePreview
          title={title}
          description={description}
          techs={selectedTechs}
          image={previewUrl || (project?.image as string)}
          liveUrl={liveUrl}
          githubUrl={github}
          tag={tag}
        />
        <div className='space-y-8 md:space-y-10 pb-10 bg-card border border-border p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
              {id ? 'Edit' : 'Add'}
            </h2>
            <div className='w-full h-1 bg-accent rounded-full mb-6' />
            <div className='space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed'>
              {id
                ? `Editing the informatation of ${project?.title}`
                : 'Adding a new project'}
            </div>
          </div>
          <div className='flex gap-3 md:gap-4 p-4 md:p-10 transition-colors'>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col gap-10 w-full'
            >
              <div className='flex flex-col max-w-150 gap-2'>
                <label htmlFor='title'>Title</label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  className='h-10 px-3 bg-black/8 dark:bg-white/5 rounded-md'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className='flex flex-col max-w-150 gap-2'>
                <label htmlFor='url'>Live URL</label>
                <input
                  type='url'
                  id='url'
                  name='url'
                  className='h-10 px-3 bg-black/8 dark:bg-white/5 rounded-md'
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                />
              </div>
              <div className='flex flex-col max-w-150 gap-2'>
                <label htmlFor='github'>Github</label>
                <input
                  type='github'
                  id='github'
                  name='github'
                  className='h-10 px-3 bg-black/8 dark:bg-white/5 rounded-md'
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div className='flex flex-col max-w-150 gap-2'>
                <label htmlFor='tag'>Tag</label>
                <input
                  type='tag'
                  id='tag'
                  name='tag'
                  className='h-10 px-2 bg-black/8 dark:bg-white/5 rounded-md'
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
              <div className='flex flex-col max-w-150 gap-2'>
                <label htmlFor='description'>Description</label>
                <textarea
                  id='description'
                  name='description'
                  className='h-30 p-3 resize-none bg-black/8 dark:bg-white/5 rounded-md'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='flex flex-col max-w-150 gap-2'>
                <ImageUpload
                  file={image}
                  setFile={setImage}
                  previewUrl={previewUrl}
                  setPreviewUrl={setPreviewUrl}
                />
              </div>
              <div className='flex flex-col'>
                <CuisineSelector
                  title='Techs'
                  cuisines={techs}
                  selected={selectedTechs}
                  setSelected={setSelectedTechs}
                />
              </div>
              <div className='flex flex-col'>
                <CuisineSelector
                  title='Categories'
                  cuisines={categories}
                  selected={selectedCategories}
                  setSelected={setSelectedCategories}
                />
              </div>
              <button
                className='bg-blue-600 py-2 rounded-lg text-white text-lg cursor-pointer hover:opacity-85'
                type='submit'
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditModal
          projectId={project?.id}
          title={title}
          description={description}
          techs={selectedTechs}
          categories={selectedCategories}
          projectImage={project?.image}
          imagePreview={previewUrl || (project?.image as string)}
          image={image}
          githubUrl={github}
          liveUrl={liveUrl}
          tag={tag}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}

interface LivePreviewProps {
  title: string | undefined;
  description: string | undefined;
  techs: string[];
  image: string | undefined;
  githubUrl: string | undefined;
  liveUrl: string | undefined;
  tag: string | undefined;
}

const LivePreview = ({
  title = 'Project',
  description = 'My latest project.',
  techs = ['Web Development'],
  image = '/placeholder.svg',
  githubUrl = 'https://github.com/saman-rar',
  liveUrl = '_blank',
  tag = 'Web Development',
}: LivePreviewProps) => {
  return (
    <div className='space-y-5'>
      <section className='mx-auto space-y-20 max-w-7xl px-6 py-8 lg:px-8 bg-card border border-border p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl'>
        <h2 className='mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
          Project View
        </h2>
        <div className='w-ful h-1 bg-accent rounded-full mb-6' />
        <div className='grid gap-8 md:grid-cols-2'>
          <ProjectCard
            title={title}
            description={description}
            tags={techs}
            image={image}
          />
          <ProtfolioCard
            project={{ title, image, liveUrl, githubUrl: githubUrl, tag }}
          />
        </div>
      </section>
    </div>
  );
};

interface EditModalProps {
  projectId: number | undefined;
  title: string | undefined;
  description: string | undefined;
  techs: string[];
  categories: string[];
  image: File | null;
  projectImage: string | undefined;
  githubUrl: string | undefined;
  liveUrl: string | undefined;
  tag: string | undefined;
  isOpen: boolean;
  onClose: () => void;
  imagePreview: string | undefined;
}

function EditModal({
  projectId,
  title = 'Project',
  description = 'My latest project.',
  techs = ['Next.js'],
  categories = ['Web Development'],
  projectImage = '/placeholder.svg',
  imagePreview = '/placeholder.svg',
  image,
  githubUrl = 'https://github.com/saman-rar',
  liveUrl = '_blank',
  tag = 'Web Development',
  isOpen,
  onClose,
}: EditModalProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | null>(null);

  if (!isOpen) return null;

  const closeHandler = () => {
    onClose();
    setStatus(null);
  };

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const rest = await fetch(`/api/images`, {
        method: 'POST',
        body: formData,
      });

      const data = await rest.json();
      return data.url;
    } catch (error) {
      throw new Error('Uploading Image failed!');
    }
  };

  const editHandler = async () => {
    let uploadedImageUrl: string | null = null;
    try {
      setLoading(true);

      if (image) {
        uploadedImageUrl = await uploadImage(image);
      }

      let res: Response;

      if (projectId) {
        res = await fetch(`/api/projects/${projectId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            liveUrl,
            githubUrl,
            tag,
            techs: techs,
            categories: categories,
            image: uploadedImageUrl ?? projectImage,
          }),
        });
      } else {
        res = await fetch(`/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            liveUrl,
            githubUrl,
            tag,
            techs: techs,
            categories: categories,
            image: uploadedImageUrl ?? projectImage,
          }),
        });
      }

      if (!res.ok) {
        throw new Error('Updating product failed.');
      }

      setStatus('success');
    } catch (error) {
      if (uploadedImageUrl) {
        await fetch(`/api/images/${uploadedImageUrl}`, {
          method: 'DELETE',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div
        className='fixed inset-0 z-50 flex items-center justify-center p-4'
        onClick={closeHandler}
      >
        <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
        <div
          className='relative max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border p-6 md:p-8 animate-in fade-in zoom-in-95'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeHandler}
            className='absolute top-4 right-4 md:top-6 md:right-6 rtl:left-4 rtl:md:right6 w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center z-10'
            aria-label='Close modal'
          >
            <X className='w-5 h-5' />
          </button>
          <div className='mb-5'>
            <div className='px-10 py-5 mb-3'>
              <CheckCircle className='w-40 h-40 text-green-600' />
            </div>
            <div>
              <h3 className='font-bold text-lg mb-2'>
                {projectId
                  ? 'Successfully updated the project'
                  : 'Successfully added the project'}
              </h3>
              <p className='text-muted-foreground text-center'>
                now you can close the modal
              </p>
            </div>
          </div>
          <button
            onClick={closeHandler}
            className='bg-accent w-full py-2 rounded-md cursor-pointer transition-all duration-100 ease-in-out hover:bg-accent/80'
          >
            {loading ? (
              <Loader2 className='animate-spin w-6 h-6 mx-auto' />
            ) : (
              'Close'
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
      <div
        className='relative max-w-4xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-border p-6 md:p-8 animate-in fade-in zoom-in-95'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 md:top-6 md:right-6 rtl:left-4 rtl:md:right6 w-10 h-10 rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center z-10'
          aria-label='Close modal'
        >
          <X className='w-5 h-5' />
        </button>
        <div className='mb-10'>
          <article className='group cursor-pointer grid grid-cols-2 gap-4'>
            <div className='overflow-hidden border border-border bg-card'>
              <Image
                src={imagePreview || '/placeholder.svg'}
                alt={title}
                width={600}
                height={400}
                className='aspect-3/2 w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <div className='flex flex-col justify-between'>
              <div>
                <h3 className='mb-3 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-muted-foreground'>
                  {title}
                </h3>
                <p className='mb-4 text-balance text-sm leading-relaxed text-muted-foreground md:text-base'>
                  {description}
                </p>
              </div>

              <div>
                <div className='flex flex-wrap gap-2 mb-6'>
                  {categories.map((category) => (
                    <span
                      key={category}
                      className='border border-border bg-accent px-3 py-1 text-xs font-medium text-secondary-foreground'
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className='flex flex-wrap gap-2'>
                  {techs.map((tag) => (
                    <span
                      key={tag}
                      className='border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <button
            onClick={editHandler}
            className='bg-accent text-white py-2 rounded-md cursor-pointer transition-all duration-100 ease-in-out hover:bg-accent/80'
          >
            {loading ? (
              <Loader2 className='animate-spin w-6 h-6 mx-auto' />
            ) : projectId ? (
              'Edit'
            ) : (
              'Add'
            )}
          </button>
          <button
            onClick={onClose}
            className='bg-black/40 text-white dark:bg-secondary py-2 rounded-md cursor-pointer transition-all duration-100 ease-in-out hover:bg-destructive dark:hover:bg-destructive'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
