import { cn } from '@/shared/lib';

type IconButtonVariant = 'sort' | 'back';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
}

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const IconButton = ({ variant = 'sort', className, ...props }: IconButtonProps) => (
  <button
    className={cn(
      'border-ink flex h-[46px] items-center justify-center gap-[10px] border px-5',
      'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
      'bg-cream text-ink hover:bg-retro-gray active:bg-ink active:text-cream',
      'cursor-pointer disabled:cursor-not-allowed',
      className,
    )}
    {...props}
  >
    {variant === 'sort' ? (
      <>
        <span>인기순</span>
        <ChevronDownIcon />
      </>
    ) : (
      <>
        <ArrowLeftIcon />
        <span>이전으로</span>
      </>
    )}
  </button>
);

export default IconButton;
