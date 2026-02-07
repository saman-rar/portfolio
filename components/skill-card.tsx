import { techs } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

type Skill = (typeof techs)[0];

interface SkillCardProps {
  skill: Skill;
  setSelectedSkill?: Dispatch<SetStateAction<Skill | null>>;
  isOddOrLast?: boolean;
  isOnly: boolean;
  locale?: 'en' | 'fa';
}

const SkillCard = ({
  skill,
  setSelectedSkill,
  isOddOrLast,
  isOnly,
  locale = 'en',
}: SkillCardProps) => {
  const clickHandler = (skill: Skill) => {
    if (setSelectedSkill) {
      setSelectedSkill(skill);
    }
  };

  return (
    <div
      onClick={() => clickHandler(skill)}
      className={cn(
        'cursor-pointer group p-4 md:p-6 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all',
        {
          'lg:col-span-2': isOddOrLast,
          'col-span-2': isOnly,
        },
      )}
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
