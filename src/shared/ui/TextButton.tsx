import { cn } from '@/shared/lib';

interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const TextButton = ({ active = false, children, className, ...props }: TextButtonProps) => (
  <button
    className={cn(
      'font-pretendard text-body cursor-pointer py-0.5 tracking-[-0.32px] transition-colors disabled:cursor-not-allowed',
      active
        ? 'border-stripe-red text-ink border-b-2 font-bold'
        : 'text-ink-disabled hover:text-ink font-normal',
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export default TextButton;
