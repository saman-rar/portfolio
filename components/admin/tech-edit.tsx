'use client';

import { SubmitEvent, useEffect, useState } from 'react';
import { Prisma } from '@/lib/generated/prisma/client';
import CuisineSelector from './selector';
import { CheckCircle, Loader2, X } from 'lucide-react';
import TechCard from '../tech-card';
import SkillCard from '../skill-card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Category = Prisma.CategoryGetPayload<{
  include: { projects: { include: { techs: true; categories: true } } };
}>;

type Project = Prisma.ProjectGetPayload<{
  include: { techs: true; categories: true };
}>;

type Skill = Prisma.SkillGetPayload<{
  include: {
    category: true;
    projects: { include: { techs: true; categories: true } };
  };
}>;

export function EditForm({ id }: { id?: string }) {
  console.log('first');
  const [tech, setTech] = useState<Skill | null>(null);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [icon, setIcon] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[] | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [yeasrsOfExperience, setYearsOfExperience] = useState<string | null>(
    null,
  );
  const [status, setStatus] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [projects, setProjects] = useState<string[]>();
  const [isSetAutomaticaly, setIsSetAutomatically] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/skills/${id}`)
        .then((res) => res.json())
        .then((data: Skill) => {
          setTech(data);
          setDescription(data.description_en);
          setCategory(data.category.name);
          setLevel(data.level);
          setName(data.name);
          setStatus(data.status);
          setYearsOfExperience(data.yearsOfExperience);
          setSelectedProjects(data.projects.map((project) => project.title));
          setIcon(data.icon);
        });
    }

    fetch(`/api/projects`)
      .then((res) => res.json())
      .then((data: Project[]) =>
        setProjects(data.map((project) => project.title)),
      )
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
    if (!isSetAutomaticaly) {
      setStatus(tech?.status || 'Learning');
      setLevel(tech?.level || 15);
    } else {
      switch (yeasrsOfExperience) {
        case '+0':
          setStatus('Learning');
          setLevel(15);
          break;

        case '1':
          setStatus('Beginner');
          setLevel(35);
          break;

        case '+1':
          setStatus('Intermediate');
          setLevel(50);
          break;

        case '2':
          setStatus('Intermediate');
          setLevel(65);
          break;

        case '+2':
          setStatus('Intermediate');
          setLevel(80);
          break;

        case '3':
          setStatus('Advanced');
          setLevel(100);
          break;

        default:
          setStatus('Learning');
          setLevel(15);
          break;
      }
    }
  }, [isSetAutomaticaly, yeasrsOfExperience]);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className='space-y-5'>
        <LivePreview
          level={level || 15}
          name={name || undefined}
          description={description}
          icon={icon || undefined}
          category={category || undefined}
          yearsOfExperience={yeasrsOfExperience || undefined}
        />
        <div className='space-y-8 md:space-y-10 pb-10 bg-card border border-border p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
              {id ? 'Edit' : 'Add'}
            </h2>
            <div className='w-full h-1 bg-accent rounded-full mb-6' />
            <div className='space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed'>
              {id
                ? `Editing the informatation of ${tech?.name}`
                : 'Adding a new Tech'}
            </div>
          </div>
          <div className='flex gap-3 md:gap-4 p-4 md:p-10 transition-colors'>
            <form
              onSubmit={handleSubmit}
              className='flex flex-col gap-10 w-full'
            >
              <div className='flex flex-col max-w-150 gap-2'>
                <label htmlFor='title'>Name</label>
                <input
                  type='text'
                  id='title'
                  name='title'
                  className='h-10 px-3 bg-black/8 dark:bg-white/5 rounded-md'
                  value={name || ''}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='flex flex-col max-w-150 gap-2'>
                <label htmlFor='icon'>Icon</label>
                <input
                  type='text'
                  id='icon'
                  name='icon'
                  className='h-10 px-3 bg-black/8 dark:bg-white/5 rounded-md'
                  value={icon || ''}
                  onChange={(e) => setIcon(e.target.value)}
                />
              </div>
              <div className='flex flex-col max-w-150 gap-2'>
                <label htmlFor='category'>Category</label>
                <select
                  id='category'
                  name='category'
                  className='h-10 px-3 bg-black/8 dark:bg-white/5 rounded-md'
                  value={category || ''}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col max-w-150 gap-2'>
                <div className='flex flex-col md:flex-row md:items-center justify-between'>
                  <label htmlFor='yearsOfExperience'>Years of experience</label>
                  <div className='flex gap-2'>
                    <label
                      htmlFor='setAutomatically'
                      className='text-sm mt- md:mt-0'
                    >
                      Set Automatically
                    </label>
                    <input
                      type='checkbox'
                      id='setAutomatically'
                      onChange={(e) => setIsSetAutomatically(e.target.checked)}
                    />
                  </div>
                </div>
                <select
                  id='yearsOfExperience'
                  name='yearsOfExperience'
                  className='h-10 px-3 bg-black/8 dark:bg-white/5 rounded-md'
                  value={yeasrsOfExperience || ''}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                >
                  <option value='3'>3</option>
                  <option value='+2'>+2</option>
                  <option value='+2'>+2</option>
                  <option value='+1'>+1</option>
                  <option value='1'>1</option>
                  <option value='0'>0</option>
                </select>
              </div>
              <div className='flex flex-col max-w-150 gap-2'>
                <label htmlFor='status'>Status</label>
                <select
                  disabled={isSetAutomaticaly}
                  id='status'
                  name='status'
                  className={`h-10 px-2 bg-black/8 dark:bg-white/5 rounded-md ${isSetAutomaticaly ? 'text-muted-foreground' : null}`}
                  value={status || ''}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value='Advanced'>Advanced</option>
                  <option value='Intermediate'>Intermediate</option>
                  <option value='Beginner'>Beginner</option>
                  <option value='Learning'>Learning</option>
                </select>
              </div>
              <div className='flex flex-col max-w-150 gap-2 bg-black/8 dark:bg-white/5 p-5 rounded-lg'>
                <div className='flex justify-between items-center'>
                  <label
                    htmlFor='level'
                    className={isSetAutomaticaly ? 'text-muted-foreground' : ''}
                  >
                    Level
                  </label>
                  <span>{level}</span>
                </div>
                <input
                  disabled={isSetAutomaticaly}
                  id='level'
                  type='range'
                  step={5}
                  min={0}
                  max={100}
                  value={level || 0}
                  onChange={(e) => setLevel(Number(e.target.value))}
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
              {projects && projects?.length > 0 && (
                <div className='flex flex-col'>
                  <CuisineSelector
                    title='Projects'
                    cuisines={projects}
                    selected={selectedProjects}
                    setSelected={setSelectedProjects}
                  />
                </div>
              )}
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
          name={name || 'Tech'}
          description={description}
          category={category || 'Front-End'}
          icon={icon || 'CodeIcon'}
          level={level || 15}
          projects={selectedProjects}
          techId={tech?.id}
          techStatus={status || 'Learning'}
          yearsOfExperience={yeasrsOfExperience || '+0'}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}

interface LivePreviewProps {
  name: string | undefined;
  description: string | undefined;
  projects?: Project[];
  icon: string | undefined;
  category: string | undefined;
  yearsOfExperience: string | undefined;
  level: number;
}

const LivePreview = ({
  name = 'Tech',
  description = 'Progressive framework for web development.',
  projects = [],
  icon = 'CodeIcon',
  category = 'Front-End',
  yearsOfExperience = '+0',
  level = 15,
}: LivePreviewProps) => {
  return (
    <div className='space-y-5'>
      <section className='mx-auto space-y-20 max-w-7xl px-6 py-8 lg:px-8 bg-card border border-border p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl'>
        <h2 className='mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl'>
          Tech View
        </h2>
        <div className='w-ful h-1 bg-accent rounded-full mb-6' />
        <div className='grid gap-8 md:grid-cols-2 items-center'>
          <TechCard
            name={name}
            category={category}
            description={description}
            icon={icon}
            yearsOfExperience={yearsOfExperience}
          />
          <SkillCard
            skill={{
              name,
              level,
              description,
              yearsOfExperience,
              category,
              projects,
            }}
          />
        </div>
      </section>
    </div>
  );
};

interface EditModalProps {
  techId: number | undefined;
  name: string | undefined;
  description: string | undefined;
  category: string;
  icon: string;
  yearsOfExperience: string;
  techStatus: string;
  level: number;
  projects: string[];
  isOpen: boolean;
  onClose: () => void;
}

function EditModal({
  techId,
  name = 'Tech',
  description = 'My latest project.',
  category = 'Front-End',
  icon = 'CodeIcon',
  yearsOfExperience = '+0',
  techStatus = 'learning',
  level = 15,
  projects = [],
  isOpen,
  onClose,
}: EditModalProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | null>(null);
  const router = useRouter();

  if (!isOpen) return null;

  const closeHandler = () => {
    onClose();
    setStatus(null);

    if (techId) {
      router.refresh();
    }
  };

  const editHandler = async () => {
    let uploadedImageUrl: string | null = null;
    try {
      setLoading(true);

      let res: Response;

      if (techId) {
        res = await fetch(`/api/skills/${techId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            icon,
            description_en: description,
            category,
            level,
            yearsOfExperience,
            status: techStatus,
            projects,
          }),
        });
      } else {
        res = await fetch(`/api/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            icon,
            description_en: description,
            category,
            level,
            yearsOfExperience,
            status: techStatus,
            projects,
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
                {techId
                  ? 'Successfully updated the tech'
                  : 'Successfully added the tech'}
              </h3>
              <p className='text-muted-foreground text-center'>
                now you can close the modal
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <Link
              href='/admin/dashboard?section=skills'
              className='bg-accent w-full py-2 rounded-md cursor-pointer transition-all duration-100 ease-in-out hover:bg-accent/80 text-white flex justify-center items-center'
            >
              {loading ? (
                <Loader2 className='animate-spin w-6 h-6 mx-auto' />
              ) : (
                'Go To Skills'
              )}
            </Link>
            <button
              onClick={closeHandler}
              className='bg-accent w-full py-2 rounded-md cursor-pointer transition-all duration-100 ease-in-out hover:bg-accent/80 text-white'
            >
              {loading ? (
                <Loader2 className='animate-spin w-6 h-6 mx-auto' />
              ) : (
                'Close'
              )}
            </button>
          </div>
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
          <TechCard
            name={name}
            category={category}
            description={description}
            icon={icon}
            yearsOfExperience={yearsOfExperience}
          />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <button
            onClick={editHandler}
            className='bg-accent text-white py-2 rounded-md cursor-pointer transition-all duration-100 ease-in-out hover:bg-accent/80'
          >
            {loading ? (
              <Loader2 className='animate-spin w-6 h-6 mx-auto' />
            ) : techId ? (
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
