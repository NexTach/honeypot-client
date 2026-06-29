'use client';

import { useMemo, useState } from 'react';

import { type Gif, GifListItem } from '@/entities/gif';
import { type Report, ReportStats, STATUS_LABELS } from '@/entities/report';
import { Badge, Button, IconButton, SortDropdown } from '@/shared/ui';

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

const SORT_KEYS = Object.keys(SORT_LABELS) as SortKey[];

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

          <SortDropdown
            value={sort}
            options={SORT_KEYS}
            getLabel={(key) => SORT_LABELS[key]}
            onChange={setSort}
          />
        </div>

        {/* 신고 리스트 */}
        <div className="flex flex-col">
          {visibleItems.map((item) => (
            <GifListItem
              key={item.report.id}
              gif={item.gif}
              href={`/my-page/reports/${item.report.id}`}
              rightSlot={<Badge>{STATUS_LABELS[item.report.status]}</Badge>}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default ReportManagementPage;
