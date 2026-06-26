'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { processReport, type ProcessReportRequest } from '@/entities/report';

export const usePatchReport = (id: number) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (body: ProcessReportRequest) => processReport(id, body),
    onSuccess: () => {
      // 처리 후 목록으로(서버 fetch라 최신 반영).
      router.push('/my-page/reports');
    },
  });
};
