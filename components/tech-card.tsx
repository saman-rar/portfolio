import { SkillIcons } from './skill-icons';

interface TechCardProps {
  icon: string;
  name: string;
  category: string;
  yearsOfExperience: string;
  description: string;
}

const TechCard = ({
  icon = 'CodeIcon',
  name = 'Tech',
  category = 'Front-End',
  yearsOfExperience = 'Learning',
  description = 'Progressive framework for web development.',
}: TechCardProps) => {
  const Icon = SkillIcons[icon];
  return (
    <div className='flex justify-center'>
      <div className='border transition duration-100 ease-in group border-black/20 dark:border-white/15 cursor-pointer hover:border-accent/70 dark:hover:border-accent/70 flex flex-col rounded-lg overflow-hidden'>
        <div className='relative aspect-square max-w-100 overflow-hidden flex justify-center items-center'>
          <Icon />
        </div>
        <div className='py-4 px-3 bg-secondary flex-1'>
          <div className='flex justify-between items-center py-1 mb-2'>
            <h3 className='font-bold text-xl transition duration-100 ease-in group-hover:text-accent'>
              {name}
            </h3>
            <p className='text-accent text-xs rounded-sm border border-accent p-1'>
              {category}
            </p>
          </div>
          <p className='text-muted-foreground text-sm'>{yearsOfExperience}</p>
          <p className='text-sm p-1.5 max-w-95'>{description}</p>
          <p></p>
        </div>
      </div>
    </div>
  );
};
export default TechCard;
