'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { COOKIE_KEYS } from '@/shared/constants';
import { setCookie } from '@/shared/lib';

/**
 * 백엔드 주도 OAuth 콜백 처리.
 * 백엔드가 로그인 완료 후 `{redirect_uri}#accessToken=...&refreshToken=...` 로 302 리다이렉트하므로,
 * URL fragment(location.hash)에서 토큰을 꺼내 쿠키에 저장한다.
 */
export const useHandleOAuthCallback = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = () => {
      try {
        const hash = window.location.hash.startsWith('#')
          ? window.location.hash.slice(1)
          : window.location.hash;
        const params = new URLSearchParams(hash);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (!accessToken) throw new Error('로그인 토큰을 받지 못했습니다. 다시 로그인해주세요.');

        setCookie(COOKIE_KEYS.ACCESS_TOKEN, accessToken);
        // refreshToken은 토큰 재발급(reissue)용. 백엔드가 함께 내려주면 저장.
        if (refreshToken) setCookie(COOKIE_KEYS.REFRESH_TOKEN, refreshToken);
        // 토큰이 노출된 fragment 를 히스토리에서 제거하며 홈으로 이동.
        router.replace('/');
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.');
        setTimeout(() => router.replace('/login'), 3000);
      }
    };

    handleCallback();
  }, [router]);

  return { errorMessage };
};
