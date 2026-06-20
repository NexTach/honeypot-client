interface ReportStatsProps {
  pendingCount: number;
  resolvedCount: number;
  totalCount: number;
}

const ReportStats = ({ pendingCount, resolvedCount, totalCount }: ReportStatsProps) => (
  <div className="font-pretendard text-title text-ink flex flex-wrap items-center gap-6 tracking-[-1px] sm:gap-16">
    <p>
      <span className="font-bold">대기 중</span> {pendingCount}
    </p>
    <p>
      <span className="font-bold">처리 완료</span> {resolvedCount}
    </p>
    <p>
      <span className="font-bold">총 신고</span> {totalCount}
    </p>
  </div>
);

export default ReportStats;
