'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/lib';
import { Card, Input } from '@/shared/ui';

const SORT_OPTIONS = ['인기순', '최신순', '오래된순'] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

const SortDropdown = ({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="border-ink bg-cream font-pretendard text-body text-ink hover:bg-retro-gray flex h-[46px] cursor-pointer items-center gap-[10px] border px-5 leading-none tracking-[-0.32px] transition-colors"
      >
        <span>{value}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </button>
      {open && (
        <div className="border-ink bg-cream absolute top-full right-0 z-10 min-w-full border border-t-0">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={cn(
                'font-pretendard text-body w-full cursor-pointer px-5 py-[15px] text-left leading-none tracking-[-0.32px] whitespace-nowrap transition-colors',
                option === value ? 'bg-ink text-cream' : 'bg-cream text-ink hover:bg-retro-gray',
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const POPULAR_TAGS = ['이주언', '8기', '9기', '앙승일', '10기', '기숙사', 'AI', '똥'] as const;

const MOCK_GIFS = [
  {
    id: 1,
    src: 'https://placehold.co/273x485/ede7d9/3d3028.png',
    caption: '평범한 먀울 짤',
    ratio: '9:16' as const,
  },
  {
    id: 2,
    src: 'https://placehold.co/273x273/ede7d9/3d3028.png',
    caption: '1919년에 가버린 정종윤',
    ratio: '1:1' as const,
  },
  {
    id: 3,
    src: 'https://placehold.co/273x273/ede7d9/3d3028.png',
    caption: '기니피그 준연',
    ratio: '1:1' as const,
  },
  {
    id: 4,
    src: 'https://placehold.co/273x485/ede7d9/3d3028.png',
    caption: '평범한 먀울 짤',
    ratio: '9:16' as const,
  },
  {
    id: 5,
    src: 'https://placehold.co/273x273/ede7d9/3d3028.png',
    caption: '1919년에 가버린 정종윤',
    ratio: '1:1' as const,
  },
  {
    id: 6,
    src: 'https://placehold.co/273x153/ede7d9/3d3028.png',
    caption: '단결 투쟁 치피',
    ratio: '16:9' as const,
  },
  {
    id: 7,
    src: 'https://placehold.co/273x485/ede7d9/3d3028.png',
    caption: '평범한 먀울 짤',
    ratio: '9:16' as const,
  },
  {
    id: 8,
    src: 'https://placehold.co/273x153/ede7d9/3d3028.png',
    caption: '단결 투쟁 치피',
    ratio: '16:9' as const,
  },
  {
    id: 9,
    src: 'https://placehold.co/273x153/ede7d9/3d3028.png',
    caption: 'GIF 이름',
    ratio: '16:9' as const,
  },
  {
    id: 10,
    src: 'https://placehold.co/273x485/ede7d9/3d3028.png',
    caption: '평범한 먀울 짤',
    ratio: '9:16' as const,
  },
  {
    id: 11,
    src: 'https://placehold.co/273x153/ede7d9/3d3028.png',
    caption: '단결 투쟁 치피',
    ratio: '16:9' as const,
  },
  {
    id: 12,
    src: 'https://placehold.co/273x273/ede7d9/3d3028.png',
    caption: '기니피그 준연',
    ratio: '1:1' as const,
  },
  {
    id: 13,
    src: 'https://placehold.co/273x485/ede7d9/3d3028.png',
    caption: '둥근 캣',
    ratio: '9:16' as const,
  },
  {
    id: 14,
    src: 'https://placehold.co/273x273/ede7d9/3d3028.png',
    caption: '기니피그 준연',
    ratio: '1:1' as const,
  },
  {
    id: 15,
    src: 'https://placehold.co/273x153/ede7d9/3d3028.png',
    caption: '단결 투쟁 치피',
    ratio: '16:9' as const,
  },
  {
    id: 16,
    src: 'https://placehold.co/273x485/ede7d9/3d3028.png',
    caption: '평범한 먀울 짤',
    ratio: '9:16' as const,
  },
];

const ExplorePage = () => {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>('인기순');

  return (
    <main className="mx-auto flex w-full max-w-[1152px] flex-col gap-24 px-5 py-20 sm:px-12 lg:px-0">
      <div className="w-full lg:max-w-[576px]">
        <Input
          label="GIF 검색"
          placeholder="태그 또는 키워드를 입력해주세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <section className="flex flex-col gap-3">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-pretendard text-body text-ink">인기 태그</p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={cn(
                    'border-ink font-pretendard text-body cursor-pointer border px-5 py-[15px] leading-none tracking-[-0.32px] transition-colors',
                    activeTag === tag
                      ? 'bg-ink text-cream'
                      : 'bg-cream text-ink hover:bg-retro-gray',
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <SortDropdown value={sort} onChange={setSort} />
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
          {MOCK_GIFS.map((gif) => (
            <div key={gif.id} className="mb-3 break-inside-avoid">
              <Card src={gif.src} caption={gif.caption} ratio={gif.ratio} className="w-full" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ExplorePage;
