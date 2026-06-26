'use client';

import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useSignIn } from '@/features/oauth-sign-in';
import { COOKIE_KEYS, OAUTH_SESSION_KEYS } from '@/shared/constants';
import { setCookie } from '@/shared/lib';

export const useHandleOAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutateAsync: signIn } = useSignIn();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const code = searchParams.get('code');
        const callbackState = searchParams.get('state');
        const redirectUri = `${window.location.origin}/callback`;

        if (!code) throw new Error('인가 코드가 누락되었습니다.');

        const savedState = sessionStorage.getItem(OAUTH_SESSION_KEYS.STATE);
        if (!savedState || callbackState !== savedState) {
          throw new Error('잘못된 인증 요청입니다. 다시 로그인해주세요.');
        }

        const codeVerifier = sessionStorage.getItem(OAUTH_SESSION_KEYS.CODE_VERIFIER);
        if (!codeVerifier) throw new Error('PKCE 검증 정보가 없습니다. 다시 로그인해주세요.');

        const { accessToken } = await signIn({
          code,
          state: callbackState,
          oauthState: savedState,
          codeVerifier,
          redirectUri,
        });

        setCookie(COOKIE_KEYS.ACCESS_TOKEN, accessToken);
        router.replace('/');
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : '로그인 중 오류가 발생했습니다.');
        setTimeout(() => router.replace('/login'), 3000);
      } finally {
        sessionStorage.removeItem(OAUTH_SESSION_KEYS.STATE);
        sessionStorage.removeItem(OAUTH_SESSION_KEYS.CODE_VERIFIER);
      }
    };

    void handleOAuthCallback();
  }, [router, searchParams, signIn]);

  return { errorMessage };
};
