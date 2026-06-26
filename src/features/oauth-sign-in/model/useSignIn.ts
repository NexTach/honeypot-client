'use client';

import { useMutation } from '@tanstack/react-query';

import { apiUrls, get } from '@/shared/api';

interface SignInParams {
  code: string;
  state: string;
  oauthState: string;
  codeVerifier: string;
  redirectUri: string;
}

// 응답 형태 가정: { accessToken }. 백엔드 callback 실제 응답 확인 필요.
interface SignInResponse {
  accessToken: string;
}

const signIn = ({ code, state, oauthState, codeVerifier, redirectUri }: SignInParams) =>
  get<SignInResponse>(apiUrls.auth.callback, {
    params: {
      code,
      state,
      oauth_state: oauthState,
      oauth_code_verifier: codeVerifier,
      oauth_redirect_uri: redirectUri,
    },
  });

export const useSignIn = () => useMutation({ mutationFn: signIn });
