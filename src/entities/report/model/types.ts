export type ReportStatus = 'PENDING' | 'NO_ISSUE' | 'BLINDED';

export type ReportAction = 'NO_ISSUE' | 'BLIND' | 'DELETE';

export interface Report {
  id: number;
  reporterId: number;
  gifId: number;
  reasonTitle: string;
  detail: string;
  status: ReportStatus;
  processedById: number | null;
  processedAt: string | null;
  createdAt: string;
}

export interface ReportPage {
  content: Report[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface CreateReportRequest {
  reasonTitle: string;
  detail: string;
}

export interface ProcessReportRequest {
  action: ReportAction;
}

export const STATUS_LABELS: Record<ReportStatus, string> = {
  PENDING: '대기 중',
  NO_ISSUE: '문제 없음',
  BLINDED: '비공개 처리',
};
