'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/shared/assets';
import { TextButton } from '@/shared/ui';

const NAV_ITEMS = [
  { href: '/about', label: '소개' },
  { href: '/', label: '탐색' },
  { href: '/upload', label: '업로드' },
  { href: '/login', label: '로그인' },
] as const;

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="border-border bg-cream flex items-center justify-between border-b px-36 py-4">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center gap-8">
        {NAV_ITEMS.map(({ href, label }) => (
          <Link key={href} href={href}>
            <TextButton active={pathname === href}>{label}</TextButton>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
