'use client';

import { forwardRef } from 'react';

import { cn } from '@/shared/lib';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string;
  error?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      <label className="font-pretendard text-body text-ink tracking-[-0.32px]">{label}</label>
      <input
        ref={ref}
        className={cn(
          'border-ink w-full border px-[10px] py-[10px]',
          'font-pretendard text-body tracking-[-0.32px]',
          'bg-cream text-ink placeholder:text-ink-disabled',
          'focus:bg-retro-gray focus:outline-none',
          error && 'bg-retro-gray',
        )}
        {...props}
      />
      {error && <p className="text-caption text-stripe-red font-mono uppercase">{error}</p>}
    </div>
  ),
);
Input.displayName = 'Input';

export default Input;
