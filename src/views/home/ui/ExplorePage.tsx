'use client';

import { useState } from 'react';

import Link from 'next/link';

import { type Gif, useGetGifs } from '@/entities/gif';
import { useGetTags } from '@/entities/tag';
import { gifRawUrl } from '@/shared/api';
import { cn } from '@/shared/lib';
import { Card, Input, SortDropdown } from '@/shared/ui';

const SORT_OPTIONS = ['인기순', '최신순', '오래된순'] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

// ponytail: 서버 sort enum 미확인(기본 'latest'만 확인됨). 백엔드 확정 시 교정.
const SORT_PARAM: Record<SortOption, string> = {
  인기순: 'popular',
  최신순: 'latest',
  오래된순: 'oldest',
};

const cardRatio = (gif: Gif): '9:16' | '1:1' | '16:9' => {
  if (!gif.width || !gif.height) return '1:1';
  const r = gif.width / gif.height;
  if (r < 0.85) return '9:16';
  if (r > 1.3) return '16:9';
  return '1:1';
};

const ExplorePage = () => {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>('인기순');

  const keyword = search.trim() || activeTag || undefined;
  const { data, isLoading, isError } = useGetGifs({
    keyword,
    sort: SORT_PARAM[sort],
    size: 30,
  });
  const gifs = data?.content ?? [];

  // ponytail: keyword 없이 전체 태그 조회 → 인기 태그 칩. 서버가 인기순 정렬 안 주면 단순 목록.
  const { data: tags } = useGetTags();
  const popularTags = (tags ?? []).slice(0, 8);

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
              {popularTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => setActiveTag(activeTag === tag.name ? null : tag.name)}
                  className={cn(
                    'border-ink font-pretendard text-body cursor-pointer border px-5 py-[15px] leading-none tracking-[-0.32px] transition-colors',
                    activeTag === tag.name
                      ? 'bg-ink text-cream'
                      : 'bg-cream text-ink hover:bg-retro-gray',
                  )}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
          <SortDropdown value={sort} options={SORT_OPTIONS} onChange={setSort} />
        </div>

        {isLoading ? (
          <p className="font-pretendard text-body text-ink-disabled">불러오는 중...</p>
        ) : isError ? (
          <p className="font-pretendard text-body text-stripe-red">GIF를 불러오지 못했어요.</p>
        ) : gifs.length === 0 ? (
          <p className="font-pretendard text-body text-ink-disabled">결과가 없어요.</p>
        ) : (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-4">
            {gifs.map((gif) => (
              <Link key={gif.id} href={`/gifs/${gif.id}`} className="mb-3 block break-inside-avoid">
                <Card
                  src={gifRawUrl(gif.id)}
                  caption={gif.title}
                  ratio={cardRatio(gif)}
                  className="w-full"
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ExplorePage;
