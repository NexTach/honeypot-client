import type { Gif } from '@/entities/gif';
import type { ReportPage } from '@/entities/report';
import { requireAdmin } from '@/entities/user/index.server';
import { apiUrls } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';
import { type ReportItem, ReportManagementPage } from '@/views/report-management';

const Page = async () => {
  await requireAdmin();

  // ponytail: 신고에 페이지네이션/단건 엔드포인트 미사용 — size 크게 한 번에. 신고 폭증 시 페이징.
  const page = await apiFetcher<ReportPage>(`${apiUrls.reports.adminList}?size=1000`, {
    context: 'getReports',
    errorMessage: '신고 목록 조회 실패',
    cache: 'no-store',
  });
  const reports = page?.content ?? [];

  // ponytail: 신고 응답에 gif가 없어 gifId별 개별 조회(N+1). 배치 엔드포인트 생기면 교체.
  const settled = await Promise.all(
    reports.map(async (report) => {
      const gif = await apiFetcher<Gif>(apiUrls.gifs.detail(report.gifId), {
        context: 'getGif',
        errorMessage: `GIF(${report.gifId}) 조회 실패`,
        cache: 'no-store',
      });
      return gif ? { report, gif } : null;
    }),
  );
  const items = settled.filter((item): item is ReportItem => item !== null);

  return <ReportManagementPage items={items} />;
};

export default Page;
