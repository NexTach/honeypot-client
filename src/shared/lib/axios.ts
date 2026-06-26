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
      return response.data;
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
