import { cookies } from 'next/headers';

import { COOKIE_KEYS } from '@/shared/constants';

import 'server-only';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FetcherOptions extends Omit<RequestInit, 'cache'> {
  /** 실패 로그 식별용 호출 맥락 (예: 'getGif') */
  context: string;
  /** 실패 시 서버 로그에 남길 메시지 */
  errorMessage: string;
  cache?: RequestCache;
}

/**
 * 서버 컴포넌트 전용 fetch. accessToken 쿠키를 Bearer로 첨부.
 * 처리된 실패(non-2xx, 네트워크 오류)는 undefined 반환 — 호출부에서 fallback 렌더.
 */
export const apiFetcher = async <T>(
  path: string,
  { context, errorMessage, headers, ...init }: FetcherOptions,
): Promise<T | undefined> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        ...headers,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    });

    if (!res.ok) {
      console.error(`[apiFetcher:${context}] ${errorMessage} (status ${res.status})`);
      return undefined;
    }

    // the-sdk가 CommonApiResponse{status,code,message,data}로 래핑 → 페이로드(data)만 반환.
    const json = await res.json();
    return (json?.data ?? json) as T;
  } catch (error) {
    console.error(`[apiFetcher:${context}] ${errorMessage}`, error);
    return undefined;
  }
};
