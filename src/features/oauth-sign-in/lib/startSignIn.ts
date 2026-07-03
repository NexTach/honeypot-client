/**
 * DataGSM OAuth 시작 (백엔드 주도 흐름).
 * 동일 출처 `/api` 프록시(next.config rewrites → 백엔드)로 전체 페이지 이동한다.
 * 백엔드 도메인 직격이 아니라 프록시를 태워야 백엔드가 심는 PKCE/state HttpOnly 쿠키가
 * FE 도메인에 저장되고, DataGSM 콜백이 같은 FE 도메인으로 돌아올 때 쿠키가 붙어 state 검증이 통과한다.
 * 로그인 완료 후 백엔드가 `redirect_uri#accessToken=...` 형태로 프론트 콜백으로 302 리다이렉트한다.
 */
export const startSignIn = (): void => {
  const redirectUri = `${window.location.origin}/callback`;
  window.location.href = `/api/v1/auth/datagsm/login?redirect_uri=${encodeURIComponent(redirectUri)}`;
};
