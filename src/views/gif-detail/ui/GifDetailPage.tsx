'use client';

import { useState } from 'react';

import { type Gif, GifInfo } from '@/entities/gif';
import { GifEditForm } from '@/features/gif-edit';
import { GifReportForm } from '@/features/gif-report';
import { cn } from '@/shared/lib';
import { IconButton } from '@/shared/ui';

type DetailMode = 'view' | 'edit' | 'report';

interface GifDetailPageProps {
  gif: Gif;
  isOwner: boolean;
}

const CopyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <rect x="9" y="9" width="11" height="11" rx="1" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </svg>
);

const GifDetailPage = ({ gif, isOwner }: GifDetailPageProps) => {
  const [mode, setMode] = useState<DetailMode>('view');

  const handleCopy = () => {
    navigator.clipboard.writeText(gif.url);
  };

  const backToView = () => setMode('view');

  return (
    <main className="bg-cream min-h-[calc(100vh-69px)] px-5 py-10 sm:px-12 lg:px-36">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-8">
        <IconButton variant="back" className="w-fit" onClick={() => window.history.back()} />

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          {/* GIF 미리보기 (더미 placeholder) */}
          <div className="bg-retro-gray aspect-square w-full shrink-0 lg:w-[360px]" />

          {/* 정보 / 편집 패널 */}
          <div className="flex flex-1 flex-col justify-between gap-8">
            {mode === 'edit' ? (
              <GifEditForm gif={gif} onClose={backToView} />
            ) : mode === 'report' ? (
              <GifReportForm onClose={backToView} />
            ) : (
              <>
                <GifInfo gif={gif} />

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* URL 복사 박스 */}
                  <div className="border-ink flex items-center gap-2 border px-3 py-2.5">
                    <input
                      readOnly
                      value={gif.url}
                      className="font-pretendard text-body text-ink w-full min-w-0 bg-transparent outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-ink hover:text-ink-soft shrink-0 cursor-pointer"
                      aria-label="GIF 주소 복사"
                    >
                      <CopyIcon />
                    </button>
                  </div>

                  {/* 액션 버튼: 본인이면 편집, 아니면 신고 */}
                  {isOwner ? (
                    <button
                      type="button"
                      onClick={() => setMode('edit')}
                      className={cn(
                        'border-ink text-ink bg-cream shrink-0 border px-5 py-2.5',
                        'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
                        'hover:bg-retro-gray cursor-pointer',
                      )}
                    >
                      편집하기
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setMode('report')}
                      className={cn(
                        'border-stripe-red text-stripe-red shrink-0 border px-5 py-2.5',
                        'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
                        'hover:bg-stripe-red hover:text-cream cursor-pointer',
                      )}
                    >
                      신고
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default GifDetailPage;
