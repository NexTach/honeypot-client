import { Noto_Serif_KR, Space_Mono } from 'next/font/google';

import type { Metadata } from 'next';

import { TanStackProvider } from '@/shared/lib';
import { Nav } from '@/widgets/nav';

import '@/shared/styles/globals.css';

const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '900'],
  variable: '--font-serif-kr',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'project-title',
  description: 'project-description',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className={`${notoSerifKr.variable} ${spaceMono.variable}`}>
        <TanStackProvider>
          <Nav />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
