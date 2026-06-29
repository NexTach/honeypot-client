'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { type Gif, GifListItem } from '@/entities/gif';
import { type User, UserStats } from '@/entities/user';
import { useLogout } from '@/features/auth';
import { cn } from '@/shared/lib';
import { Badge, Button, SortDropdown } from '@/shared/ui';

interface MyPageProps {
  user: User;
  gifs: Gif[];
}

type FilterKey = 'all' | 'public' | 'private';
type SortKey = 'popular' | 'recent';

const FILTER_LABELS: Record<FilterKey, string> = {
  all: '전체',
  public: '공개',
  private: '비공개',
};

const SORT_LABELS: Record<SortKey, string> = {
  popular: '인기순',
  recent: '최신순',
};

const SORT_KEYS = Object.keys(SORT_LABELS) as SortKey[];

const MyPage = ({ user, gifs }: MyPageProps) => {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [sort, setSort] = useState<SortKey>('popular');
  const logout = useLogout();

  const visibleGifs = useMemo(() => {
    const filtered = gifs.filter((gif) => {
      if (filter === 'public') return gif.isPublic;
      if (filter === 'private') return !gif.isPublic;
      return true;
    });

    return [...filtered].sort((a, b) =>
      sort === 'popular' ? b.likeCount - a.likeCount : b.createdAt.localeCompare(a.createdAt),
    );
  }, [gifs, filter, sort]);

  return (
    <main className="bg-cream min-h-[calc(100vh-69px)] px-5 py-10 sm:px-12 lg:px-36">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-10">
        {/* 헤더: 제목 + 통계 + 액션 */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-pretendard text-h2 text-ink font-semibold tracking-[-1px]">
              내 꿀통
            </h1>
            <UserStats user={user} />
          </div>

          <div className="flex shrink-0 gap-2">
            {user.isAdmin && (
              <Link
                href="/my-page/reports"
                className={cn(
                  'border-stripe-red text-stripe-red border px-5 py-[15px]',
                  'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
                  'hover:bg-stripe-red hover:text-cream cursor-pointer',
                )}
              >
                신고 관리
              </Link>
            )}
            <button
              type="button"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
              className={cn(
                'border-ink text-ink bg-cream border px-5 py-[15px]',
                'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
                'hover:bg-retro-gray cursor-pointer disabled:cursor-not-allowed',
              )}
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 필터 탭 + 정렬 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {(Object.keys(FILTER_LABELS) as FilterKey[]).map((key) => (
              <Button
                key={key}
                confirmed={filter === key}
                onClick={() => setFilter(key)}
                className="w-fit px-5"
              >
                {FILTER_LABELS[key]}
              </Button>
            ))}
          </div>

          <SortDropdown
            value={sort}
            options={SORT_KEYS}
            getLabel={(key) => SORT_LABELS[key]}
            onChange={setSort}
          />
        </div>

        {/* GIF 리스트 */}
        <div className="flex flex-col">
          {visibleGifs.map((gif) => (
            <GifListItem
              key={gif.id}
              gif={gif}
              href={`/gifs/${gif.id}`}
              rightSlot={<Badge>{gif.isPublic ? '공개' : '비공개'}</Badge>}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyPage;
