'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/shared/assets';
import { cn } from '@/shared/lib';
import { TextButton } from '@/shared/ui';

const NAV_ITEMS = [
  { href: '/about', label: '소개' },
  { href: '/', label: '탐색' },
  { href: '/upload', label: '업로드' },
  { href: '/login', label: '로그인' },
] as const;

const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-border bg-cream z-50 border-b">
      {/* 상단 바 */}
      <div className="flex items-center justify-between px-5 py-4 sm:px-12 lg:px-36">
        <Link href="/">
          <Logo />
        </Link>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link key={href} href={href}>
              <TextButton active={pathname === href}>{label}</TextButton>
            </Link>
          ))}
        </nav>

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
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                <TextButton active={pathname === href}>{label}</TextButton>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
