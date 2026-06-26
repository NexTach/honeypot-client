'use client';

import { Suspense } from 'react';

import { useHandleOAuthCallback } from '../model/useHandleOAuthCallback';

const CallbackContent = () => {
  const { errorMessage } = useHandleOAuthCallback();

  return (
    <main className="bg-cream flex min-h-[calc(100vh-69px)] items-center justify-center px-5">
      <div className="border-ink bg-cream flex w-full max-w-md flex-col items-center gap-3 border p-8 text-center">
        {errorMessage ? (
          <>
            <h1 className="font-pretendard text-title text-stripe-red font-bold">로그인 실패</h1>
            <p className="font-pretendard text-body text-ink-soft">{errorMessage}</p>
            <p className="font-pretendard text-caption text-ink-disabled">
              잠시 후 로그인 페이지로 이동합니다.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-pretendard text-title text-ink font-bold">로그인 처리 중</h1>
            <p className="font-pretendard text-body text-ink-soft">잠시만 기다려주세요.</p>
          </>
        )}
      </div>
    </main>
  );
};

const CallbackPage = () => (
  <Suspense fallback={null}>
    <CallbackContent />
  </Suspense>
);

export default CallbackPage;
