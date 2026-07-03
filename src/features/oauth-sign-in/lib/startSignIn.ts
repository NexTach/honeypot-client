/**
 * DataGSM OAuth 시작 (백엔드 주도 흐름).
 * 백엔드 `/v1/auth/datagsm/login` 으로 전체 페이지 이동 → 백엔드가 PKCE/state 를
 * HttpOnly 쿠키로 처리하고 DataGSM 으로 리다이렉트한다. 로그인 완료 후 백엔드가
 * `redirect_uri#accessToken=...` 형태로 프론트 콜백으로 302 리다이렉트한다.
 */
export const startSignIn = (): void => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) throw new Error('API 환경 변수(NEXT_PUBLIC_API_BASE_URL)가 없습니다.');

  const redirectUri = `${window.location.origin}/callback`;
  window.location.href = `${apiBaseUrl}/v1/auth/datagsm/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
};
