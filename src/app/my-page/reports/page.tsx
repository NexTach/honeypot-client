import type { Gif } from '@/entities/gif';
import { type ReportItem, ReportManagementPage } from '@/views/report-management';

const makeGif = (id: string, title: string, createdAt: string, viewCount: number): Gif => ({
  id,
  title,
  description: '',
  tags: [],
  width: 251,
  height: 341,
  loop: true,
  uploader: '서경주',
  shareCount: 0,
  url: 'https://ggultong.kr/gif/sample.gif',
  isPublic: true,
  createdAt,
  viewCount,
});

const items: ReportItem[] = [
  {
    report: {
      id: '1',
      reporter: '앙승일',
      reason: '내용과 GIF의 불일치',
      content: '아니 도대체 왜 기니피그 GIF에 내 이름을 쓴거임??? (진자 모름)',
      status: 'pending',
      reportedAt: '2026. 06. 01',
    },
    gif: makeGif('g1', '앙승일의 실체', '2026. 06. 01', 123),
  },
  {
    report: {
      id: '2',
      reporter: '김하늘',
      reason: '부적절한 내용',
      content: '신고합니다.',
      status: 'pending',
      reportedAt: '2024. 03. 22',
    },
    gif: makeGif('g2', '앙승일의 실체', '2024. 03. 22', 789),
  },
  {
    report: {
      id: '3',
      reporter: '최민정',
      reason: '저작권 침해',
      content: '제 영상이에요.',
      status: 'pending',
      reportedAt: '2025. 11. 15',
    },
    gif: makeGif('g3', '김하늘의 여정', '2025. 11. 15', 456),
  },
  {
    report: {
      id: '4',
      reporter: '박승일',
      reason: '욕설',
      content: '욕설이 포함되어 있습니다.',
      status: 'resolved',
      resolution: 'deleted',
      reportedAt: '2025. 02. 08',
    },
    gif: makeGif('g4', '박승일의 하루', '2025. 02. 08', 200),
  },
  {
    report: {
      id: '5',
      reporter: '한승일',
      reason: '내용과 GIF의 불일치',
      content: '관련 없는 GIF입니다.',
      status: 'resolved',
      resolution: 'hidden',
      reportedAt: '2023. 09. 10',
    },
    gif: makeGif('g5', '최민정의 발견', '2023. 09. 10', 321),
  },
  {
    report: {
      id: '6',
      reporter: '정재원',
      reason: '스팸',
      content: '도배성 게시물.',
      status: 'resolved',
      resolution: 'none',
      reportedAt: '2025. 07. 19',
    },
    gif: makeGif('g6', '정재원의 기록', '2025. 07. 19', 88),
  },
];

const Page = () => <ReportManagementPage items={items} />;

export default Page;
