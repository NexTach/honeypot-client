'use client';

import { type Gif, GifInfo } from '@/entities/gif';
import type { Report } from '@/entities/report';
import { usePatchReport } from '@/features/report-process';
import { cn } from '@/shared/lib';
import { IconButton } from '@/shared/ui';

interface ReportDetailPageProps {
  report: Report;
  gif: Gif;
}

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <span className="font-pretendard text-caption text-ink-disabled">{label}</span>
    <span className="font-pretendard text-body text-ink">{value}</span>
  </div>
);

const actionClass =
  'border px-5 py-[15px] font-pretendard text-body leading-none tracking-[-0.32px] transition-colors cursor-pointer shrink-0 disabled:cursor-not-allowed';

const ReportDetailPage = ({ report, gif }: ReportDetailPageProps) => {
  const patchReport = usePatchReport(report.id);
  const isProcessed = report.status !== 'PENDING';
  const disabled = patchReport.isPending || isProcessed;

  return (
    <main className="bg-cream min-h-[calc(100vh-69px)] px-5 py-10 sm:px-12 lg:px-36">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-8">
        <IconButton variant="back" className="w-fit" onClick={() => window.history.back()} />

        <h1 className="font-pretendard text-h2 text-ink font-semibold tracking-[-1px]">
          신고 상세
        </h1>

        {/* 신고 정보 */}
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <Field label="신고자" value={`사용자 #${report.reporterId}`} />
          <Field label="신고사유" value={report.reasonTitle} />
          <Field label="신고내용" value={report.detail} />
        </div>

        {/* 대상 GIF + 처리 액션 */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            <div className="bg-retro-gray aspect-square w-full shrink-0 sm:w-[200px]" />
            <GifInfo gif={gif} showShareCount={false} />
          </div>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              disabled={disabled}
              onClick={() => patchReport.mutate({ action: 'NO_ISSUE' })}
              className={cn(actionClass, 'border-ink text-ink hover:bg-retro-gray')}
            >
              문제 없음
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => patchReport.mutate({ action: 'BLIND' })}
              className={cn(actionClass, 'border-ink text-ink hover:bg-retro-gray')}
            >
              비공개 처리
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => patchReport.mutate({ action: 'DELETE' })}
              className={cn(
                actionClass,
                'border-stripe-red text-stripe-red hover:bg-stripe-red hover:text-cream',
              )}
            >
              GIF 삭제
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportDetailPage;
