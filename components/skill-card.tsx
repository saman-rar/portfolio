import {
  ProjectGetPayload,
  SkillGetPayload,
} from '@/lib/generated/prisma/models';
import { Dispatch, SetStateAction } from 'react';

type Skill =
  | {
      name: string;
      category: string;
      description: string;
      yearsOfExperience: string;
      level: number;
      projects: ProjectGetPayload<{
        include: { techs: true; categories: true };
      }>[];
    }
  | SkillGetPayload<{
      include: {
        category: true;
        projects: true;
      };
    }>;

interface SkillCardProps {
  skill: Skill;
  setSelectedSkill?: Dispatch<
    SetStateAction<SkillGetPayload<{
      include: {
        category: true;
        projects: true;
      };
    }> | null>
  >;
  isOddOrLast?: boolean;
  locale?: 'en' | 'fa';
}

const SkillCard = ({
  skill,
  setSelectedSkill,
  isOddOrLast,
  locale = 'en',
}: SkillCardProps) => {
  const clickHandler = (skill: Skill) => {
    if (setSelectedSkill) {
      setSelectedSkill(
        skill as SkillGetPayload<{
          include: {
            category: true;
            projects: true;
          };
        }>,
      );
    }
  };

  return (
    <div
      onClick={() => clickHandler(skill)}
      className={`cursor-pointer group p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all ${isOddOrLast ? 'lg:col-span-2' : null}`}
    >
      <div className='flex justify-between mb-4 items-center'>
        <span className='text-sm md:text-base font-semibold text-foreground group-hover:text-accent transition-colors'>
          {skill.name}
        </span>
        <span className='text-xs md:text-sm text-muted-foreground group-hover:text-accent transition-colors font-medium'>
          {skill.yearsOfExperience === '+0'
            ? 'Learning'
            : locale === 'en'
              ? `${skill.yearsOfExperience} years`
              : `${skill.yearsOfExperience} سال`}
        </span>
      </div>
      <div className='h-2 bg-background rounded-full overflow-hidden'>
        <div
          className='h-full bg-accent rounded-full transition-all duration-1000 ease-out'
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
};
export default SkillCard;
