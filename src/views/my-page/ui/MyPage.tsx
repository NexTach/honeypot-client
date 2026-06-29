'use client';

import { useMemo, useState } from 'react';

import Link from 'next/link';

import { type Gif, GifListItem } from '@/entities/gif';
import { type User, UserStats } from '@/entities/user';
import { useLogout } from '@/features/auth';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';

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

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

const PublicBadge = ({ isPublic }: { isPublic: boolean }) => (
  <span className="border-ink-disabled text-ink-disabled font-pretendard text-body shrink-0 border px-5 py-[15px] leading-none tracking-[-0.32px]">
    {isPublic ? '공개' : '비공개'}
  </span>
);

const SortDropdown = ({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="border-ink bg-cream text-ink hover:bg-retro-gray flex h-[46px] items-center gap-2.5 border px-5 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="font-pretendard text-body leading-none tracking-[-0.32px]">
          {SORT_LABELS[value]}
        </span>
        <ChevronDownIcon />
      </button>

      {open && (
        <ul className="border-ink bg-cream absolute top-full right-0 z-10 mt-1 flex flex-col border">
          {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
            <li key={key}>
              <button
                type="button"
                onClick={() => {
                  onChange(key);
                  setOpen(false);
                }}
                className={cn(
                  'hover:bg-retro-gray w-full px-5 py-2.5 text-left whitespace-nowrap transition-colors',
                  'font-pretendard text-body leading-none tracking-[-0.32px]',
                  key === value ? 'text-ink' : 'text-ink-disabled',
                )}
              >
                {SORT_LABELS[key]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

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

          <SortDropdown value={sort} onChange={setSort} />
        </div>

        {/* GIF 리스트 */}
        <div className="flex flex-col">
          {visibleGifs.map((gif) => (
            <GifListItem
              key={gif.id}
              gif={gif}
              href={`/gifs/${gif.id}`}
              rightSlot={<PublicBadge isPublic={gif.isPublic} />}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyPage;
