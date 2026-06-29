'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib';

type CardRatio = '9:16' | '1:1' | '16:9';

interface CardProps {
  src: string;
  alt?: string;
  caption: string;
  ratio?: CardRatio;
  className?: string;
}

const ratioClass: Record<CardRatio, string> = {
  '9:16': 'aspect-[9/16]',
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
};

// 가로/세로 → 카드 버킷. 백엔드 width/height가 null일 때 img 실측 보정용.
const ratioFromSize = (w: number, h: number): CardRatio =>
  w / h < 0.85 ? '9:16' : w / h > 1.3 ? '16:9' : '1:1';

const Card = ({ src, alt = '', caption, ratio = '1:1', className }: CardProps) => {
  // prop ratio는 로드 전 초기값(점프 완화). 로드되면 실제 픽셀 비율로 보정.
  const [measured, setMeasured] = useState<CardRatio>(ratio);

  return (
    <div className={cn('flex flex-col', className)}>
      <div className={cn('relative w-full overflow-hidden', ratioClass[measured])}>
        {/* GIF 애니메이션은 next/image 최적화 이슈가 있어 plain img 사용 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={(e) =>
            setMeasured(ratioFromSize(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight))
          }
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="bg-cream w-full px-0.5 py-1">
        <p className="font-pretendard text-body text-ink-disabled truncate">{caption}</p>
      </div>
    </div>
  );
};

export default Card;
