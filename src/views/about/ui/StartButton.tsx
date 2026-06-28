'use client';

import { useSyncExternalStore } from 'react';

import Link from 'next/link';

import { COOKIE_KEYS } from '@/shared/constants';
import { getCookie } from '@/shared/lib';
import { Button } from '@/shared/ui';

/** 로그인 상태면 탐색(/), 아니면 로그인으로 이동하는 "꿀통 시작하기" 버튼. */
const StartButton = () => {
  const isLoggedIn = useSyncExternalStore(
    () => () => {},
    () => !!getCookie(COOKIE_KEYS.ACCESS_TOKEN),
    () => false,
  );

  return (
    <Link href={isLoggedIn ? '/' : '/login'} className="w-full sm:w-auto">
      <Button className="w-full px-8">꿀통 시작하기</Button>
    </Link>
  );
};

export default StartButton;
