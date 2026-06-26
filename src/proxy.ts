import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_KEYS } from '@/shared/constants';

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;

  // 토큰 없으면 보호 라우트(/upload, /my-page*) 접근 차단.
  if (!accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/upload/:path*', '/my-page/:path*'],
};
