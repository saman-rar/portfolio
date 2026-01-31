'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const transitionProps = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

interface CuisineSelectorProps {
  title: string;
  cuisines: string[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
}

export default function CuisineSelector({
  title,
  cuisines,
  selected,
  setSelected,
}: CuisineSelectorProps) {
  const toggleCuisine = (cuisine: string) => {
    setSelected((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine],
    );
  };

  return (
    <div className='p-6'>
      <h1 className='text-black dark:text-white text-3xl font-semibold mb-12'>
        {title}
      </h1>
      <div className='mx-auto'>
        <div className='flex flex-wrap gap-3 overflow-visible'>
          {cuisines.map((cuisine) => {
            const isSelected = selected.includes(cuisine);
            return (
              <button
                key={cuisine}
                type='button'
                onClick={() => toggleCuisine(cuisine)}
                className={`
                  inline-flex bg-black/8 dark:bg-white/5 items-center px-4 py-2 rounded-full text-base font-medium
                  whitespace-nowrap overflow-hidden ring-1 ring-inset cursor-pointer hover:ring-accent
                  ${
                    isSelected
                      ? 'text-accent ring-[hsla(0,0%,100%,0.12)]'
                      : 'text-zinc-500 ring-[hsla(0,0%,100%,0.06)]'
                  }
                `}
              >
                <div className='relative flex items-center'>
                  <span>{cuisine}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
