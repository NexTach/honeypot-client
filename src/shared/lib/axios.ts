import axios from 'axios';

import { apiUrls } from '@/shared/api/apiUrls';
import { COOKIE_KEYS } from '@/shared/constants';

import { deleteCookie, getCookie, setCookie } from './cookies';

// 인터셉터 재시도/재발급 스킵 플래그를 요청 config에 싣기 위한 모듈 보강.
declare module 'axios' {
  interface AxiosRequestConfig {
    retried?: boolean;
    skipAuthRefresh?: boolean;
  }
}

export const axiosInstance = axios.create({
  baseURL: '/api',
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window !== 'undefined' && !config.headers.Authorization) {
      const accessToken = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 동시 401을 단일 reissue로 묶기 위한 in-flight 프라미스.
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  // 백엔드가 refreshToken을 쿠키(swagger: in=cookie)에서 읽어 재발급한다.
  // 쿠키는 same-origin 요청 + /api rewrite로 자동 전송되므로 body/query로 첨부하지 않음.
  // 실패(쿠키 없음·만료)는 401로 떨어지고 호출부 catch가 로그아웃 처리.
  // skipAuthRefresh: reissue 자체의 401이 다시 reissue를 부르는 재귀 차단.
  const { accessToken } = await axiosInstance.post<
    { accessToken: string },
    { accessToken: string }
  >(apiUrls.auth.reissue, null, { skipAuthRefresh: true });
  setCookie(COOKIE_KEYS.ACCESS_TOKEN, accessToken);
  return accessToken;
};

const forceLogout = () => {
  deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
  deleteCookie(COOKIE_KEYS.REFRESH_TOKEN);
  if (window.location.pathname !== '/login') window.location.href = '/login';
};

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      // the-sdk가 모든 응답을 CommonApiResponse{status,code,message,data}로 래핑하므로
      // 실제 페이로드(data)만 꺼내 반환. 204/void 응답은 undefined.
      return response.data?.data ?? response.data;
    }
    return Promise.reject(response.data);
  },
  async (error) => {
    const config = error?.config;
    const status = error?.response?.status;

    // 401 + 첫 시도 + reissue 요청이 아님 → 토큰 재발급 후 원요청 재시도.
    if (
      typeof window !== 'undefined' &&
      status === 403 &&
      config &&
      !config.skipAuthRefresh &&
      !config.retried
    ) {
      config.retried = true;
      try {
        refreshPromise ??= refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
        const accessToken = await refreshPromise;
        config.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(config);
      } catch {
        forceLogout();
        return Promise.reject(error?.response?.data ?? error);
      }
    }

    // 재발급 후에도 401(재시도 실패) → 복구 불가. reissue 자체 401은 위 catch가 처리.
    if (typeof window !== 'undefined' && status === 403 && !config?.skipAuthRefresh) {
      forceLogout();
    }

    return Promise.reject(error?.response?.data ?? error);
  },
);
