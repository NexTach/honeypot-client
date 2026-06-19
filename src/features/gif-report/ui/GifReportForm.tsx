'use client';

import { cn } from '@/shared/lib';
import { Input } from '@/shared/ui';

interface GifReportFormProps {
  onClose: () => void;
}

const GifReportForm = ({ onClose }: GifReportFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-4 sm:gap-6">
        <Input label="신고사유" placeholder="입력ㄱㄱ" />

        <div className="flex w-full flex-col gap-1">
          <label className="font-pretendard text-body text-ink tracking-[-0.32px]">내용</label>
          <textarea
            className={cn(
              'border-ink w-full border px-[10px] py-[10px]',
              'font-pretendard text-body tracking-[-0.32px]',
              'bg-cream text-ink placeholder:text-ink-disabled',
              'focus:bg-retro-gray focus:outline-none',
              'cursor-text resize-none disabled:cursor-not-allowed',
            )}
            rows={3}
            placeholder="GIF 신고 내용을 작성해주세요"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className={cn(
            'border-stripe-red text-stripe-red border px-5 py-2.5',
            'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
            'hover:bg-stripe-red hover:text-cream cursor-pointer',
          )}
        >
          신고하기
        </button>
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'border-ink text-ink bg-cream border px-5 py-2.5',
            'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
            'hover:bg-retro-gray cursor-pointer',
          )}
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default GifReportForm;
