'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiUrls, post } from '@/shared/api';
import { COOKIE_KEYS } from '@/shared/constants';
import { deleteCookie } from '@/shared/lib';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    // 서버 세션 정리는 best-effort. 실패해도 클라 토큰은 비운다.
    mutationFn: () => post(apiUrls.auth.logout).catch(() => undefined),
    onSettled: () => {
      deleteCookie(COOKIE_KEYS.ACCESS_TOKEN);
      queryClient.clear();
      router.replace('/login');
    },
  });
};
