import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  href?: string;
  children: ReactNode;
  clickHandler?: () => void;
}

const Button = ({ href, children, clickHandler }: ButtonProps) => {
  const styles =
    'bg-secondary border border-accent py-2 px-4 rounded-md text-accent transition duration-150 hover:bg-accent hover:text-white';

  if (href) {
    return (
      <Link
        className='bg-secondary flex justify-between items-center border border-accent py-1 px-2 text-sm lg:text-base rounded-md text-accent transition duration-150 hover:bg-accent hover:text-white'
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className='bg-secondary py-2 px-4 rounded-md text-accent transition duration-150 hover:bg-accent hover:text-white'
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};
export default Button;
