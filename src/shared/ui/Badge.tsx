import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

const Badge = ({ children, className }: BadgeProps) => (
  <span
    className={cn(
      'border-ink-disabled text-ink-disabled font-pretendard text-body shrink-0 border px-5 py-[15px] leading-none tracking-[-0.32px]',
      className,
    )}
  >
    {children}
  </span>
);

export default Badge;
