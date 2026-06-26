'use client';

import { useMutation } from '@tanstack/react-query';

import { createReport, type CreateReportRequest } from '@/entities/report';

export const usePostReport = (gifId: number) =>
  useMutation({
    mutationFn: (body: CreateReportRequest) => createReport(gifId, body),
  });
