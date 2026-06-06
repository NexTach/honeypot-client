import { cn } from '@/shared/lib';

interface TagChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

const TagChip = ({ label, onRemove, className }: TagChipProps) => (
  <div
    className={cn(
      'border-ink-disabled inline-flex items-center gap-[10px] border px-3 py-1.5',
      className,
    )}
  >
    <span className="font-pretendard text-body text-ink leading-none tracking-[-0.32px] whitespace-nowrap">
      {label}
    </span>
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="text-ink-disabled hover:text-ink flex size-4 cursor-pointer items-center justify-center"
        aria-label={`${label} 태그 제거`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <path d="M12 4.7l-.7-.7L8 7.3 4.7 4l-.7.7L7.3 8 4 11.3l.7.7L8 8.7l3.3 3.3.7-.7L8.7 8z" />
        </svg>
      </button>
    )}
  </div>
);

export default TagChip;
