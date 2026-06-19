import type { Gif } from '@/entities/gif';
import { GifDetailPage } from '@/views/gif-detail';

const dummyGif: Gif = {
  id: 'abc123',
  title: '앙승일의 실체',
  description:
    '앙승일이 정재원을 고문하고 있는 모습이다. 이 고문법은 ‘프로메테우스 고문법’이라고 불리며, 손으로 흉부를 빠르게 여러 번 가격하는 고문법이다. 25년 1학기 서경주에게 베타테스트를 한 걸로 알려져 있으며 앙승일은 서경주에게 “너는 반성의 기미가 보이지 않는다”며 7분동안 고문을 진행하였다.',
  tags: ['8기', '앙승일', '고문', '웃음', '한승일', '박승일'],
  width: 251,
  height: 341,
  loop: true,
  uploader: '서경주',
  shareCount: 123,
  url: 'https://ggultong.kr/gif/abc123.gif',
  isPublic: true,
  createdAt: '2024. 03. 22',
  viewCount: 789,
};

const Page = () => <GifDetailPage gif={dummyGif} isOwner={false} />;

export default Page;
