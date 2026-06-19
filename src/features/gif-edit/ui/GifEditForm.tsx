'use client';

import { useState } from 'react';

import type { Gif } from '@/entities/gif';
import { cn } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

interface GifEditFormProps {
  gif: Gif;
  onClose: () => void;
}

const GifEditForm = ({ gif, onClose }: GifEditFormProps) => {
  const [isPublic, setIsPublic] = useState(gif.isPublic);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-1 flex-col justify-between gap-8">
      <div className="flex flex-col gap-4 sm:gap-6">
        <Input label="GIF이름" defaultValue={gif.title} placeholder="입력ㄱㄱ" maxLength={15} />

        <Input label="설명" defaultValue={gif.description} placeholder="입력ㄱㄱ" />

        <Input
          label="태그"
          defaultValue={gif.tags.map((tag) => `#${tag}`).join(' ')}
          placeholder="입력ㄱㄱ"
        />

        <div className="flex w-full flex-col gap-1">
          <span className="font-pretendard text-body text-ink tracking-[-0.32px]">공개 여부*</span>
          <div className="flex gap-3 sm:gap-4">
            <Button
              type="button"
              confirmed={isPublic}
              onClick={() => setIsPublic(true)}
              className="flex-1 px-4 lg:px-[115px]"
            >
              공개
            </Button>
            <Button
              type="button"
              confirmed={!isPublic}
              onClick={() => setIsPublic(false)}
              className="flex-1 px-4 lg:px-[115px]"
            >
              비공개
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className={cn(
            'border-stripe-red text-stripe-red border px-5 py-2.5',
            'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
            'hover:bg-stripe-red hover:text-cream cursor-pointer',
          )}
        >
          취소
        </button>
        <button
          type="submit"
          className={cn(
            'border-ink text-ink bg-cream border px-5 py-2.5',
            'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
            'hover:bg-retro-gray cursor-pointer',
          )}
        >
          저장
        </button>
      </div>
    </form>
  );
};

export default GifEditForm;
