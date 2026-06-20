import type { Gif } from '@/entities/gif';
import type { Report } from '@/entities/report';
import { ReportDetailPage } from '@/views/report-detail';

const dummyReport: Report = {
  id: '1',
  reporter: '앙승일',
  reason: '내용과 GIF의 불일치',
  content: '아니 도대체 왜 기니피그 GIF에 내 이름을 쓴거임??? (진자 모름)',
  status: 'pending',
  reportedAt: '2026. 06. 01',
};

const dummyGif: Gif = {
  id: 'g1',
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
  createdAt: '2026. 06. 01',
  viewCount: 123,
};

const Page = () => <ReportDetailPage report={dummyReport} gif={dummyGif} />;

export default Page;
