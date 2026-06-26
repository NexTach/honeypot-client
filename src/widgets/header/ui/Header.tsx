'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useGetMyProfile } from '@/entities/user';
import { useLogout } from '@/features/auth';
import { Logo } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { TextButton } from '@/shared/ui';

const BASE_NAV = [
  { href: '/about', label: '소개' },
  { href: '/', label: '탐색' },
  { href: '/upload', label: '업로드' },
] as const;

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { data: profile } = useGetMyProfile();
  const logout = useLogout();
  const isLoggedIn = !!profile;
  const isAdmin = profile?.role === 'ADMIN';

  const navItems = [
    ...BASE_NAV,
    ...(isLoggedIn ? [{ href: '/my-page', label: '마이페이지' }] : []),
    ...(isAdmin ? [{ href: '/my-page/reports', label: '신고관리' }] : []),
  ];

  const renderNav = (onNavigate?: () => void) => (
    <>
      {navItems.map(({ href, label }) => (
        <Link key={href} href={href} onClick={onNavigate}>
          <TextButton active={pathname === href}>{label}</TextButton>
        </Link>
      ))}
      {isLoggedIn ? (
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            logout.mutate();
          }}
          disabled={logout.isPending}
          className="cursor-pointer disabled:cursor-not-allowed"
        >
          <TextButton active={false}>로그아웃</TextButton>
        </button>
      ) : (
        <Link href="/login" onClick={onNavigate}>
          <TextButton active={pathname === '/login'}>로그인</TextButton>
        </Link>
      )}
    </>
  );

  return (
    <header className="border-border bg-cream z-50 border-b">
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-5 py-4 sm:px-12 lg:px-36">
        <Link href="/">
          <Logo />
        </Link>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden items-center gap-8 sm:flex">{renderNav()}</nav>

        {/* 햄버거 버튼 */}
        <button
          className="border-ink flex h-9 w-9 flex-col items-center justify-center gap-1.5 border sm:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
        >
          <span
            className={cn(
              'bg-ink block h-0.5 w-5 transition-all duration-200',
              open && 'translate-y-2 rotate-45',
            )}
          />
          <span
            className={cn(
              'bg-ink block h-0.5 w-5 transition-all duration-200',
              open && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'bg-ink block h-0.5 w-5 transition-all duration-200',
              open && '-translate-y-2 -rotate-45',
            )}
          />
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {open && (
        <div className="border-border border-t px-5 py-6 sm:hidden">
          <nav className="flex flex-col gap-4">{renderNav(() => setOpen(false))}</nav>
        </div>
      )}
    </header>
  );
};

export default Header;
