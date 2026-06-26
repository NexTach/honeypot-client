'use client';

import { useMemo, useState } from 'react';

import { type Gif, GifListItem } from '@/entities/gif';
import { type Report, ReportStats, STATUS_LABELS } from '@/entities/report';
import { cn } from '@/shared/lib';
import { Button, IconButton } from '@/shared/ui';

export interface ReportItem {
  report: Report;
  gif: Gif;
}

interface ReportManagementPageProps {
  items: ReportItem[];
}

type FilterKey = 'pending' | 'resolved' | 'all';
type SortKey = 'recent' | 'oldest';

const FILTER_LABELS: Record<FilterKey, string> = {
  pending: '대기 중',
  resolved: '처리 완료',
  all: '전체',
};

const SORT_LABELS: Record<SortKey, string> = {
  recent: '최신순',
  oldest: '오래된순',
};

const ChevronDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M7 10l5 5 5-5H7z" />
  </svg>
);

const StatusBadge = ({ report }: { report: Report }) => (
  <span className="border-ink-disabled text-ink-disabled font-pretendard text-body shrink-0 border px-5 py-[15px] leading-none tracking-[-0.32px]">
    {STATUS_LABELS[report.status]}
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

const ReportManagementPage = ({ items }: ReportManagementPageProps) => {
  const [filter, setFilter] = useState<FilterKey>('pending');
  const [sort, setSort] = useState<SortKey>('recent');

  const pendingCount = items.filter((item) => item.report.status === 'PENDING').length;

  const visibleItems = useMemo(() => {
    const filtered = items.filter((item) => {
      if (filter === 'pending') return item.report.status === 'PENDING';
      if (filter === 'resolved') return item.report.status !== 'PENDING';
      return true;
    });

    return [...filtered].sort((a, b) => {
      const diff = a.report.createdAt.localeCompare(b.report.createdAt);
      return sort === 'recent' ? -diff : diff;
    });
  }, [items, filter, sort]);

  return (
    <main className="bg-cream min-h-[calc(100vh-69px)] px-5 py-10 sm:px-12 lg:px-36">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-8">
        <IconButton variant="back" className="w-fit" onClick={() => window.history.back()} />

        {/* 제목 + 통계 */}
        <div className="flex flex-col gap-2">
          <h1 className="font-pretendard text-h2 text-ink font-semibold tracking-[-1px]">
            신고 관리
          </h1>
          <ReportStats
            pendingCount={pendingCount}
            resolvedCount={items.length - pendingCount}
            totalCount={items.length}
          />
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

        {/* 신고 리스트 */}
        <div className="flex flex-col">
          {visibleItems.map((item) => (
            <GifListItem
              key={item.report.id}
              gif={item.gif}
              href={`/my-page/reports/${item.report.id}`}
              rightSlot={<StatusBadge report={item.report} />}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ReportManagementPage;
