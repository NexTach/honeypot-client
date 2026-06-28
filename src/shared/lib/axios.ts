import axios from 'axios';

import { COOKIE_KEYS } from '@/shared/constants';

import { deleteCookie, getCookie } from './cookies';

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
    // 401 = 토큰 만료/무효 → 쿠키 비우고 로그인으로.
    if (typeof window !== 'undefined' && error?.response?.status === 401) {
      deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
      if (window.location.pathname !== '/login') window.location.href = '/login';
    }

    return Promise.reject(error?.response?.data ?? error);
  },
);
