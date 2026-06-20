export type ReportStatus = 'pending' | 'resolved';

export type Resolution = 'deleted' | 'hidden' | 'none';

export interface Report {
  id: string;
  reporter: string;
  reason: string;
  content: string;
  status: ReportStatus;
  resolution?: Resolution;
  reportedAt: string;
}

export const RESOLUTION_LABELS: Record<Resolution, string> = {
  deleted: 'GIF 삭제',
  hidden: '비공개 처리',
  none: '문제 없음',
};
