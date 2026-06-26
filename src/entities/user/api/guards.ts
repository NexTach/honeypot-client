import { redirect } from 'next/navigation';

import type { Profile } from '../model/types';
import { getServerProfile } from './getServerProfile';

/** 로그인 필수 라우트용. 미인증 시 /login으로 리다이렉트. */
export const requireProfile = async (): Promise<Profile> => {
  const profile = await getServerProfile();
  if (!profile) redirect('/login');
  return profile;
};

/** ADMIN 전용 라우트용. 비로그인→/login, 권한 없음→/. */
export const requireAdmin = async (): Promise<Profile> => {
  const profile = await requireProfile();
  if (profile.role !== 'ADMIN') redirect('/');
  return profile;
};
