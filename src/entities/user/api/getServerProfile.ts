import { apiUrls } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';

import type { Profile } from '../model/types';

/** 서버 컴포넌트(라우트 가드)용 프로필 조회. 미인증/실패 시 undefined. */
export const getServerProfile = () =>
  apiFetcher<Profile>(apiUrls.users.me, {
    context: 'getMyProfile',
    errorMessage: '프로필 조회 실패',
    // 가드는 매 요청 최신 인증 상태를 봐야 함.
    cache: 'no-store',
  });
