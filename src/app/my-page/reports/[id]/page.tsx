import { notFound } from 'next/navigation';

import type { Gif } from '@/entities/gif';
import type { ReportPage } from '@/entities/report';
import { requireAdmin } from '@/entities/user/api/guards';
import { apiUrls } from '@/shared/api';
import { apiFetcher } from '@/shared/api/fetcher';
import { ReportDetailPage } from '@/views/report-detail';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  await requireAdmin();
  const { id } = await params;

  // ponytail: 신고 단건 엔드포인트 없음 → 목록에서 id로 검색.
  const page = await apiFetcher<ReportPage>(`${apiUrls.reports.adminList}?size=1000`, {
    context: 'getReports',
    errorMessage: '신고 목록 조회 실패',
    cache: 'no-store',
  });
  const report = page?.content.find((r) => r.id === Number(id));
  if (!report) notFound();

  const gif = await apiFetcher<Gif>(apiUrls.gifs.detail(report.gifId), {
    context: 'getGif',
    errorMessage: `GIF(${report.gifId}) 조회 실패`,
    cache: 'no-store',
  });
  if (!gif) notFound();

  return <ReportDetailPage report={report} gif={gif} />;
};

export default Page;
