import type { Gif, GifPage } from '@/entities/gif';
import type { User } from '@/entities/user';
import { requireProfile } from '@/entities/user/index.server';
import { apiUrls } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';
import { MyPage } from '@/views/my-page';

const Page = async () => {
  const profile = await requireProfile();

  // ponytail: 페이지네이션 없이 한 번에 조회(size 큼). 업로드 수천 개 되면 무한스크롤 도입.
  const page = await apiFetcher<GifPage>(`${apiUrls.users.myGifs}?size=1000`, {
    context: 'getMyGifs',
    errorMessage: '내 GIF 조회 실패',
    cache: 'no-store',
  });
  const gifs: Gif[] = page?.content ?? [];

  // users/me에는 통계가 없어 내 GIF 목록에서 도출.
  const user: User = {
    uploadCount: gifs.length,
    publicCount: gifs.filter((gif) => gif.isPublic).length,
    totalShares: gifs.reduce((sum, gif) => sum + gif.shareCount, 0),
    isAdmin: profile.role === 'ADMIN',
  };

  return <MyPage user={user} gifs={gifs} />;
};

export default Page;
