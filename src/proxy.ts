import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_KEYS } from '@/shared/constants';

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;

  // 교내 전용: 토큰 없으면 로그인으로. 공개 경로(/about·/login·/callback)는 matcher에서 제외됨.
  if (!accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // 교내 전용: /about·/login·/callback·정적파일만 공개, 나머지 전부 로그인 필수.
  matcher: ['/((?!about|login|callback|_next/static|_next/image|favicon.ico|.*\\.).*)'],
};
