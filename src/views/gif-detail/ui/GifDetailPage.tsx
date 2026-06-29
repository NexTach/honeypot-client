'use client';

import { useState } from 'react';

import { type Gif, GifInfo } from '@/entities/gif';
import { useDeleteGif, useDeleteLike, usePostLike, usePostShare } from '@/features/gif-actions';
import { GifEditForm } from '@/features/gif-edit';
import { GifReportForm } from '@/features/gif-report';
import { apiUrls } from '@/shared/api';
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

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
  >
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

const GifDetailPage = ({ gif, isOwner }: GifDetailPageProps) => {
  const [mode, setMode] = useState<DetailMode>('view');
  const deleteGif = useDeleteGif(gif.id);
  const postShare = usePostShare(gif.id);
  const postLike = usePostLike(gif.id);
  const deleteLike = useDeleteLike(gif.id);

  // isLiked 미제공 → 로컬 토글. 카운트는 낙관적 업데이트.
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(gif.likeCount);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((c) => c - 1);
      deleteLike.mutate();
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      postLike.mutate();
    }
  };

  // ponytail: 공유 URL = 원본 파일(raw) 링크. 전용 공유 도메인 생기면 교체.
  const rawSrc = `/api${apiUrls.gifs.raw(gif.id)}`;

  // 비공개·블라인드 GIF의 raw는 미인증 외부에서 404 → 공유 가능할 때만 복사 노출.
  const isShareable = gif.isPublic && !gif.blindedByAdmin;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}${rawSrc}`);
    postShare.mutate();
  };

  const handleDelete = () => {
    if (window.confirm('이 GIF를 삭제할까요? 되돌릴 수 없습니다.')) deleteGif.mutate();
  };

  const backToView = () => setMode('view');

  return (
    <main className="bg-cream min-h-[calc(100vh-69px)] px-5 py-10 sm:px-12 lg:px-36">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-8">
        <IconButton variant="back" className="w-fit" onClick={() => window.history.back()} />

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          {/* GIF 미리보기 — next/image는 GIF 애니메이션 최적화 이슈로 plain img 사용 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={rawSrc}
            alt={gif.title}
            className="bg-retro-gray aspect-square w-full shrink-0 object-contain lg:w-[360px]"
          />

          {/* 정보 / 편집 패널 */}
          <div className="flex flex-1 flex-col justify-between gap-8">
            {mode === 'edit' ? (
              <GifEditForm gif={gif} onClose={backToView} />
            ) : mode === 'report' ? (
              <GifReportForm gifId={gif.id} onClose={backToView} />
            ) : (
              <>
                <GifInfo gif={gif} />

                <button
                  type="button"
                  onClick={toggleLike}
                  className={cn(
                    'flex w-fit items-center gap-2 border px-4 py-2 transition-colors',
                    'font-pretendard text-body cursor-pointer leading-none tracking-[-0.32px]',
                    liked
                      ? 'border-stripe-red bg-stripe-red text-cream'
                      : 'border-ink text-ink hover:bg-retro-gray',
                  )}
                  aria-pressed={liked}
                >
                  <HeartIcon filled={liked} />
                  {likeCount}
                </button>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* URL 복사 박스 — 공개·비블라인드 GIF만 외부에서 열리므로 그때만 노출 */}
                  {isShareable && (
                    <div className="border-ink flex items-center gap-2 border px-3 py-2.5">
                      <input
                        readOnly
                        value={rawSrc}
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
                  )}

                  {/* 액션 버튼: 본인이면 편집/삭제, 아니면 신고 */}
                  {isOwner ? (
                    <div className="flex shrink-0 gap-3">
                      <button
                        type="button"
                        onClick={() => setMode('edit')}
                        className={cn(
                          'border-ink text-ink bg-cream border px-5 py-2.5',
                          'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
                          'hover:bg-retro-gray cursor-pointer',
                        )}
                      >
                        편집하기
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleteGif.isPending}
                        className={cn(
                          'border-stripe-red text-stripe-red border px-5 py-2.5',
                          'font-pretendard text-body leading-none tracking-[-0.32px] transition-colors',
                          'hover:bg-stripe-red hover:text-cream cursor-pointer disabled:cursor-not-allowed',
                        )}
                      >
                        {deleteGif.isPending ? '삭제 중...' : '삭제'}
                      </button>
                    </div>
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
