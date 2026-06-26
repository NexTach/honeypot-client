import Link from 'next/link';

import type { ReactNode } from 'react';

import type { Gif } from '../model/types';

interface GifListItemProps {
  gif: Gif;
  rightSlot?: ReactNode;
  href?: string;
}

const GifListItem = ({ gif, rightSlot, href }: GifListItemProps) => {
  const content = (
    <div className="border-border hover:bg-retro-gray -mb-px flex items-center gap-6 border px-5 py-6 transition-colors sm:gap-12 sm:px-14">
      {/* 썸네일 (더미 placeholder) */}
      <div className="border-ink bg-cream size-20 shrink-0 border sm:size-[120px]" />

      <div className="flex flex-1 items-center justify-between gap-4">
        <div className="flex flex-col gap-2 sm:gap-4">
          <p className="font-pretendard text-title text-ink">{gif.title}</p>
          <p className="text-caption text-ink-disabled font-mono uppercase">
            {gif.createdAt} {'//'} 좋아요 {gif.likeCount}
          </p>
        </div>

        {rightSlot}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {content}
    </Link>
  ) : (
    content
  );
};

export default GifListItem;
