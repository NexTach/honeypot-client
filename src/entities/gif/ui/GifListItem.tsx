import { cn } from '@/shared/lib';

import type { Gif } from '../model/types';

interface GifListItemProps {
  gif: Gif;
}

const GifListItem = ({ gif }: GifListItemProps) => (
  <div className="border-border hover:bg-retro-gray -mb-px flex items-center gap-6 border px-5 py-6 transition-colors sm:gap-12 sm:px-14">
    {/* 썸네일 (더미 placeholder) */}
    <div className="border-ink bg-cream size-20 shrink-0 border sm:size-[120px]" />

    <div className="flex flex-1 items-center justify-between gap-4">
      <div className="flex flex-col gap-2 sm:gap-4">
        <p className="font-pretendard text-title text-ink">{gif.title}</p>
        <p className="text-caption text-ink-disabled font-mono uppercase">
          {gif.createdAt} {'//'} 조회 {gif.viewCount}
        </p>
      </div>

      <span
        className={cn(
          'border-ink-disabled text-ink-disabled shrink-0 border px-5 py-[15px]',
          'font-pretendard text-body leading-none tracking-[-0.32px]',
        )}
      >
        {gif.isPublic ? '공개' : '비공개'}
      </span>
    </div>
  </div>
);

export default GifListItem;
