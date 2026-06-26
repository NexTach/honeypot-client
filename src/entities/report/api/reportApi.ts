import { apiUrls, patch, post } from '@/shared/api';

import type { CreateReportRequest, ProcessReportRequest, Report } from '../model/types';

export const createReport = (gifId: number, body: CreateReportRequest) =>
  post<Report>(apiUrls.gifs.reports(gifId), body);

export const processReport = (id: number, body: ProcessReportRequest) =>
  patch<Report>(apiUrls.reports.process(id), body);
