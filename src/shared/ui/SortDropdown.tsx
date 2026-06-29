'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib';

import ChevronDownIcon from './ChevronDownIcon';

interface SortDropdownProps<T extends string> {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  /** 값과 표시 라벨이 다를 때 사용. 생략 시 값 자체를 라벨로. */
  getLabel?: (value: T) => string;
  className?: string;
}

const SortDropdown = <T extends string>({
  value,
  options,
  onChange,
  getLabel = (v) => v,
  className,
}: SortDropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={cn('relative shrink-0', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="border-ink bg-cream font-pretendard text-body text-ink hover:bg-retro-gray flex h-[46px] cursor-pointer items-center gap-[10px] border px-5 leading-none tracking-[-0.32px] transition-colors"
      >
        <span>{getLabel(value)}</span>
        <ChevronDownIcon
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="border-ink bg-cream absolute top-full right-0 z-10 min-w-full border border-t-0">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={cn(
                'font-pretendard text-body w-full cursor-pointer px-5 py-[15px] text-left leading-none tracking-[-0.32px] whitespace-nowrap transition-colors',
                option === value ? 'bg-ink text-cream' : 'bg-cream text-ink hover:bg-retro-gray',
              )}
            >
              {getLabel(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
