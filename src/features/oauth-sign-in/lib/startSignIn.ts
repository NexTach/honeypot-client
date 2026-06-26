import { OAUTH_SESSION_KEYS } from '@/shared/constants';
import { createAuthorizeUrl, generateCodeChallenge, generateCodeVerifier } from '@/shared/lib';

/**
 * DataGSM OAuth 시작. 클라가 PKCE(state+verifier+challenge) 생성 →
 * sessionStorage 저장 → DataGSM authorize로 직접 리다이렉트.
 */
export const startSignIn = async (): Promise<void> => {
  const clientId = process.env.NEXT_PUBLIC_DATAGSM_OAUTH_CLIENT_ID;
  if (!clientId)
    throw new Error('OAuth 환경 변수(NEXT_PUBLIC_DATAGSM_OAUTH_CLIENT_ID)가 없습니다.');

  const redirectUri = `${window.location.origin}/callback`;
  const state = crypto.randomUUID();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  sessionStorage.setItem(OAUTH_SESSION_KEYS.STATE, state);
  sessionStorage.setItem(OAUTH_SESSION_KEYS.CODE_VERIFIER, codeVerifier);

  window.location.href = createAuthorizeUrl({ clientId, redirectUri, state, codeChallenge });
};
