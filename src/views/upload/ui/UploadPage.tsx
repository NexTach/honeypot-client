'use client';

import { useRef, useState } from 'react';

import { cn } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

const ImageOutlineIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 -960 960 960"
    fill="currentColor"
    className="text-ink-disabled"
    aria-hidden
  >
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
  </svg>
);

const UploadPage = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <main className="bg-cream min-h-[calc(100vh-69px)] px-5 py-10 sm:px-12 lg:flex lg:items-center lg:px-36 lg:py-0">
      <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-2">
        <h1 className="font-pretendard text-title text-ink font-normal tracking-[-1px]">
          GIF 업로드
        </h1>

        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:gap-[55px]">
          {/* 드래그 앤 드롭 영역 */}
          <button
            type="button"
            className={cn(
              'border-border bg-retro-gray flex w-full cursor-pointer flex-col items-center justify-center gap-[10px] border p-[10px]',
              'min-h-[260px] sm:min-h-[380px] lg:h-[650px] lg:w-[521px] lg:shrink-0',
              isDragging && 'border-ink',
            )}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            aria-label="GIF 파일 선택"
          >
            <input ref={fileInputRef} type="file" accept="image/gif" className="hidden" />
            <ImageOutlineIcon />
            <p className="font-pretendard text-body text-ink-disabled text-center">
              드래그 앤 드롭으로 GIF를 추가할 수 있습니다
            </p>
          </button>

          {/* 폼 영역 */}
          <div className="flex w-full flex-col gap-8 lg:h-[650px] lg:w-[576px] lg:justify-between lg:gap-0">
            <div className="flex flex-col gap-4 sm:gap-6">
              <Input label="이름*" placeholder="15자 이내로 입력해주세요" maxLength={15} />

              {/* 설명 — textarea */}
              <div className="flex w-full flex-col gap-1">
                <label className="font-pretendard text-body text-ink tracking-[-0.32px]">
                  설명
                </label>
                <textarea
                  className={cn(
                    'border-ink w-full border px-[10px] py-[10px]',
                    'font-pretendard text-body tracking-[-0.32px]',
                    'bg-cream text-ink placeholder:text-ink-disabled',
                    'focus:bg-retro-gray focus:outline-none',
                    'cursor-text resize-none disabled:cursor-not-allowed',
                  )}
                  rows={4}
                  placeholder="GIF의 설명을 입력하세요"
                />
              </div>

              <Input
                label="태그*"
                placeholder="연관된 태그를 입력해주세요, # 또는 단어입력 후 띄어쓰기로 입력할 수 있습니다"
              />

              {/* 공개 여부 */}
              <div className="flex w-full flex-col gap-1">
                <span className="font-pretendard text-body text-ink tracking-[-0.32px]">
                  공개 여부*
                </span>
                <div className="flex gap-3 sm:gap-4">
                  <Button
                    confirmed={isPublic}
                    onClick={() => setIsPublic(true)}
                    className="flex-1 px-4 lg:px-[115px]"
                  >
                    공개
                  </Button>
                  <Button
                    confirmed={!isPublic}
                    onClick={() => setIsPublic(false)}
                    className="flex-1 px-4 lg:px-[115px]"
                  >
                    비공개
                  </Button>
                </div>
              </div>
            </div>

            <Button className="mt-6 lg:mt-0">업로드하기</Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UploadPage;
