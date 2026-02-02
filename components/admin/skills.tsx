'use client';

import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  ExternalLink,
  Eye,
  PlusCircle,
  Trash,
  X,
} from 'lucide-react';
import { Prisma } from '@/lib/generated/prisma/client';
import Link from 'next/link';
import SkillCard from '../skill-card';
import SkillModal from '../skill-modal';
import Button from '../button';

type Category = Prisma.CategoryGetPayload<{
  include: { skills: { include: { projects: true; category: true } } };
}>;

type Project = Prisma.ProjectGetPayload<{
  include: { techs: true; categories: true };
}>;

type Skill = Prisma.SkillGetPayload<{
  include: { projects: true; category: true };
}>;

export function SkillsSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [activeFilter, setActiveFilter] = useState<Category | 'all'>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [removingSkill, setRemovingSkill] = useState<Skill | null>(null);

  useEffect(() => {
    fetch(`/api/skills`)
      .then((res) => res.json())
      .then((data: Skill[]) => setAllSkills(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/categories`)
      .then((res) => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  const filteredSkills: Skill[] =
    activeFilter === 'all' ? allSkills : activeFilter.skills;

  return (
    <>
      <div className='space-y-6 md:space-y-8 min-h-[54vh]'>
        <div>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
              Skills
            </h2>
            <Link href='/admin/dashboard/skill/new'>
              <PlusCircle className='scale-120 hover:text-accent' />
            </Link>
          </div>
          <div className='w-30 h-1 bg-accent rounded-full mb-6' />
        </div>

        {/* Filter Buttons */}
        <div className='pb-3 flex overflow-x-auto gap-2 md:gap-3'>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category)}
              className={`px-4 md:px-5  py-3 md:py-4 rounded-xl text-xs md:text-sm font-medium capitalize transition-all text-nowrap ${
                activeFilter === category
                  ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4'>
          {filteredSkills.map((skill, index) => {
            const isLast = index === filteredSkills.length - 1;
            const isOdd = filteredSkills.length % 2 === 1;

            console.log(isLast, isOdd);
            return (
              <>
                <SkillCard
                  skill={skill}
                  isOddOrLast={isLast && isOdd}
                  setSelectedSkill={setSelectedSkill}
                />
                <div className='space-x-2'>
                  <Link
                    className='py-2 px-4 text-white bg-accent rounded-md cursor-pointer transition duration-100 ease-in hover:bg-accent/85'
                    href='/admin/dashboard/skill/new'
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setRemovingSkill(skill)}
                    className='py-2.5 px-4 text-black dark:text-white bg-secondary rounded-md cursor-pointer transition duration-100 ease-in hover:bg-destructive'
                  >
                    Remove
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>

      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
      {removingSkill && (
        <RemoveModal
          skill={removingSkill}
          isOpen={!!removingSkill}
          onClose={() => setRemovingSkill(null)}
        />
      )}
    </>
  );
}

interface RemoveModalProps {
  skill: Skill;
  isOpen: boolean;
  onClose: () => void;
}

function RemoveModal({ skill, isOpen, onClose }: RemoveModalProps) {
  if (!isOpen) return null;

  const removeHandler = () => {
    fetch(`/api/skills/${skill.id}/remove`)
      .then(() => onClose())
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
      <div
        className='relative max-w-4xl max-h-[90vh] overflow-y-hidden bg-card rounded-2xl border border-border p-6 md:p-8 animate-in fade-in zoom-in-95'
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

        {/* Title */}
        <h2 className='text-3xl md:text-4xl font-bold text-foreground mb-4'>
          Are You Sure?
        </h2>
        <div className='w-55 h-1 bg-accent rounded-full mb-6' />

        {/* Description */}
        <p className='text-base md:text-lg mb-1 leading-relaxed'>
          {`Removing ${skill.name}`}
        </p>
        <p className='text-base md:text-base text-muted-foreground leading-relaxed'>
          {`Are you sure you want to remove the ${skill.name} project permanently?`}
        </p>
        <p className='text-base md:text-base text-muted-foreground mb-8 leading-relaxed'>
          This action cannot be undone.
        </p>
        <div className='grid grid-cols-2 gap-3'>
          <button
            onClick={onClose}
            className='bg-accent py-2 rounded-md cursor-pointer transition-all duration-100 ease-in-out hover:bg-accent/80'
          >
            Cancel
          </button>
          <button
            onClick={removeHandler}
            className='bg-secondary py-2 rounded-md cursor-pointer transition-all duration-100 ease-in-out hover:bg-destructive'
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
