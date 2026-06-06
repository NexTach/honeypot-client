import { forwardRef } from 'react';

import { cn } from '@/shared/lib';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  confirmed?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ confirmed = false, children, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'border-ink flex w-full items-center justify-center border',
        'font-pretendard text-body leading-none tracking-[-0.32px]',
        'px-[115px] py-[15px] transition-colors',
        confirmed ? 'bg-ink text-cream hover:bg-ink' : 'bg-cream text-ink hover:bg-retro-gray',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = 'Button';

export default Button;
