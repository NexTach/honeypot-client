'use client';

import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/api';

import { getMyProfile } from '../api/userApi';
import type { Profile } from './types';

export const useGetMyProfile = (initialData?: Profile, enabled = true) =>
  useQuery({
    queryKey: queryKeys.users.me,
    queryFn: getMyProfile,
    initialData,
    // 미인증(401)은 정상 상태 — 재시도/스팸 방지.
    retry: false,
    staleTime: 60_000,
    // 토큰 없으면 호출 안 함 — 공개 페이지에서 401→로그인 강제이동 방지.
    enabled,
  });
