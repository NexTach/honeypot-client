import { notFound } from 'next/navigation';

import type { Gif } from '@/entities/gif';
import { getServerProfile } from '@/entities/user/index.server';
import { apiUrls } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';
import { GifDetailPage } from '@/views/gif-detail';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const [gif, profile] = await Promise.all([
    apiFetcher<Gif>(apiUrls.gifs.detail(Number(id)), {
      context: 'getGif',
      errorMessage: `GIF(${id}) 조회 실패`,
    }),
    getServerProfile(),
  ]);

  if (!gif) notFound();

  const isOwner = profile?.id === gif.uploaderId;
  return <GifDetailPage gif={gif} isOwner={isOwner} />;
};

export default Page;
