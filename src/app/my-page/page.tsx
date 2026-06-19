import type { Gif } from '@/entities/gif';
import type { User } from '@/entities/user';
import { MyPage } from '@/views/my-page';

const makeGif = (
  over: Partial<Gif> & Pick<Gif, 'id' | 'title' | 'createdAt' | 'viewCount' | 'isPublic'>,
): Gif => ({
  description: '',
  tags: [],
  width: 251,
  height: 341,
  loop: true,
  uploader: '서경주',
  shareCount: 0,
  url: 'https://ggultong.kr/gif/sample.gif',
  ...over,
});

const dummyUser: User = {
  uploadCount: 5,
  publicCount: 4,
  totalShares: 241,
  isAdmin: false,
};

const dummyGifs: Gif[] = [
  makeGif({
    id: '1',
    title: '앙승일의 실체',
    createdAt: '2024. 03. 22',
    viewCount: 789,
    isPublic: true,
  }),
  makeGif({
    id: '2',
    title: '앙승일의 실체',
    createdAt: '2026. 06. 01',
    viewCount: 123,
    isPublic: true,
  }),
  makeGif({
    id: '3',
    title: '김하늘의 여정',
    createdAt: '2025. 11. 15',
    viewCount: 456,
    isPublic: true,
  }),
  makeGif({
    id: '4',
    title: '최민정의 발견',
    createdAt: '2023. 09. 10',
    viewCount: 321,
    isPublic: true,
  }),
  makeGif({
    id: '5',
    title: '박승일의 하루',
    createdAt: '2025. 02. 08',
    viewCount: 200,
    isPublic: false,
  }),
];

const Page = () => <MyPage user={dummyUser} gifs={dummyGifs} />;

export default Page;
